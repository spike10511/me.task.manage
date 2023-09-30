import * as echarts from "echarts";
import {BarChartOptions, ChartOptionParams} from "./taskProgress.type.ts";
import {EChartsType} from "echarts";
import {reactive, ref} from "vue";
import {historyAllTaskApi} from "../learn.api.ts";
import {catchCallback} from "../../../logic/app.ts";
import {elNotificationBox} from "../../../logic/message.ts";
import {Task} from "../learn.type.ts";
import {waitForExecute} from "../../../logic/mtime.ts";


export const allTask = ref<Task[]>([])
export const activeRow = reactive<Task>({} as Task) // 选中的行
export const dialogSwitch = ref(false)

type FilterListType = { text: any, value: any }
export const taskCategoryFilterList = ref<FilterListType[]>([]) // 任务列表筛选列表
export const isComFilterList: FilterListType[] = [
    {
        text: "已完成",
        value: 1
    }, {
        text: "未完成",
        value: 0
    }
] // 是否完成筛选列表
let chartDom: HTMLElement | null
let myChart:EChartsType;
let option:BarChartOptions


// 选中了table中某一行
export function activeRowHandle(row: Task) {
    Object.assign(activeRow, row)
    dialogSwitch.value = true
}

// 斑马纹样式
export const tableRowClassName = () => 'table-row';
// 初始化数据
export function initPageData(){
    getAllTaskData()
}

// 刷新页面
export function refreshPageData(){
    getAllTaskData()
}

// 获取所有任务
async function getAllTaskData() {
    try {
        const result = await historyAllTaskApi()
        allTask.value=result.data
        const optionParam=getApiDataToChart(allTask.value)
        // 如果在图表渲染成功前调用玩接口,就需要延迟更新图表
        if(!myChart){
            waitForExecute(myChart,()=>{
                // 否则直接刷新就行
                updateChart(optionParam)
            })
        }else{
            // 否则直接刷新就行
            updateChart(optionParam)
        }
        updateTaskFilterList(result.data)
        elNotificationBox("提示","已加载最新数据","success",null)
    } catch (e) {
        catchCallback((e as any).toString(),(msg)=>{
            elNotificationBox("警告",msg,"warning",null)
        })
    }
}






// 刷新过滤表列表
export function updateTaskFilterList(tableData:Task[]){
    let taskCategorySet=new Set()
    for (const row of tableData) {
        taskCategorySet.add(row.task_category.cate_name)
    }
    taskCategoryFilterList.value=Array.from(taskCategorySet).map(v=>({
        text:v,
        value:v
    }))
}

// 过滤方法
export const isComFilterHandler = (
    value: number,
    row: Task
) => {
    return row.is_com === value
}

// 任务列表过滤方法
export const taskCategoryFilterHandle = (
    value: string,
    row: Task
) => {
    return row.task_category.cate_name === value
}







type TempMapValue={
    sucNum:number;
    noNum:number
}
// 抽取接口数据为echarts可用结构
function getApiDataToChart(tasks:Task[]):ChartOptionParams{
    let timeArr:string[]=[]
    let sucArr:number[]=[]
    let noArr:number[]=[]
    let temp:Map<string,TempMapValue>=new Map()

    for (let i = 0; i < tasks.length; i++) {
        const task=tasks[i]
        const time=task.end_time.split(" ")[0]
        // 先处理当前task的数量
        let mapV:TempMapValue={
            sucNum:temp.get(time)?.sucNum||0,// 直接获取上一次新的数据,没有就是初始0
            noNum:temp.get(time)?.noNum||0,
        }

        task.is_com?mapV.sucNum++:mapV.noNum++;

        // 再将新的数量加到temp
        temp.set(time,mapV)// 替换成最新的就行,如果没有这个键,会自动创建

    }

    for (const key of temp.keys()) {
        timeArr.push(key)
        sucArr.push(temp.get(key)?.sucNum||0)
        noArr.push(temp.get(key)?.noNum||0)
    }
    return {
        sucList:sucArr,
        timeList:timeArr,
        noSucList:noArr
    }
}


// 初始化图表
export function initChart(dom:string){
     chartDom = document.getElementById(dom)!;
     myChart = echarts.init(chartDom);
     option = generateInitOption({
         timeList:[],
         sucList:[],
         noSucList:[]
     })
}

// 加载图表
export function loadChart(){
    option && myChart.setOption(option);
}

// 更新图表
export function updateChart(optionParams:ChartOptionParams){
    myChart.setOption(generateUpdateOption(optionParams));
}

// 监听窗口变化重新渲染图表
export function handleResize(){
    myChart.resize()
}

// 生成更新配置
function generateUpdateOption(optionParams:ChartOptionParams):BarChartOptions{
    return {
        yAxis: {
            data: optionParams.timeList
        },
        series:[
            {
                data:optionParams.sucList
            },
            {
                data:optionParams.noSucList
            }
        ]
    }
}

// 生成初始配置
function generateInitOption(optionParams:ChartOptionParams):BarChartOptions{
    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // Use axis to trigger tooltip
                type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            }
        },
        legend: {
            textStyle: {
                color: '#aeb1b8',
            },
            top:30,
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            axisLabel: {
                rotate: -30,
            },
            data: optionParams.timeList
        },
        series: [
            {
                name: '已完成',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                itemStyle: {
                    color: '#6ad959',
                },
                data: optionParams.sucList
            },
            {
                name: '未完成',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                itemStyle: {
                    color: '#ff7774',
                },
                data: optionParams.noSucList
            },

        ],
        dataZoom: [
            {
                type: "slider",
                show: true,//隐藏或显示（true）组件
                backgroundColor: "rgb(19, 63, 100)", // 组件的背景颜色。
                fillerColor: "rgb(16, 171, 198)", // 选中范围的填充颜色。
                borderColor: "rgb(19, 63, 100)", // 边框颜色
                showDetail: false, //是否显示detail，即拖拽时候显示详细数值信息
                startValue: 0, // 数据窗口范围的起始数值
                endValue: 5, // 数据窗口范围的结束数值（一页显示多少条数据）
                yAxisIndex: [0, 1],//控制哪个轴，如果是 number 表示控制一个轴，如果是 Array 表示控制多个轴。此处控制第二根轴
                filterMode: "empty",
                width: 8, //滚动条高度
                height: "50%", //滚动条显示位置
                right: 3, // 距离右边
                handleSize: 0,//控制手柄的尺寸
                top: "middle",
            },
            {
                //没有下面这块的话，只能拖动滚动条，鼠标滚轮在区域内不能控制外部滚动条
                type: "inside",
                yAxisIndex: [0, 1],//控制哪个轴，如果是 number 表示控制一个轴，如果是 Array 表示控制多个轴。此处控制第二根轴
                zoomOnMouseWheel: false, //滚轮是否触发缩放
                moveOnMouseMove: true, //鼠标移动能否触发平移
                moveOnMouseWheel: true,//鼠标滚轮能否触发平移
            },
        ],

    };
}
import * as echarts from "echarts";


export type BarChartOptions=echarts.EChartsOption



// options 更新参数数据类型
export type ChartOptionParams ={
    timeList:string[];
    sucList:number[];
    noSucList:number[];
}
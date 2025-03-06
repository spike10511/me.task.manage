package validatorHelper

import (
	"fmt"
	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/locales/en"
	"github.com/go-playground/locales/zh"
	ut "github.com/go-playground/universal-translator"
	"github.com/go-playground/validator/v10"
	enTranslations "github.com/go-playground/validator/v10/translations/en"
	zhTranslations "github.com/go-playground/validator/v10/translations/zh"
)

var _trans ut.Translator

// InitTrans  初始化验证器
func InitTrans(locale string) (err error) {
	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
		zhT := zh.New() // 中文翻译器
		enT := en.New() // 英文翻译器

		uni := ut.New(enT, zhT, enT)

		var ok bool
		_trans, ok = uni.GetTranslator(locale)
		if !ok {
			panic("语言环境获取失败" + locale)
		}
		// 注册翻译器
		switch locale {
		case "en":
			err = enTranslations.RegisterDefaultTranslations(v, _trans)
		case "zh":
			err = zhTranslations.RegisterDefaultTranslations(v, _trans)
		default:
			err = enTranslations.RegisterDefaultTranslations(v, _trans)
		}
		fmt.Printf("%s翻译定制成功\n", locale)
		return nil
	}
	return nil
}

// GetTrans 获取当前翻译接口
func GetTrans() ut.Translator {
	return _trans
}

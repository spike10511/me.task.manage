package httpLogic

import (
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	tipConst "learning_path/constant/tip"
	validatorHelper "learning_path/helper/validator"
	"net/http"
	"strings"
)

type _response struct {
	Data    interface{} `json:"data"`
	Message interface{} `json:"message"`
	Code    int         `json:"code"`
}

func ErrorResponse(c *gin.Context, status int, message interface{}) {
	c.JSON(http.StatusBadRequest, _response{
		Message: message,
		Code:    status,
	})
}

func BadErrorResponse(c *gin.Context, message interface{}) {
	c.JSON(http.StatusUnprocessableEntity, _response{
		Message: message,
		Code:    422,
	})
}

func NoAuthResponse(c *gin.Context, status int, message interface{}) {
	c.JSON(http.StatusUnauthorized, _response{
		Message: message,
		Code:    status,
	})
}

func OKResponse(c *gin.Context, data interface{}, message interface{}) {
	if message == nil {
		message = tipConst.ResOK
	}
	c.JSON(http.StatusOK, _response{
		Data:    data,
		Message: message,
		Code:    200,
	})
}

func GetBindErrorTranslate(err error) string {
	errs, ok := err.(validator.ValidationErrors)
	if ok {
		var errorMsgs []string
		for _, e := range errs {
			errorMsgs = append(errorMsgs, e.Translate(validatorHelper.GetTrans()))
		}
		return strings.Join(errorMsgs, ", ")
	}
	return err.Error()
}

func ExeErrorResponse(c *gin.Context, message string) {
	if message == "" {
		message = "Internal Server Error"
	}
	c.JSON(http.StatusInternalServerError, _response{
		Message: message,
		Code:    500,
	})
}

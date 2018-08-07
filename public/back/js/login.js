
$(function(){

  //1. 表单校验配置
  $('#form').bootstrapValidator({
  //配置图标
  feedbackIcons: {
    valid: 'glyphicon glyphicon-heart',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },

    // 指定校验字段
    fields : {
      // 校验应户名
      username : {
        validators : {
          // 非空校验
          notEmpty : {
            // 提示信息
            message : '用户名不能为空'
          },
          // 长度校验
          stringLength : {
            min : 2,
            max : 6,
            message : '用户长度必须为2-6位'
          }
        },
        callback : {
          massage : '用户名错误',
        }
      },
      // 校验密码
      password : {
        validators : {
          // 非空校验
          notEmpty : {
            // 提示信息
            message : '密码不能为空'
          },
          // 长度校验
          stringLength : {
            min : 6,
            max : 12,
            message : '密码成都必须为6-12位'
          }
        }
      }
    }
  })
  $('#form').click("success.form.bv", function(e) {
    //阻止表单默认行为
    e.preventDefault();
    //使用ajax进行提交
    $.ajax({
      type : "post",
      url : "/employee/employeeLogin",
      data : $('#form').serialize(),
      dataType : "json",
      success : function (info) {
        console.log(info);
        if (info.success) {
          location.href = "index.html"  
        }

        if(info.error === 1000) {
          callback : {
            massage : "用户名不存在"
          }
        }
      }
    })
  })
})
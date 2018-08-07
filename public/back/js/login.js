
$(function(){

  // 表单校验初始化
  $('#form').bootstrapValidator({


  //2. 指定校验时的图标显示，默认是bootstrap风格
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
})
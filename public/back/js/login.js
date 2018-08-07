$(function () {

  //1. 表单校验配置
  $('#form').bootstrapValidator({
    //配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-heart',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 指定校验字段
    fields: {
      // 校验应户名
      username: {
        validators: {
          // 非空校验
          notEmpty: {
            // 提示信息
            message: '用户名不能为空'
          },
          // 长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户长度必须为2-6位'
          },
          callback: {
            message: '用户名错误',
          }
        }
      },
      // 校验密码
      password: {
        validators: {
          // 非空校验
          notEmpty: {
            // 提示信息
            message: '密码不能为空'
          },
          // 长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '密码成都必须为6-12位'
          },
          callback: {
            message: '密码错误'
          }
        }
      }
    }
  });
  //2. 实现登录功能
  $('#form').on("success.form.bv", function (e) {
    //阻止表单默认行为
    e.preventDefault();
    //使用ajax进行提交
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data: $('#form').serialize(),
      dataType: "json",
      success: function (info) {
        console.log(info);
        //处理响应
        if (info.success) {
          //跳转到首页
          location.href = "index.html"
        }
        //验证用户名是否正确
        if (info.error === 1000) {
          $('#form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
        }
        //验证密码是否正确
        if (info.error === 1001) {
          $('#form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
        }
      }
    })
  })
});

//3.解决重置按钮存在的bug
$('[type="reset"]').click(function(){
  $('#form').data('bootstrapValidator').resetForm();
})
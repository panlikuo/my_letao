
// 1. 进行表带校验
$(function(){
  //初始化表单
  $('#form').bootstrapValidator({

    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //指定校验字段
    fields : {
      // 用户名校验
      username : {

        validators : {
          // 不为空校验
          notEmpty : {
            //提示信息
            message : '用户名不能为空'
          },
          // 长度校验
          stringLength : {
            min : 2,
            max : 6,
            message : '用户名必须为2-6位'
          },
          callback : {
            message : '用户名不存在!'
          }
        }
      },
      // 密码校验
      password : {
        validators : {
          notEmpty : {
            message : '密码不能为空',
          },
          // 长度校验
          stringLength : {
            min : 6,
            max : 12,
            message : '密码必须为6-12位'
          },
          callback : {
            message : '密码错误!'
          }
        }
      }
    }
  })

  // 表单验证完成

  // 2.重置存在的bug
  $('[type="reset"]').click(function(){
    $('#form').data('bootstrapValidator').resetForm();
  })
  // 重置存在bug解决

})
// 3.表单验证完成实现登录功能
// 1.手动阻止浏览器默认行为
$('#form').on("success.form.bv", function(e){
  e.preventDefault();
  $.ajax({
    url : '/employee/employeeLogin',
    type : 'post',
    dataType : 'json',
    data : $('form').serialize(),
    success : function(info) {
      console.log(info);
      // 根据返回的数据判断用户的信息
      if(info.error === 1000) {
        $('#form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback')
      }
      if(info.error === 1001 ) {
        $('#form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback')
      }
      if(info.success){
        // 跳转到首页
        location.href = 'index.html'
      }
      
    }
  })
})

$(function(){
//   校验规则
// 1. 用户名不能为空
// 2. 用户密码不能为空
// 3. 用户密码长度为6-12位
// 表单初始化
$('#form').bootstrapValidator({
  //设置小图标
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  //设置校验规则
  fields:{
    username:{
      validators:{
        // 非空校验
        notEmpty:{
          message: '用户名不能为空',
        },
        // 长度校验
        stringLength : {
          min : 2,
          max : 6,
          message : '用户名长度必须为2-6位'
        },
        callback: {
          message: '用户名错误',
        }
      }
    },
    password:{
      validators:{
        // 非空校验
        notEmpty : {
          message: '密码不能为空'
        },
        stringLength: {
          min : 6,
          max : 12,
          message : '密码长度必须为6-12位'
        },
        callback : {
          message: '密码错误',
        }
      }
    },
  }
})
  // 重置按钮bug
  $('[type="reset"]').click(function(){
    //重置表单样式
   $("#form").data("bootstrapValidator").resetForm();

  })

  // 实现登录功能
  $('#form').on("success.form.bv", function(e){
    // 手动阻止默认时间
    e.preventDefault();
    $.ajax({
      url: '/employee/employeeLogin',
      type : 'post',
      data : $('#form').serialize(),
      success : function(info){
       console.log(info)
       if(info.success) {
         location.href = 'index.html'
       } 
       if (info.error === 1000){
        $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
       }
       if(info.error===1001) {
        $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
       }
      }
    })
  })

})



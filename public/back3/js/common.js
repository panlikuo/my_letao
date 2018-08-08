

  // 进度条
  $( document ).ajaxStart(function(){
    // 开启进度条
    NProgress.start();
  })
  // 在最后一个ajax请求回来时, 关闭进度条
  $(document).ajaxStop(function() {
  
    // 模拟网络延迟
    setTimeout(function() {
      // 关闭进度条
      NProgress.done();
    }, 1000);
  });



  $(function(){
// 点击菜单实现隐藏
    $('.icon-menu').click(function(){
      $('.lt-aside').toggleClass('hidemenu')
      $('.lt-main').toggleClass('hidemenu')
      $('.lt-main .m-top').toggleClass('hidemenu')
    })

    // 二级菜单折叠
    $('.category').click(function(){
     $(' .lt-aside .nav .child').stop().slideToggle();
    })

    // 实现用户退出
    $('.logOut').click(function(){
      // 发送ajax请求
      $.ajax({
        url : '/employee/employeeLogout',
        type : 'get',
        success : function (info){
          console.log(info);
          if(info.success){
            location.href = 'login.html'
          }
        }
      })
    })

  // 模态框
  $('.icon-back').click(function() {
    // 显示模态框
    $('#logoutModal').modal("show");
  });

})


// 判断用户是否登录
if(location.href.indexOf('login.html') === -1){
  $.ajax({
    url : '/employee/checkRootLogin',
    type : 'get',
    success: function(info){
      console.log(info);
      if(info.error === 400){
        location.href = 'login.html'
      }
    }

  })
}

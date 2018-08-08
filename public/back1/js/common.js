
$(function(){
  // 1.二级菜单栏切换
  $('.lt-aside .category').click(function(){
    $('.lt-aside .child').stop().slideToggle();
  })
  // 2.点击菜单按钮侧边栏隐藏
  $('.icon-menu').click(function(){
    $('.lt-aside').toggleClass('hidemenu');
    $('.lt-main').toggleClass('hidemenu');
    $('.lt-main .m-top').toggleClass('hidemenu');
  });
  // 模态框
    // 3. 点击退出菜单, 显示退出模态框
    $('.icon-back').click(function() {
      // 显示模态框
      $('#logoutModal').modal("show");
    });

    // 4.实现用户退出功能
    $('.logout').click(function(){
      $.ajax({
        url : '/employee/employeeLogout',
        type : 'get',
        success : function(info){
          console.log(info);
          if(info.success) {
            location.href = 'login.html'
          }
          
        }
      })
    })
    
  })
  //5.进度条
  // 在发送第一个ajax请求时, ajaxStart,  开启进度条,
  $(document).ajaxStart(function () {
    // 开启进度条
    NProgress.start();
  })
  // 在最后一个ajax请求回来时, 关闭进度条
  $(document).ajaxStop(function () {

    // 模拟网络延迟
    setTimeout(function () {
      // 关闭进度条
      NProgress.done();
    }, 1000);

  });

// 6. 判断用户是否登陆, 实现登陆拦截
if(location.href.indexOf('login.html') === -1){
  $.ajax({
    url : '/employee/checkRootLogin',
    type : 'get',
    success : function(info){
      console.log(info);
      if(info.error === 400){
        // 去登陆
        location.href = 'login.html'
      }
    }
  })
}









// 4.进度条
// 在第一个ajax发送时开启进度条
$( document ).ajaxStart(function() {
  //开启进度条
  NProgress.start();
})

  // 在最后一个ajax发送请求回来时关闭进度条
  $(document).ajaxStop(function () {
    //模拟网络延迟查看效果
   setTimeout(function () {
    // 关闭进度条
    NProgress.done();
  },1000)
  });


  
  $(function () {
    // 5.实现侧边栏分类管理折叠
    $('.lt_aside .category').click(function () {
      // alert(100)
      //下面的child切换状态  //清除动画序列
      $('.lt_aside .child').stop().slideToggle();
    })
    // 6.点击侧边栏隐藏/显示
    $('.icon_menu').click(function(){
      $('.lt_aside').toggleClass('menuhidden');
      $('.lt_main').toggleClass('menuhidden');
      $('.lt_top').toggleClass('menuhidden');
    })

    // 7.点击退出按钮弹出模态框
    $('.icon_logout').click (function(){
      $('#Model').modal('show')
    })
    
  })
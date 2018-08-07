
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


  //5.
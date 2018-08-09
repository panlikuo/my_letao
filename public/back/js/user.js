$(function () {
  var currentPage = 1; // 当前页
  var pageSize = 5; // 每页多少条

  var currentId; // 当前选中的用户 id
  var isDelete;


  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        var str = template('tmp', info);
        $('tbody').html(str);

        // 分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          totalPages: Math.ceil(info.total / info.size), //总页数
          currentPage: info.page, //当前页

          onPageClicked: function (a, b, c, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            // 更新当前页
            currentPage = page;
            // 重新渲染
            render();
          }
        });
      }
    });
  };

  // 禁用模态框
  $('tbody').on('click', '.btn', function () {
    $('#userModel').modal('show');
    currentId = $(this).parent().data('id');
    console.log(currentId);
    //获取当前的状态并转换
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
  });
  // 点击确认按钮更改状态
  $('.userBtn').click(function () {
    $.ajax({
      url: '/user/updateUser',
      type: 'post',
      dataType: 'json',
      data: {
        id: currentId,
        isDelete: isDelete,
      },
      success:function(info){
        console.log(info);
        if(info.success){
          // 关闭模态框
          $('#userModel').modal('hide');
          // 重新渲染
          render();
        }
      }
    })
  })



})
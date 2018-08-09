

$(function(){
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render (){
    $(function () {
      $.ajax({
        url: '/category/queryTopCategoryPaging',
        type: 'get',
        dataType: 'json',
        data: {
          page: currentPage,
          pageSize: pageSize,
        },
        success:function(info){
          console.log(info);
          var str = template('tmp', info);
          $('tbody').html(str)

        // 分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          totalPages: Math.ceil( info.total / info.size ),
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
    })
  }
  // 模态框
  $('.btn-add').click(function(){
    $('#addModal').modal("show")
  })

  //表单验证
  $('#form').bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh' // 校验中
    },
    // 配置字段
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "一级分类不能为空"
          }
        }
      }
    }
  });

  //实现添加功能阻止表单验证成功自动提交
  $('#form').on("success.form.bv", function(e){
    e.preventDefault();
    // 发送ajax
    $.ajax({
      url : '/category/addTopCategory',
      type : 'post',
      dataType : 'json',
      data : $('#form').serialize(),
      success : function(info){
        console.log(info);
        if(info.success) {
          // 关闭模态框
          $('#addModal').modal("hide")
          // 更新第一页数据
          currentPage = page;
          // 重新渲染
          render();
        }
      }
    })
  })
})




$(function () {
  var currentPage = 1;
  var pageSize = 5;
  render()

  function render() {
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      type: 'get',
      dataType: 'json',
      data: {
        page: currentPage,
        pageSize: pageSize,
      },
      success: function (info) {
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
    })
  }

  // 模态框
    $('.btn-add').click(function(){
      $('#addModal').modal("show")

      // 发送ajax
      $.ajax({
        type: "get",
        url: "/category/queryTopCategoryPaging",
        data: {
          page: 1,
          pageSize: 100
        },
        dataType: "json",
        success: function( info ) {
          console.log( info );
          // 结合模板和数据, 进行渲染
          var htmlStr = template("downTmp", info );
          $('.dropdown-menu').html( htmlStr );
        }
      })
    })

    // 给dropdown-menu下的所有a注册点击事件(事件委托)
    $('.dropdown-menu').on('click', 'a', function(){
      //获取a的文本内容
      var txt = $(this).text();
      // console.log(txt);
      // 将内容赋值给dropdownText
      $('#dropdownText').text(txt);
      //获取选中的id
      var id = $(this).data('id');
      // 将id设置给input
      $('[name="categoryId"]').val(id);
      // 将隐藏域校验状态, 设置成校验成功状态
      $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");

      
    })

    // 文件上传
    $("#fileupload").fileupload({
      dataType: "json",
      done: function (e, data) {
        // console.log(data);
        // 获取上传图片的地址
        var imgUrl = data.result.picAddr;
        console.log(imgUrl);
        // 将地址赋值给img
        $('#imgBox img').attr('src', imgUrl);
        // 将图片地址, 设置给 input
        $('[name="brandLogo"]').val(imgUrl);
        // 手动重置隐藏域的校验状态
        $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
      }
    });

    // 实现表单校验
    $("#form").bootstrapValidator({
      //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
      //   我们需要对隐藏域进行校验, 所以不需要将隐藏域 排除到 校验范围外
      excluded: [],
  
      // 配置图标
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',     // 校验成功
        invalid: 'glyphicon glyphicon-remove',  // 校验失败
        validating: 'glyphicon glyphicon-refresh'  // 校验中
      },
  
      // 配置字段
      fields: {
        categoryId: {
          validators: {
            notEmpty: {
              message: "请选择一级分类"
            }
          }
        },
        brandName: {
          validators: {
            notEmpty: {
              message: "请输入二级分类"
            }
          }
        },
        brandLogo: {
          validators: {
            notEmpty: {
              message: "请选择图片"
            }
          }
        }
      }
    });

   // 6. 注册表单校验成功事件, 阻止默认提交, 通过 ajax 进行提交
   $("#form").on("success.form.bv", function( e ) {
    e.preventDefault();

    // 通过 ajax 提交
    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: $('#form').serialize(),
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.success ) {
          // 关闭模态框
          $('#addModal').modal("hide");
          // 重新渲染第一页页面
          currentPage = 1;
          render();
          // 重置模态框的表单, 不仅校验状态要重置, 文本内容也要重置
          $('#form').data("bootstrapValidator").resetForm(true);

          // 手动重置文本内容, 和图片路径
          $('#dropdownText').text("请选择一级分类");
          $('#imgBox img').attr("src", "images/none.png");
        }
      }
    })

  })



})
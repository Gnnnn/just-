jQuery(document).ready(function($) { 
//判断登录状态
indexIsLogin() 
//点击图片获取验证码
$('#vercation').click(function(){
  var Gndate = new Date();
  $.getJSON('/re/logops.php?request=captcha', function(data){
    var pichref = data.pic + "?t=" + Gndate.getTime()
    // alert(pichref)
    console.log("enough!!")
      $('.Gnverpic').attr("src",pichref )
      return false;
    })
}),
 
//获取验证码
$('.theme-login').click(function(){
  var Gndate = new Date();
  $.getJSON('/re/logops.php?request=captcha', function(data){
    var pichref = data.pic + "?t=" + Gndate.getTime()
    // alert(pichref)
      $('.Gnverpic').attr("src",pichref );
    })
}),

// 显示登录弹出框
$('.theme-login').click(function(){
    $.getJSON("/re/user.php?request=info",function(data){
    if(data.number &&!data.group_id){
      Gnsignup()
    }
    })
    $('.theme-popover-mask').fadeIn(100);
    $('.theme-popover').slideDown(200);
}),
$('.theme-poptit .close').click(function(){
  $('.theme-popover-mask').fadeOut(100);
  $('.theme-popover').slideUp(200);
}),


// 为表单元素添加失去焦点事件，判断Userid是否合法
$('form :input').blur(function(){  
       var $parent = $(this).parent();
       $parent.find(".formtips").remove(); //去掉先前的提醒
       //验证用户名
       if( $(this).is('#userid') ){
          if(this.value.length != 8){
              var errorMsg = '请检查学号长度.';
              $parent.append('<span class="formtips onError">  '+errorMsg+'</span>');
          }else{
              var okMsg = '格式正确.';
              $parent.append('<span class="formtips onSuccess">  '+okMsg+'</span>');
          }
       }
       if( $(this).is('#capt') ){
          if(this.value.length != 4){
              var errorMsg = '请检查验证码长度.';
              $parent.append('<span class="formtips onError">  '+errorMsg+'</span>');
          }else{
              var okMsg = '格式正确.';
              $parent.append('<span class="formtips onSuccess">  '+okMsg+'</span>');
          }
       }
}),


$('.Gnlog').click(function(){
  $(".Gnlog").val("登录中")
  $.ajax({
      url:"/re/logops.php?request=login",
      type:"post",
      dataType:"json",
      aysnc:false,
      data:
      {
        username: $("#userid").val(),
        password:$("#userpwd").val(),
        captcha:$("#capt").val()
      }, 
      success:function(result){
        if (result.success) {
          $.getJSON("/re/register.php?request=isSignUp",function(data){
          GnisSignUp = data.isSignUp
          if (result.success) {
            if( GnisSignUp==0)
            {
              $('.account-alink').text('报名')
              Gnsignup()
            }
            else{
                $('.theme-popover-mask').fadeOut(100);
                $('.theme-popover').slideUp(200);
                $("#rtLink").hide()
                $("#indexu").removeClass("hide");
              }
          }
          else{
              $(".Gnlog").val("登录失败")
              console.log($("#userpwd").val())
              $("#userpwd").val("")
              // var Gndate = new Date();
              // $.getJSON('/re/logops.php?request=captcha', function(data){
              // var pichref = data.pic + "?t=" + Gndate.getTime()
              // $('.Gnverpic').attr("src",pichref );
              // })
          }
            })
        }
        else{
          console.log(result)
          $(".Gnlog").val("登录失败")
              console.log($("#userpwd").val())
          
          $("#userpwd").val("")
              // var Gndate = new Date();
              // $.getJSON('/re/logops.php?request=captcha', function(data){
              // var pichref = data.pic + "?t=" + Gndate.getTime()
              // $('.Gnverpic').attr("src",pichref );
              // })
        }
      },
      error:function(result){
        console.log(result)
      }

  })
})

})



function indexIsLogin()
{
  $.getJSON("/re/user.php?request=info",function(data){
    console.log(data)
    if (data.number== 0) { //not login 
      ;
    }
    else if(!data.group_id){ //not register
     $('.account-alink').text('报名')
     // Gnsignup()
    }
    else{ //login 
      $("#rtLink").hide()
      $("#indexu").removeClass("hide");
    }
  })
}

function Gnsignup(){
  $('.theme-popover h3').text('请报名')
  $(".uno").hide()
  $(".tu").removeClass("hide")
  $('.Gnregister').click(function(){
    console.log("welllllll")
    var Gncontact = $("#tel").val(), Gngroup_name = $("#groupname").val();
    var Gnis_cap = 0;
    if ($('input[name="leader"]:checked').val() == "yep") 
      Gnis_cap = 1
    else
      Gnis_cap = 0
    $.ajax({
          url:"/re/register.php?request=signUp",
          dataType:"json",
          type:"post",
          aysnc:false,
          data:{
              contact:Gncontact,
              group_name:Gngroup_name,
              is_cap:Gnis_cap
          },
          success:function(result){
            if(result.success == 1){
              $('.account-alink').text('个人中心')
              $('.theme-popover-mask').fadeOut(100);
              $('.theme-popover').slideUp(200);
              $("#rtLink").hide()
              $("#indexu").removeClass("hide");
              console.log(result)
            }
            else{
            if(result.error==0)
              alert("请刷新重试")
            else if(result.error == 1)
              alert("该队伍已存在，您不能成为组长")
            else if(result.error==2)
              alert("队伍暂不存在，需要组长先组队")
            else if(result.error==3)
              alert("队伍人数已满，不能继续加入")
            console.log(result)
            }
          },
          error:function(result){
            if(result==0)
              alert("请刷新重试")
            else if(result == 1)
              alert("该队伍已存在，您不能成为组长")
            else if(result==2)
              alert("队伍暂不存在，需要组长先组队")
            else if(result==3)
              alert("队伍人数已满，不能继续加入")
          }
  })
  })
}


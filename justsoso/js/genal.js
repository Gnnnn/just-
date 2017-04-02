function isSignUp()
{
  $.getJSON("/re/register.php?request=isSignUp",function(data){
    return data.isSignUp
  })
}


function register(contact,group_name,is_cap)
{
  var suc = 0
  $.ajax({
    url:"/re/register.php?request=signUp",
    dataType:"json",
    type:"post",
    aysnc:false,
    data:{
      contact:contact,
      group_name:group_name,
      is_cap:is_cap
    },
    success:function(result){
      console.log(result)
      suc = result.success
      // alert(suc)
    },
    error:function(result){
      console.log(result)
    }
  })
  return suc
}

function indexIsLogin()
{
  $.getJSON("/re/logops.php?request=isLogin",function(data){
    if(data.isLogin){
      $("#rtLink").html("个人中心")
      				.attr("href","/user.html");
    }
  })
}


function moreIsLogin()
{
  $.getJSON("/re/logops.php?request=isLogin",function(data){
    if(data.isLogin){
      $("#morelogin").hide()
      $("#moreuser").removeClass("hide");
    }
  })
}

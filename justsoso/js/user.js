$(document).ready(function(){
// start_rank()
  $.getJSON("/re/user.php?request=info",function(data){
    if(!data.number){
      //用户未登录的控制
      $(".Jtitle").text('请先登录,页面将在3秒内跳转')
      $(".panel-default").addClass('hide')
      $("#morelogin").addClass('hide')
      $(".account-alink").text("回到主页")
      setTimeout("javascript:location.href='/re/logout.php'", 1000); 
    }
    if(!data.group_id){
      //用户未报名的控制
      $(".Jtitle").text('请报名后再访问，页面将在3秒内跳转')
      $(".panel-default").addClass('hide')
      $("#morelogin").addClass('hide')
      $(".account-alink").text("回到主页")
      setTimeout("javascript:location.href='/re/logout.php'", 1000); 
    }
    var name = data.name
    var number = data.number
    var academy = data.academy
    var contact = data.contact
    var group_id = data.group_id
    var group_name = data.group_name
    var score = data.score
    var rank = data.rank
    $("#name").text(name)
    $("#number").text(number)
    $("#contact").text(contact)
    $("#academy").text(academy)
    $("#group_id").text(group_id)
    $("#group_name").text(group_name)
    $("#score").text(score)
    $("#rank").text(rank)
    console.log(data)
  })


// function start_rank(){
//       $.ajax({
//         url:"/re//contest.php?request=isInFinal",
//         type:"post",
//         dataType:"json",
//         success:function(result){
//           console.log(result)
//           if (result.isInFinal == 0) {
//             $(".Jtitle").text('很遗憾您未进入决赛') 
//             $(".panel-default").addClass('hide')
//             $("#morelogin").addClass('hide')
//             $(".account-alink").text("回到主页")
//             setTimeout("javascript:location.href='/re/logout.php'", 1000); 
//           }
//         },
//         error:function(result){
//           console.log(result)
//         }
//     })
// }


})
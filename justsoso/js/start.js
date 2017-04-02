jQuery(document).ready(function($) {
	
function my_ran(n,min,max){
 var arr=[];
 for(i=0;i<n;i++){
  arr[i]=parseInt(Math.random()*(max-min+1)+min);
 }
 for(i=0;i<n;i++){
  for(j=i+1;j<n;j++){
   if(arr[i]==arr[j]){
    my_ran(n,min,max);
    return fault;
   }
  }
 }
 return arr;
}
re = []
re = my_ran(3,0,7)
alert(re)
startIsLogin()	
getfirques()
answerlist = new Array()
for(var o = 0;o<=9;o++){
	answerlist[o]=''
}
show1()
u1click()
clock = 1
// gnclock()      决赛加上！！！
$('.page1').click(function(){
	page=1; 
	console.log(page)
	var i=0
	for(i=0;i<=9;i++){
		var a = "input[name='radio" + i +"']"
		$("input[name='radio8']").attr("checked",false)
		$(a).attr("checked",false);
	}
	var speed=200;//滑动的速度
    $('body,html').animate({ scrollTop: 0 }, speed);
	$.ajax({
	    url:"/re/contest.php?request=question",
	    type:"post",
	    dataType:"json",
	    data:
	    {
	    	page : page,
	    }, 
	    success:function(result){
	    	show1()
			var i=0
			for(i=0;i<=9;i++){
				var a = ".qus" + i
				$(a).text( "第 "+(i+1) +" 题：" +result[i].question)
				// console.log(result[i].question)
				for (j=0;j<=3;j++) {
					var b = ".qus" + i +''+ j
	    			$(b).text(result[i].choice.split(",")[j]) 
				// console.log(result[i].choice.split(",")[j])

				}
			}
			// console.log(answerlist)
			u1click(page)
		
		},   
		error:function(result){
   		console.log(result)
        }   
	    })
}),

$('.page2').click(function(){
	page=2; 
	console.log(page)
	var i=0
	// for(i=0;i<=9;i++){
	// 	var a = "input[name='radio" + i +"']"
	// 	$("input[name='radio8']").attr("checked",false)
	// 	$(a).attr("checked",false);
	// }
	var speed=200;//滑动的速度
    $('body,html').animate({ scrollTop: 0 }, speed);
	$.ajax({
	    url:"/re/contest.php?request=question",
	    type:"post",
	    dataType:"json",
	    data:
	    {
	    	page : page,
	    }, 
	    success:function(result){
			var i=0
			for(i=0;i<=9;i++){
				var a = ".qus" + i
				$(a).text( "第 "+(i+11) +" 题：" +result[i].question)
				// console.log(result[i].question)
				for (j=0;j<=3;j++) {
					var b = ".qus" + i +''+ j
	    			$(b).text(result[i].choice.split(",")[j]) 
				// console.log(result[i].choice.split(",")[j])

				}
			}
			show2()
			// console.log(answerlist)
			u2click(page)        
		},   
		error:function(result){
   		console.log(result)
        }   
	    })
}),

$('.page3').click(function(){
	page=3;
	console.log(page)
	var i=0
	for(i=0;i<=9;i++){
		var a = "input[name='radio" + i +"']"
		$("input[name='radio8']").attr("checked",false)
		$(a).attr("checked",false);
	}
	var speed=200;//滑动的速度
    $('body,html').animate({ scrollTop: 0 }, speed);
	$.ajax({
	    url:"/re/contest.php?request=question",
	    type:"post",
	    dataType:"json",
	    data:
	    {
	    	page : page,
	    }, 
	    aysnc:false,
	    success:function(result){
			var i=0
			for(i=0;i<=9;i++){
				var a = ".qus" + i
				$(a).text( "第 "+(i+21) +" 题：" +result[i].question)
				// console.log(result[i].question)
				for (j=0;j<=3;j++) {
					var b = ".qus" + i +''+ j
	    			$(b).text(result[i].choice.split(",")[j]) 
				// console.log(result[i].choice.split(",")[j])

				}
			}
			show3()
			$(".leave").removeClass()
			u3click(page)
		},   
		error:function(result){
   		console.log(result)
        }   
	    })

}),



$('.leave').click(function(){
	$.ajax({
	    url:"/re/contest.php?request=stop",
	    type:"post",
	    dataType:"json",
	    success:function(result){
   		console.log(result)

   		var gogogo = ['a','b','c','d','e','f','g']
   		for (var i = 0; i <=2; i++) {

   			gogo = gogogo
   		}

	    	$(".Jtitle").removeClass("hide")
			$(".Jtitle").text("您已交卷！")
			$(".panel-default").addClass('hide')
		 	$(".account-alink").text("回到主页")
		 	$(".main_page").css("height","500")
		 	$("body").css("height","700")
		 	var speed=200;//滑动的速度
        	$('body,html').animate({ scrollTop: 0 }, speed);
			setTimeout("javascript:location.href='index.html'", 1000);
		},   
		error:function(result){
   		    if (result.error == 0) {
   		    	$(".Jtitle").removeClass("hide")
				$(".Jtitle").text("您未登录！")
				$(".panel-default").addClass('hide')
				$(".account-alink").text("回到主页")
				$(".main_page").css("height","500")
		 		$("body").css("height","700")
				setTimeout("javascript:location.href='index.html'", 1000);
   		    }
   		    else if (result.error ==1) {
   		    	$(".Jtitle").removeClass("hide")
				$(".Jtitle").text("链接不到数据库，请联系负责人！")
				$(".panel-default").addClass('hide')
				$(".account-alink").text("回到主页")
				$(".main_page").css("height","500")
		 		$("body").css("height","700")
				setTimeout("javascript:location.href='index.html'", 1000);
   		    }
		}
		})
})

})

function timeover(){
	var t_start = new Date().getTime();
    var t_end =  new Date("2016/10/16 24:05:00").getTime();     //此处可改!!!!!
    if(t_end - t_start <= 0 ){
	$(".Jtitle").removeClass("hide")
	$(".Jtitle").text("已过答题时间！")
	$(".panel-default").addClass('hide')
	$(".account-alink").text("回到主页")
	setTimeout("javascript:location.href='index.html'", 1000); 
	}
	else{
		// alert("您刚刚退出了比赛，答案已清空，请重新答卷哦。")
	}
}

function startIsLogin(){
	// console.log("here~")
	// timeover()
	$.getJSON("/re/contest.php?request=begin",function(data){
		console.log("here~")
		console.log(data)
        if (!data.success){
        	if(data.error ==0){
        		$(".Jtitle").removeClass("hide")
        		$(".Jtitle").text("请先登录！")
      			$(".panel-default").addClass('hide')
      			$(".account-alink").text("回到主页")
      			setTimeout("javascript:location.href='index.html'", 1000); 
        	}
        	else if(data.error == 1){
        		$(".Jtitle").removeClass("hide")
        		$(".Jtitle").text("请先报名！")
      			$(".panel-default").addClass('hide')
      			$(".account-alink").text("回到主页")
      			setTimeout("javascript:location.href='index.html'", 1000); 
        	}
        	else if(data.error == 2){
        		$(".Jtitle").removeClass("hide")
        		$(".Jtitle").text("您不是组长！")
      			$(".panel-default").addClass('hide')
      			$(".account-alink").text("回到主页")
      			setTimeout("javascript:location.href='index.html'", 1000); 
        	}
        	else if(data.error == 3){
        		$(".Jtitle").removeClass("hide")
        		$(".Jtitle").text("您已交卷！")
      			$(".panel-default").addClass('hide')
      			$(".account-alink").text("回到主页")
      			setTimeout("javascript:location.href='index.html'", 1000); 
        	}
        	else if(data.error == 4){
        		console.log(data)
        		timeover();
        		}
        	
        	else if(data.error == 5){
        		$(".Jtitle").removeClass("hide")
        		$(".Jtitle").text("您的小组未满3人，无法开始答题。")
        		$(".Jtitle").css("marginLeft",483)
        		console.log("change")
      			$(".panel-default").addClass('hide')
      			$(".account-alink").text("回到主页")
      			setTimeout("javascript:location.href='index.html'", 1000); 
        	}

        	else if(data.error == 6){
        		$(".Jtitle").removeClass("hide")
        		$(".Jtitle").text("服务器出现问题，请联系负责人！")
      			$(".panel-default").addClass('hide')
      			$(".account-alink").text("回到主页")
      			setTimeout("javascript:location.href='index.html'", 1000); 
        	}
        }
    })
}
 
function u1click(page){
	$('#u1').click(function(){
		page = 1
		for(var o = 0;o<=9;o++){
			answerlist[o]=''
		}
		for (var i = 0; i <=9; i++) {
			var t = 'radio' + i
			var j = 'input[name =' + t +']:checked'
			c = $(j).val()
			// console.log(c)
			if(c != undefined){
				answerlist[i] = c
			}
			else if(answerlist[i] == ''){
				answerlist[i] = ''
			}
			else{
				answerlist[i] = answerlist[i]
			}
			}
		// console.log(answerlist)
		answer = list_to_string(answerlist)
		console.log(page)
		$.ajax({
			url:"/re/contest.php?request=answer",
		    type:"post",
		    dataType:"json",
		    data:
		    {
		    	page : page,
		    	answer:  answer,
		    }, 
		    aysnc:false,
			success:function(result){
				alert("提交成功~")
				console.log(result)
			},
			error:function(result){
				console.log(result)
			} 
		})
		// window.location.reload();
		// gnclock()                    //决赛加上！！！
		// window.location.reload();
	})
}

function u2click(page){
	$('#u2').click(function(){
	page = 2
		for(var o = 0;o<=9;o++){
			answerlist[o]=''
		}
		for (var i = 0; i <=9; i++) {
				var t = 'radio' + i
				var j = 'input[name =' + t +']:checked'
				c = $(j).val()
				// console.log(c)
				if(c != undefined){
					answerlist[i] = c
				}
				else if(answerlist[(i+10)] == ''){
					answerlist[i] = ''
				}
				else{
					answerlist[i] = answerlist[i]
				}
				}
			// console.log(answerlist)
			answer = list_to_string(answerlist)
			$.ajax({
				url:"/re/contest.php?request=answer",
			    type:"post",
			    dataType:"json",
			    data:
			    {
			    	page : page,
			    	answer:  answer,
			    }, 
			    aysnc:false,
				success:function(result){
					alert("提交成功~")
					console.log(result)
				},
				error:function(result){
						console.log(result)
				} 
			})
			// gnclock()                    //决赛加上！！！
	})
}


function u3click(page){
	$('#u3').click(function(){
		page = 3
		for(var o = 0;o<=9;o++){
			answerlist[o]=''
		}
		for (var i = 0; i <=9; i++) {
			var t = 'radio' + i
			var j = 'input[name =' + t +']:checked'
			c = $(j).val()
			// console.log(c)
			if(c != undefined){
				answerlist[i] = c
			}
			else if(answerlist[(i+20)] == ''){
				answerlist[i] = ''
			}
			else{
				answerlist[i] = answerlist[i]
			}
			}
		// console.log(answerlist)
		answer = list_to_string(answerlist)
		var answer_user = []
		for(var i = 0;i<=9;i++){
			if (answerlist[i] == '1'){
				answer_user[i] = 'B'
			}
			else if (answerlist[i] == '0'){
				answer_user[i] = 'A'
			}
			else if (answerlist[i] == '2'){
				answer_user[i] = 'C'
			}
			else if (answerlist[i] == '3'){
				answer_user[i] = 'D'
			}
			else if (answerlist[i] == ''){
				answer_user[i] = ' '
			}
		}
		answer_user = "提交成功~您的答案是："+list_to_string(answer_user)
		// console.log(answer_user)
		console.log(answer)
		$.ajax({
			url:"/re/contest.php?request=answer",
		    type:"post",
		    dataType:"json",
		    data:
		    {
		    	page : page,
		    	answer:  answer,
		    }, 
		    aysnc:false,
			success:function(result){
				alert(answer_user)
				console.log(result)
			},
			error:function(result){
					console.log(result)
			} 
		})
		// gnclock()                   //决赛加上！！！
})
}


function show1(){
	$("#u2").hide()
	$("#u3").hide()
	$("#u1").show()
}
function show2(){
	$("#u1").hide()
	$("#u3").hide()
	$("#u2").show()
}
function show3(){
	$("#u2").hide()
	$("#u1").hide()
	$("#u3").show()
}


function list_to_string(answer_list){	
	answer_string = ""
	for (var i = 0;i<(answer_list.length-1) ;i++) {
		answer_string +=(answer_list[i] +',')
	}
	answer_string += answer_list[i]
	console.log(answer_string)
	return answer_string
}


function getfirques(){
	$.ajax({
	    url:"/re/contest.php?request=question",
	    type:"post",
	    dataType:"json",
	    data:
	    {
	    	page :1,
	    }, 
	    success:function(result){
			for(i=0;i<=9;i++){
				var a = ".qus" + i
				$(a).text( "第 "+(i+1) +" 题：" +result[i].question)
				// console.log(result[i].question)
				for (j=0;j<=3;j++) {
					var b = ".qus" + i +''+ j
	    			$(b).text(result[i].choice.split(",")[j]) 
				// console.log(result[i].choice.split(",")[j])

				}
			}
			// console.log(answerlist)
		
		},   
		error:function(result){
   		console.log(result)
        }   
	    })
}



//决赛加上！！！
// function gnclock(){
// 	console.log("clock!!!")
// 		$.ajax({
// 	    url:"/re/contest.php?request=rightNum",
// 	    type:"post",
// 	    dataType:"json",
// 	    success:function(result){
// 	    	console.log("rightNum: " + result.right)
// 			if(clock == 1){
// 				if (result.right>=10) {
// 					alert("您已成功解锁队友！")
// 					clock = 0
// 				}
// 			}	
// 		},   
// 		error:function(result){
//    		console.log(result)
//         }   
// 	    })
// }
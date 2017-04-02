jQuery(document).ready(function($) {

firprank()

showcount()

page = 1;
$('.nextpage').click(function(){
    $(".gnlast").show()
	page++;
	console.log(page) 
	$.ajax({
	    url:"/re/contest.php?request=rank",
	    type:"post",
	    dataType:"json",
	    data:
	    {
	    	page : page,
	    }, // 逗号漏了
	    success:function(result){
	    	var pagenum = Math.ceil(Number(result.count)/20)
        	var remain = Number(result.count)%20
        	pagelist = [pagenum,remain]
	    	if(page < pagenum){
	    		changerank(result)
			}			
			else if(page == pagenum){
				//
				console.log("lastpage")
				for (var j = remain;j<=19;j++) {
					var wipe = "#no"+ j
					$(wipe).hide()
				}
				for(var i = 0;i < remain;i++){  
		        var a = ".userid" + i 
		        var b = ".username" + i 
		        var c = ".grp_score" + i 
		        var d = ".per_score" + i 
		        var e = ".fin_score" + i 
		        var f = ".num" + i 
		        var h = i+1+20*(page-1)
		        var g = "第"+h +"名"
		        // var tmp = Number(result.detail[i].score_g)*0.3+Number(result.detail[i].score_i)*0.7
		        var tmp = Number(result.detail[i].score_g)
		        var tm = tmp.toFixed(2)
				$(a).text(result.detail[i].number)
				$(b).text(result.detail[i].name)
				$(c).text(result.detail[i].score_g)
				$(d).text(result.detail[i].score_i)
				$(e).text(tm)
				$(f).text(g)
		    	}
		    	$(".gnnext").hide()
			}
		},
		error:function(){
		console.log(result)
        }
	    })
}),

$('.lastpage').click(function(){
	page--;
	console.log(page)
	for (var i = 0; i <=19; i++) {
		var wipe = "#no"+ i
		$(wipe).show()
	}
	$(".gnnext").show()
	$.ajax({
	    url:"/re/contest.php?request=rank",
	    type:"post",
	    dataType:"json",
	    data:
	    {
	    	page : page,
	    }, 
	    success:function(result){
	    	// var pagenum = Math.ceil(Number(result.count)/20)
      //   	var remain = Number(result.count)%20
      //   	pagelist = [pagenum,remain]
	    	if(page > 1){
	    		changerank(result)
			}			
			else if(page == 1){
				changerank(result)
		    	$(".gnlast").hide()
			}
		},
		error:function(result){
		console.log(result)
        }
	    })
}),

$('.lstpage').click(function(){
	$.ajax({
		url:"/re/contest.php?request=rank",
        type:"post",
        dataType:"json",
        async:false,
        data:{
            page:1,
        },
        success:function(result){
        	var pagenum = Math.ceil(Number(result.count)/20)
        	console.log("lastpage:" + pagenum)
        	Gnlastpage(pagenum)
			page = pagenum
            },
        error:function(result){
        console.log(result) 
        }
	})

}) 

})


function firprank(){
    $.ajax({
        url:"/re/contest.php?request=rank",
        type:"post",
        dataType:"json",
        data:{
            page:1,
        },
        success:function(result){
			if (Number(result.count)==20) {
			    $(".gnlast").hide()
        		$(".gnnext").hide()
        		$(".lstpage").hide()
			}
        	if(Number(result.count)<20) {
        	$(".gnlast").hide()
        	$(".gnnext").hide()
        	$(".lstpage").hide()
        	var remain = Number(result.count)%20
        	for (var j = remain;j<=19;j++) {
					var wipe = "#no"+ j
					$(wipe).hide()
				}
				for(var i = 0;i < remain;i++){  
		        var a = ".userid" + i 
		        var b = ".username" + i 
		        var c = ".grp_score" + i 
		        var d = ".per_score" + i 
		        var e = ".fin_score" + i 
		        var f = ".num" + i 
		        var h = i+1
		        var g = "第"+h +"名"
		        // var tmp = Number(result.detail[i].score_g)*0.3+Number(result.detail[i].score_i)*0.7
		        var tmp = Number(result.detail[i].score_g)
		        var tm = tmp.toFixed(2)
				$(a).text(result.detail[i].number)
				$(b).text(result.detail[i].name)
				$(c).text(result.detail[i].score_g)
				$(d).text(result.detail[i].score_i)
				$(e).text(tm)
				$(f).text(g)
		    	}
        	}
        	changerank(result)
        	$(".gnlast").hide()
        },
        error:function(result){
        console.log(result) 
        }
    })
}

function changerank(result){
	for(var i = 0;i <= 19;i++){  
        var a = ".userid" + i 
        var b = ".username" + i 
        var c = ".grp_score" + i 
        var d = ".per_score" + i 
        var e = ".fin_score" + i 
        var f = ".num" + i 
		var h = i+1+20*(page-1)
		var g = "第"+h +"名"
        // var tmp = Number(result.detail[i].score_g)*0.3+Number(result.detail[i].score_i)*0.7
		var tmp = Number(result.detail[i].score_g)
        var tm = tmp.toFixed(2)
        // console.log(result.detail[i].score_g)
		$(a).text(result.detail[i].number)
		$(b).text(result.detail[i].name)
		$(c).text(result.detail[i].score_g)
		$(d).text(result.detail[i].score_i)
		$(e).text(tm)
		$(f).text(g)
    }
}



function showcount(){
	$.ajax({
	    url:"/re/contest.php?request=rank",
	    type:"post",
	    dataType:"json",
	    data:
	    {
	    	page : 1,
	    }, 
	    success:function(result){
	    	var c = "总数：" + result.count
	    	$("#Gncount").text(c)
		},
		error:function(){
		console.log(result)
        }
	    })
}

function Gnlastpage(page){
		$.ajax({
	    url:"/re/contest.php?request=rank",
	    type:"post",
	    dataType:"json",
	    async:false,
	    data:
	    {
	    	page : page,  //这里要获取最后一页的页数
	    }, 
	    success:function(result){

	    	var pagenum = Math.ceil(Number(result.count)/20)
			var remain = Number(result.count)%20
			// pagelist = [pagenum,remain]
	    	page = pagenum
	    	for (var j = remain;j<=19;j++) {
					var wipe = "#no"+ j
					$(wipe).hide()
				}  
				for(var i = 0;i < remain;i++){  
		        var a = ".userid" + i 
		        var b = ".username" + i 
		        var c = ".grp_score" + i 
		        var d = ".per_score" + i 
		        var e = ".fin_score" + i 
		        var f = ".num" + i 
		        var h = i+1+20*(page-1)
		        var g = "第"+h +"名"
		        // var tmp = Number(result.detail[i].score_g)*0.3+Number(result.detail[i].score_i)*0.7
		        var tmp = Number(result.detail[i].score_g)
		        var tm = tmp.toFixed(2)
				$(a).text(result.detail[i].number)
				$(b).text(result.detail[i].name)
				$(c).text(result.detail[i].score_g)
				$(d).text(result.detail[i].score_i)
				$(f).text(g)
				$(e).text(tm)
		    	}
		    	$(".gnnext").hide()
		    	$(".gnlast").show()
		    	page = pagenum
		    	console.log(page)
		},
		error:function(){
		console.log(result)
        }
	})
}
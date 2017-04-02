jQuery(document).ready(function($) {
    page = 1
    $.ajax({
        url:"/re/contest.php?request=rank",
        type:"post",
        dataType:"json",
        data:{
            page:page,
        },
        success:function(result){
            // console.log(result.count)
            for(var i = 0;i < result.detail.length;i++){
                // console.log(result.detail[i].name)
            }
            },
        error:function(result){
        // console.log(result) 
        }
    })
})



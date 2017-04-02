
jQuery(document).ready(function($) {
    $.ajax({
        url:"/re/contest.php?request=question",
        type:"post",
        dataType:"json",
        success:function(result){
            // for (var i =0;i<= result.length;i++) {
            //     console.log(result[i].question)
            // }
            console.log(result)
        },   
        error:function(result){
        console.log(result)
        }   
        })
})


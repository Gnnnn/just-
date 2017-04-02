<?php
// function getCatpcha()
// {
//     if( !$loginClassSessionUUID=session_id() ){
//         session_start();
//         $loginClassSessionUUID=session_id();
//     }

//     $cookie="/var/www/html/re/cookie/cookie-".$loginClassSessionUUID;
//     //curl要求绝对路径
//     $ch = curl_init();
//     curl_setopt($ch, CURLOPT_URL,"http://xk.autoisp.shu.edu.cn/Login/GetValidateCode?%20%20+%20GetTimestamp()");
//     curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
//     curl_setopt($ch, CURLOPT_COOKIEJAR,  $cookie);
//     $img=curl_exec($ch);
//     $imgdir="/re/captcha/captcha-".$loginClassSessionUUID.".jpeg";
//     $longdir="/var/www/html".$imgdir;
//     $file=fopen($longdir,"w"); 
//     fwrite($file, $img);
//     fclose($file);
//     curl_close($ch);
//     //拿到验证码和cookie

//     return $imgdir;
// }

// function login($username,$password,$captcha)
// {
//     if( !$loginClassSessionUUID=session_id() ){
//     session_start();
//     $loginClassSessionUUID=session_id();
//     }

//     $cookie="/var/www/html/re/cookie/cookie-".$loginClassSessionUUID;
//     //curl要求绝对路径
// 	$data=array('txtUserName'=>$username,'txtPassword'=>$password,'txtValiCode'=>$captcha);

//     $ch = curl_init();
//     curl_setopt($ch, CURLOPT_URL, "http://xk.autoisp.shu.edu.cn");
//     $header =array('Referer'=>"http://xk.autoisp.shu.edu.cn");
//     curl_setopt($ch,CURLOPT_HTTPHEADER,$header);
//     curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
//     curl_setopt($ch,CURLOPT_FOLLOWLOCATION,true);
//     curl_setopt($ch, CURLOPT_COOKIEFILE,$cookie);
//     curl_setopt($ch, CURLOPT_POSTFIELDS,$data);
//     $content=curl_exec($ch);
//     curl_close($ch);
//     unlink("/var/www/html/re/captcha/captcha-".$loginClassSessionUUID.".jpeg");

//     if(preg_match('/txtValiCode/',$content)){
//         return 0;
//     } else {
//         return 1;
//     }
// }

function login($username,$password){
    $pattern = '/<input[^>]*?name="__VIEWSTATE"[^>]*?value="([^"]*)".*?>/';
    $htm = file_get_contents('http://services.shu.edu.cn/Login.aspx');
    preg_match($pattern,$htm,$tmp);
    $__VIEWSTATE = $tmp[1];
    include("Snoopy.class.php");
    $snoopy = new Snoopy;
    $submit_url = "http://services.shu.edu.cn/Login.aspx";
    $submit_vars['txtUserName'] = $username;
    $submit_vars['txtPassword'] = $password;
    $snoopy->referer = "http://services.shu.edu.cn";
    $submit_vars["__EVENTTARGET"] = "";
    $submit_vars["__EVENTARGUMENT"] = "";
    $submit_vars["__VIEWSTATE"] = $__VIEWSTATE;//之前获取的特征码填入此处
    $submit_vars["btnOK"] = "提交(Submit)";
    $snoopy->submit($submit_url, $submit_vars);
    $snoopy->fetch("http://services.shu.edu.cn/User/userPerInfo.aspx");
    $info=$snoopy->results;
    $pattern_name = '/<span.*?id="userName">([^<]+)<\/span>/';//正则匹配获取的字符串中userName标签内的内容
    $pattern_sid = '/<span.*?id="nickname">([^<]+)<\/span>/';//与上类似
    $pattern_dep = '/<span.*?id="userDep">([^<]+)<\/span>/';//与上类似
    if( preg_match($pattern_name,$info,$name) &&
        preg_match($pattern_sid,$info,$sid) &&
        preg_match($pattern_dep,$info,$dep)) {
        registerToDB($username,$password,$name[1],$dep[1]);
        return 1;
    } else {
        return 0;
    }
}

function registerToDB($username,$password,$name,$academy)
{
    $con = mysql_connect("10.1.132.134","root","123000000z");
    mysql_select_db("justsoso", $con);
    $sql = mysql_real_escape_string("SELECT group_id FROM user WHERE `number`={$username}");
    $result=mysql_query($sql,$con);
    if(!mysql_num_rows($result)){
        $sql="INSERT INTO user(number,name,academy,password) VALUES
        ('{$username}','{$name}','{$academy}','{$password}')";
        mysql_query("SET NAMES 'UTF8'");
        mysql_query($sql,$con);
    }
}

?>

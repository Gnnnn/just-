<?php
include_once 'loginClass.php';

$request=$_GET["request"];

if($request=="captcha"){
  $url = getCatpcha();
  echo json_encode(array("pic"=>$url));
  return;
}

if($request=="login"){
  $username=$_POST["username"];
  $password=$_POST["password"];
  //$captcha=$_POST["captcha"];
  $isLogin = login($username,$password);
  if($isLogin){
  //if(1){
    $_SESSION["number"]=$username;
    //registerToDB($username,$password);
  }
  echo json_encode(array("success"=>$isLogin));
  //echo json_encode(array("success"=>1));
  return;
}

if($request=="isLogin"){
  echo json_encode(array(
    "isLogin"=>isset($_SESSION["number"]) ? 1 : 0
    ));
}
?>

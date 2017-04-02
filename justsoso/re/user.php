<?php
$request = $_GET["request"];

if($request=="info"){
  if(!isset($_SESSION["number"])){
    echo json_encode(array("number"=>0));
    return;
  }
  $con = mysql_connect("10.1.132.134","root","hhh");
  mysql_select_db("justsoso", $con);
  mysql_query("SET NAMES 'UTF8'");
  $num = $_SESSION["number"];
  $sql = "SELECT * FROM user WHERE `number`={$num};";
  $result = mysql_query($sql,$con);
  $s = mysql_fetch_array($result);
  $json["number"]=$num;
  $json["name"]=$s["name"];
  $json["academy"]=$s["academy"];
  $json["contact"]=$s["contact"];
  $json["group_id"]=$s["group_id"];
  $json["group_name"]=$s["group_name"];
  $json["score"]=$s["score_g"];         //第二阶段可能改变
  $sql = "SELECT count(name) FROM user WHERE `score_g`>{$s[score_g]};";
  $result = mysql_query($sql,$con);
  $s = mysql_fetch_array($result);
  $json["rank"]=$s["count(name)"]+1;
  echo  json_encode($json);
  return ;
} 
<?php
$request = $_GET["request"];

if($request=="begin"){
  if(!isset($_SESSION["number"])){
  echo json_encode(array("success"=>0,"error"=>0));
  return;
  }
  $time = time();
  $con = mysql_connect("10.1.132.134","root","hhh");
  mysql_select_db("justsoso", $con);
  mysql_query("SET NAMES 'UTF8'");
  $num = $_SESSION["number"];
  $sql = "SELECT group_id FROM user WHERE `number`={$num}";
  $result=mysql_query($sql,$con);
  $row = mysql_fetch_array($result);
  if(($group_id=$row["group_id"])==null){
    echo json_encode(array("success"=>0,"error"=>1));
    return;
  } else {
    $sql = "SELECT `gq1_is_f`,`gq1_stime` FROM list WHERE `type`=0 AND `type_id`={$group_id};";  //根据比赛进程可能改变
    $result=mysql_query($sql,$con);
    $row = mysql_fetch_array($result);
    if($row["gq1_is_f"]==1){   //可改�?
      echo json_encode(array("success"=>0,"error"=>2));
      return;
    }
    if($row["gq1_stime"]!=null){   //可改�?
      echo json_encode(array("success"=>0,"error"=>3,"time"=>$row["gq1_stime"]));
      return;
    }
    $sql = "SELECT count(number) FROM user WHERE `group_id`={$group_id};";
    $result = mysql_query($sql,$con);
    $row = mysql_fetch_array($result);
    $teamMatesNum=$row["count(number)"];
    if($teamMatesNum<=3){
      echo json_encode(array("success"=>0,"error"=>4));
      return; 
    }
    $sql = "UPDATE list SET `gq1_stime`={$time} WHERE `type`=0 AND `type_id`={$group_id};";
    echo json_encode(
      array("success"=>mysql_query($sql,$con) ? 1 : 0,
                "error"=>5)
      );
  }
}

if($request=="question"){
  if(!isset($_SESSION["number"])){
    echo json_encode(array("success"=>0,"error"=>0));
    return;
  }
  $con = mysql_connect("10.1.132.134","root","hhh");
  mysql_select_db("justsoso", $con);
  mysql_query("SET NAMES 'UTF8'");
  $num = $_SESSION["number"];
  $sql = "SELECT group_id FROM user WHERE `number`={$num}";
  $result=mysql_query($sql,$con);
  $row = mysql_fetch_array($result);
  if(($group_id=$row["group_id"])==null){
    echo json_encode(array("success"=>0,"error"=>1));
    return;
  } else {
    $sql = "SELECT list FROM list WHERE `type`=0 AND `type_id`={$group_id};";   //要变
    $result=mysql_query($sql,$con);
    $row =   ($result);
    $list = explode(',', $row["list"]);
    $listJson=array();
    $add = ($_POST["page"]-1)*30;
    foreach ($list as $value) {
      $id = $value+$add;
      $sql = "SELECT question,choice FROM ques WHERE `set`=0 AND `id`={$id}";   //要变
      $result=mysql_query($sql,$con);
      $row = mysql_fetch_array($result);
      $oq["question"]=$row["question"];   //as  one question
      $oq["choice"]=$row["choice"];
      $listJson[]=$oq;
    }
    echo json_encode($listJson);
    return;
  }
}

if($request=="answer"){
  $add = ($_POST["page"]-1)*10;
  $newAnswer = explode(',', $_POST["answer"]);
  if(!isset($_SESSION["number"])){
  echo json_encode(array("success"=>0,"error"=>0));
  return;
  }
  $con = mysql_connect("10.1.132.134","root","hhh");
  mysql_select_db("justsoso", $con);
  mysql_query("SET NAMES 'UTF8'");
  $num = $_SESSION["number"];
  $sql = "SELECT group_id FROM user WHERE `number`={$num}";
  $result=mysql_query($sql,$con);
  $row = mysql_fetch_array($result);
  if(($group_id=$row["group_id"])==null){
    echo json_encode(array("success"=>0,"error"=>1));
    return;
  } 
  $time = time();
  $sql = "SELECT `gq1_is_f`,`gq1_stime`,`gq1_a` FROM list WHERE `type`=0 AND `type_id`={$group_id} ";
  $result=mysql_query($sql,$con);
  $row = mysql_fetch_array($result);
  if($row["gq1_is_f"]){
    echo json_encode(array("success"=>0,"error"=>2));
    return;
  }
  if($time-$row["gq1_stime"]>3600 && $row["gq1_stime"]==null ){
    echo json_encode(array("success"=>0,"error"=>3));
    return;
  }
  $answer = explode(',', $row["gq1_a"]);
  foreach ($newAnswer as $key => $value) {
    $answer[$add+$key]=$value;
  }
  $answer=implode(',',  $answer);
  $sql = "UPDATE list SET `gq1_a`='{$answer}' WHERE `type`=0 AND `type_id`={$group_id} ";
  echo json_encode(
    array("success"=>mysql_query($sql,$con) ? 1 : 0,
      "error"=>4));
  return;
}

if($request=="stop"){
  if(!isset($_SESSION["number"])){
  echo json_encode(array("success"=>0,"error"=>0));
  return;
  }
  $con = mysql_connect("10.1.132.134","root","hhh");
  mysql_select_db("justsoso", $con);
  mysql_query("SET NAMES 'UTF8'");
  $num = $_SESSION["number"];
  $sql = "SELECT group_id FROM user WHERE `number`={$num}";
  $result=mysql_query($sql,$con);
  $row = mysql_fetch_array($result);
  if(($group_id=$row["group_id"])==null){
    echo json_encode(array("success"=>0,"error"=>1));
    return;
  }
  $sql = "UPDATE list SET `gq1_is_f`=1 WHERE `type`=0 AND `type_id`={$group_id}";
  echo json_encode(
    array(
      "success"=>mysql_query($sql,$con) ? 1 : 0,
      "error"=>1
            ));
  calculateScore();
  return;
}

if($request=="rank")
{
  $con = mysql_connect("10.1.132.134","root","hhh");
  mysql_select_db("justsoso", $con);
  mysql_query("SET NAMES 'UTF8'");
  $start=($_POST["page"]-1)*20;
  $sql = "SELECT `number`,`name`,`score_g`,`score_i` FROM user ORDER BY `score_g`*7+`score_i`*3 DESC LIMIT {$start},20";
  $result=mysql_query($sql,$con);
  $i=0;
  while ( ($row=mysql_fetch_array($result)) != null ){
    $json["detail"][$i]["number"]=$row["number"];
    $json["detail"][$i]["name"]=$row["name"];
    $json["detail"][$i]["score_g"]=$row["score_g"];
    $json["detail"][$i]["score_i"]=$row["score_i"];
    $i++;
  }
  $sql = "SELECT count(number) as count FROM user";
  $result=mysql_query($sql,$con);
  $row=mysql_fetch_array($result);
  mysql_close($con);
  $json["count"]=$row["count"];
  echo json_encode($json);
}

if($request=="rightNum")
{
  if(!isset($_SESSION["number"])){
  echo json_encode(array("success"=>0,"error"=>0));
  return;
  }
  $con = mysql_connect("10.1.132.134","root","hhh");
  mysql_select_db("justsoso", $con);
  mysql_query("SET NAMES 'UTF8'");
  $num = $_SESSION["number"];
  $sql = "SELECT group_id FROM user WHERE `number`={$num}";
  $result=mysql_query($sql,$con);
  $row = mysql_fetch_array($result);
  if(($group_id=$row["group_id"])==null){
    echo json_encode(array("success"=>0,"error"=>1));
    return;
  }
  $sql="SELECT `list`,`gq1_a` FROM list WHERE `type`=0 AND `type_id`={$group_id}";
  $result=mysql_query($sql,$con);
  $row = mysql_fetch_array($result);
  $list=explode(',',$row["list"]);
  $answer=explode(',',$row["gq1_a"]);
  $count = 0;
  $answerIndex=0;
  for($i=0;$i<3;$i++){
    $add = $i*30;
    for($j=0;$j<10;$j++){
      $id=$add+$list[$j];
      $sql="SELECT `answer` FROM ques WHERE `set`=0 AND `id`={$id}";
      $result=mysql_query($sql,$con);
      $row = mysql_fetch_array($result);
      if($answer[$answerIndex++]==$row["answer"]){
        ++$count;
      }
    }
  }
  echo json_encode(array("right"=>$count));
}

function calculateScore()
{
  $con = mysql_connect("10.1.132.134","root","hhh");
  mysql_select_db("justsoso", $con);
  mysql_query("SET NAMES 'UTF8'");
  $num = $_SESSION["number"];
  $sql = "SELECT group_id FROM user WHERE `number`={$num}";
  $result=mysql_query($sql,$con);
  $row = mysql_fetch_array($result);
  if(($group_id=$row["group_id"])==null){
    echo json_encode(array("success"=>0,"error"=>1));
    return;
  }
  $sql="SELECT `list`,`gq1_a` FROM list WHERE `type`=0 AND `type_id`={$group_id}";
  $result=mysql_query($sql,$con);
  $row = mysql_fetch_array($result);
  $list=explode(',',$row["list"]);
  $answer=explode(',',$row["gq1_a"]);
  $count = 0;
  $answerIndex=0;
  for($i=0;$i<3;$i++){
    $add = $i*30; 
    for($j=0;$j<10;$j++){
      $id=$add+$list[$j];
      $sql="SELECT `answer` FROM ques WHERE `set`=0 AND `id`={$id}";
      $result=mysql_query($sql,$con);
      $row = mysql_fetch_array($result);
      if($answer[$answerIndex++]==$row["answer"]){
        ++$count;
      }
    }
  }
  $score=(int)($count/30*100);
  $sql = "UPDATE user SET `score_g`={$score} WHERE `number`={$num}";
  mysql_query($sql,$con);
}

?>
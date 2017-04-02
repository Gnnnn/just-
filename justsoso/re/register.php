<?php
$request = $_GET["request"];

if($request=="clear"){
  $con = mysql_connect("10.1.132.134","root","hhh");
  mysql_select_db("justsoso", $con);
  mysql_query("SET NAMES 'UTF8'");
  $num = $_SESSION["number"];
  $sql = "UPDATE user SET `group_id`=null,`group_name`=null WHERE 1";
  $result = mysql_query($sql,$con);
}


if($request=="info"){
  if(!isset($_SESSION["number"])){
    echo json_encode(array("number"=>0));
    return;
  }
  $con = mysql_connect("10.1.132.134","root","hhh");
  mysql_select_db("justsoso", $con);
  mysql_query("SET NAMES 'UTF8'");
  $num = $_SESSION["number"];
  $sql = "SELECT `name`,`academy` FROM user WHERE `number`={$num};";
  $result = mysql_query($sql,$con);
  $s = mysql_fetch_array($result);
  echo  json_encode(array("number"=>$num,"name"=>$s["name"],"academy"=>$s["academy"]));
  return ;
}

if($request=="signUp"){
  if( $_POST["contact"]=='' || $_POST["group_name"]=='' || $_POST["is_cap"]==''
      || !isset($_SESSION["number"]) ) {
    echo json_encode(array("success"=>0,"error"=>0));
    return ;
  } else {
    foreach ($_POST as $key => $value) {
      $_POST[$key]= mysql_real_escape_string($value);
    }
    echo signUp($_POST["contact"],$_POST["group_name"],$_POST["is_cap"]);
    generateGroup($_POST["group_name"]);
    return;
  }
}

if($request=="isSignUp"){
  if(!isset($_SESSION["number"])){
    echo json_encode(array("isSignUp"=>0));
    return ;
  }
  $con = mysql_connect("10.1.132.134","root","hhh");
  mysql_select_db("justsoso", $con);
  mysql_query("SET NAMES 'UTF8'");
  $num = $_SESSION["number"];
  $sql = "SELECT `group_id` FROM user WHERE `number`={$num};";
  $result = mysql_query($sql,$con);
  $s = mysql_fetch_array($result);
  echo json_encode(array(
  "isSignUp"=>isset($s["group_id"]) ? 1 : 0
  ));
  return ;
}

function generateGroupList($group_id)
{
  $rand=array();
  for ($i=0;$i<30;$i++){
    $rand[]=$i;
  }
  $list=array_rand($rand,10);
  $listStr=implode(',', $list);
  $con = mysql_connect("10.1.132.134","root","hhh");
  mysql_select_db("justsoso", $con);
  mysql_query("SET NAMES 'UTF8'");
  $sql = "INSERT INTO list(type,type_id,list) VALUES('0','{$group_id}','{$listStr}')";
  mysql_query($sql,$con);
}

function generatePersonList()
{
  $rand=array();
  for ($i=0;$i<30;$i++){
    $rand[]=$i;
  }
  $list=array_rand($rand,10);
  $listStr=implode(',', $list);
  $con = mysql_connect("10.1.132.134","root","hhh");
  mysql_select_db("justsoso", $con);
  mysql_query("SET NAMES 'UTF8'");
  $sql = "INSERT INTO list(type,type_id,list) VALUES('1','{$_SESSION["number"]}','{$listStr}')";
  mysql_query($sql,$con);
}

function generateGroup($group_name)
{
    $con = mysql_connect("10.1.132.134","root","hhh");
    mysql_select_db("justsoso", $con);
    mysql_query("SET NAMES 'UTF8'");
    $num = $_SESSION["number"];
    $sql = "SELECT is_cap,group_name FROM user WHERE `number`={$num}";
    $result = mysql_query($sql,$con);
    $row = mysql_fetch_array($result);
    if($row["group_name"]==null){
      return ;
    }

    if ($row["is_cap"]==1){
      $sql = "SELECT count(distinct group_name) as eg FROM user"; //eg as existed group
      $result=mysql_query($sql,$con);
      $row=mysql_fetch_array($result);
      $group_id=$row["eg"].mt_rand(10,99);
      $sql = "UPDATE user SET `group_id`='{$group_id}' WHERE `number`={$num}";
      mysql_query($sql,$con);
      generateGroupList($group_id);
    } else {
      $sql = "SELECT `group_id` FROM user WHERE `group_name`='{$group_name}'"; //eg as existed group
      $result=mysql_query($sql,$con);
      $row=mysql_fetch_array($result);
      $sql = "UPDATE user SET `group_id`='{$row["group_id"]}' WHERE `number`={$num} ";
      mysql_query($sql,$con);
    }

    generatePersonList();

}

function signUp($contact,$group_name,$is_cap)
{
    $json = array ("success"=>0,"error"=>0);
    $con = mysql_connect("10.1.132.134","root","hhh");
    mysql_select_db("justsoso", $con);
    mysql_query("SET NAMES 'UTF8'");
    $num = $_SESSION["number"];
    $sql = "SELECT group_id FROM user WHERE `number`={$_SESSION["number"]}";
    $result=mysql_query($sql,$con);
    $row = mysql_fetch_array($result);
    if($row["group_id"]!=null){
      return json_encode($json);
    }
    $sql = "SELECT count(number) FROM user WHERE `group_name`='{$_POST["group_name"]}';";
    $result = mysql_query($sql,$con);
    $row = mysql_fetch_array($result);
    $teamMatesNum=$row["count(number)"];
    if($is_cap){
      if(!$teamMatesNum){
        $sql = "UPDATE user SET `contact`='{$_POST["contact"]}',`group_name`='{$_POST["group_name"]}',`is_cap`=1 WHERE `number`={$num};";
        $json["success"]=mysql_query($sql,$con) ? 1 : 0;
        return json_encode($json);
      } else {
        $json["error"]=1;
        return json_encode($json);
      }
    } else {
      if(!$teamMatesNum){
        $json["error"]=2;
        return json_encode($json);
      } else {
        if($teamMatesNum>=3){
          $json["error"]=3;
          return json_encode($json);
        } else {
          $sql = "UPDATE user SET `contact`='{$_POST["contact"]}',`group_id`='{$_POST["group_id"]}',`group_name`='{$_POST["group_name"]}',`is_cap`=0 WHERE `number`={$_SESSION["number"]};";
          $json["success"]=mysql_query($sql,$con) ? 1:0;
          return json_encode($json);
        }
      }
    }
}


?>
<?php
require_once("../../config/mongodb.php");
function isLogin(){
  global $db;
  session_start();
  @$uid=$_SESSION["uid"];
  if($uid){
    $user=$db->users->findOne(["_id"=>$uid]);
    return ["ok"=>1,"uname"=>$user["uname"]];
  }else{
    return ["ok"=>0,"uname"=>""];
  }
}
function login(){
  global $db;
  session_start();
  @$uname=$_REQUEST["uname"];
  @$upwd=$_REQUEST["upwd"];
  $user=$db->users->findOne(["uname"=>$uname,"upwd"=>$upwd]);
  if($user){
    $_SESSION["uid"]=$user["_id"];
    return ["ok"=>1,"msg"=>""];
  }else
    return ["ok"=>0,"msg"=>"用户名或密码不正确"];
}
function logout(){
  session_start();
  $_SESSION["uid"]="";
}
function register(){
  global $db;
  @$uname=$_REQUEST["uname"];
  @$upwd=$_REQUEST["upwd"];
  $user=[
    "uname"=>$uname,
    "upwd"=>$upwd
  ];
  $db->users->insert($user);
}
function valiName(){
  global $db;
  @$uname=$_REQUEST["uname"];
  $user=$db->users->findOne(["uname"=>$uname]);
  return $user==null?"true":"false";
}

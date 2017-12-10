<?php
require_once("../../config/mongodb.php");
function createArticle(){
  global $db;
  session_start();
  @$uid=$_SESSION["uid"];
  @$title=$_REQUEST["title"];
  @$content=$_REQUEST["content"];
  
  $article=[
    "title"=>$title,
    "content"=>$content,
    "author"=>MongoDBRef::create("users",$uid),
    "createdDate"=>time()*1000
  ];
  $db->articles->insert($article);
}
function listArticle(){
  global $db;
  session_start();
  $list=[];
  $cursor=$db->articles->find()->sort(["createdDate"=>-1]);
  while($cursor->hasNext()) {
    $article=$cursor->getNext();
    $article["author"]=MongoDBRef::get($db, $article['author']);
    $list[]=$article;
  }
  return $list;
}
function viewArticle(){
  global $db;
  @$_id=$_REQUEST["_id"];
  $article=$db->articles->findOne(["_id"=>new MongoId($_id)]);
  $article["author"]=MongoDBRef::get($db, $article['author']);
  return $article;
}
function isAuthor(){
  global $db;
  session_start();
  @$_id=$_REQUEST["_id"];
  @$uid=$_SESSION["uid"];
  $article=$db->articles->findOne(["_id"=>new MongoId($_id)]);
  $author=MongoDBRef::get($db, $article['author']);
  return $uid.""==$author["_id"].""?"true":"false";
}
function editArticle(){
  global $db;
  @$_id=$_REQUEST["_id"];
  @$title=$_REQUEST["title"];
  @$content=$_REQUEST["content"];
  $article=$db->articles->findOne(["_id"=>new MongoId($_id)]);
  $article["title"]=$title;
  $article["content"]=$content;
  $db->articles->save($article);
}
function removeArticle(){
  global $db;
  @$_id=$_REQUEST["_id"];
  $db->articles->remove(["_id"=>new MongoId($_id)]);
}
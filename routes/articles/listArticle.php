<?php
header("Content-Type:application/json");
require_once("../../controllers/article.controller.php");
$result=listArticle();
echo json_encode($result);
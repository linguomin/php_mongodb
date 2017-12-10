<?php
header("Content-Type:application/json");
require_once("../../controllers/article.controller.php");
echo json_encode(viewArticle());
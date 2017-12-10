<?php
header("Content-Type:application/json");
require_once("../../controllers/user.controller.php");
$result=isLogin();
echo json_encode($result);
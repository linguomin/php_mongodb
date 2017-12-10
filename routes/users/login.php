<?php
header("Content-Type:application/json");
require_once("../../controllers/user.controller.php");
$result=Login();
echo json_encode($result);
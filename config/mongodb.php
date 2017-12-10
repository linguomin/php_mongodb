<?php
//"mongodb://[username:password@]host1[:port1][,host2[:port2:],...]/db";
$url="mongodb://localhost:27017/php_mongodb";
$conn=new MongoClient($url);
$db=$conn->php_mongodb;
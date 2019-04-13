<?php
    header("content-type:text/html;charset=utf-8");
    $servername = '127.0.0.1';
    $serverpass = '123456';
    $serverport = 'root';
    $serverdetabase = 'takeoff';

    $conn = new mysqli($servername,$serverport,$serverpass,$serverdetabase);
   
    if($conn->connect_error){
        die('连接失败:'.$conn->connect_error);
    };
    // echo('连接成功');
?>
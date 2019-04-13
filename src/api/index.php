<?php
    include 'server.php';
    $start = isset($_GET['start']) ? $_GET['start'] : ''; //开始
    $qty = isset($_GET['qty']) ? $_GET['qty'] : ''; //数量
   

    $sql = "select * from commodity id limit ".$start.",".$qty."";
    $res = $conn->query($sql);
    $data = $res->fetch_all(MYSQLI_ASSOC);

    $arr = array(
        'data'=>$data,
        'start'=>$start,
        'qty'=>$qty,
        );

    echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    $res->close();
    $conn->close();
?>
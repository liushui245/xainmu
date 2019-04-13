<?php  
    include 'server.php';
    // header("content-type:text/html;charset=utf-8");
    $id = isset($_GET['id']) ? $_GET['id'] : '';
    // $id = 'b3';
    // $high = isset($_GET['high']) ? $_GET['high'] : '';
    
    $sql = "select * from detail inner join commodity on detail.daid = commodity.daid where detail.daid ='".$id."'";
    $res = $conn->query($sql);
    $data = $res->fetch_all(MYSQLI_ASSOC);
    // var_dump($data);
    $arr = array(
        'data'=>$data,
        'id'=>$id,
        );
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    // echo $id;

    $res->close();
    $conn->close();
?>
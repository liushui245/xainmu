<?php  
    include 'server.php';
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    // $name = '17665363201';
    $sql = 'select user from login where user = "'.$name.'" ';

    $res = $conn->query($sql);
     
    $data = mysqli_num_rows($res); //查询长度
    $arr = array(
        'num'=>$data,
        'data'=>$name
        );
   echo json_encode($arr,JSON_UNESCAPED_UNICODE);
   
   $res->close();
   $conn->close();

?>
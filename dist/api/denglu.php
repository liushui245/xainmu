<?php  
    include 'server.php';
    $user = isset($_POST['user']) ? $_POST['user'] : '';
    $pass = isset($_POST['pass']) ? $_POST['pass'] : '';
    // $sole = isset($_POST['sole']) ? $_POST['sole'] : '';
    // $pass = '123456';
    // $user = 'jq8883223';
    // $sole = 'jq8883223';
    // SELECT * FROM login where user = 'jq8883223' or sole = 'jq8883223' and pass ='123456'
    $sql = "select * from login where user = '".$user."' or sole = '".$user."' and pass = '".$pass."'";
    $res = $conn->query($sql);
     
    $datafe = $res->fetch_all(MYSQLI_ASSOC);
    $data = mysqli_num_rows($res); //查询长度
    $arr = array(
        'num'=>$data,
        'user'=>$user,
        'pass'=>$pass,
        'data'=>$datafe
        );
   echo json_encode($arr,JSON_UNESCAPED_UNICODE);
   // var_dump($arr);
   $res->close();
   $conn->close();

?>
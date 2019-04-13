<?php  
    include 'server.php';
    $account = isset($_GET['account']) ? $_GET['account'] : '';
    
    // $account = '17665363202';
   
    $sql = "select * from shopping inner join commodity on shopping.daid = commodity.daid where shopping.user = '".$account."'";
    $res = $conn->query($sql);
    $data = $res->fetch_all(MYSQLI_ASSOC);
    $arr = array(
        'data'=>$data,
        'account'=>$account
        );
   echo json_encode($arr,JSON_UNESCAPED_UNICODE);
//    var_dump($data);
   $res->close();
   $conn->close();

?>
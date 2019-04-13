<?php  
    include 'server.php';
    $user = isset($_GET['user']) ? $_GET['user'] : '';//user
    $id = isset($_GET['id']) ? $_GET['id'] : '';  //daid 
    $val = isset($_GET['val']) ? $_GET['val'] : ''; //val

    // $user = '17665363201';
    // $id = 'flyxie66';
    // $val = '1';
    //先查询
    $sqlcha = "select * from shopping where daid = '".$id."' and user = '".$user."'";
    $rescha = $conn->query($sqlcha);
    $unm = mysqli_num_rows($rescha);
    $xinzhi = '';
    if($unm > 0){
        $datacha = $rescha->fetch_all(MYSQLI_ASSOC);
        $zhi = $datacha[0]['quantity'];
        $xinzhi = $zhi + $val;
        $sql = "update shopping set quantity = '".$xinzhi."' where daid='".$id."' and user= '".$user."'";
        
    }else if($unm <= 0){
        $sql = "insert into shopping (user,daid,quantity) values ('".$user."','".$id."','".$val."')";
    }

    $res = $conn->query($sql);
    // $data = $res->fetch_all(MYSQLI_ASSOC);

    $arr = array(
        'user'=>$user,
        'id'=>$id,
        'val'=>$val,
        'buer'=>true,
        'xinzhi'=>$xinzhi
        );
    // var_dump($data);
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);

    
    // $res->close();
    $conn->close();
?>
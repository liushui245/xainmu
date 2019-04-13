<?php  
    include 'server.php';
    $high = isset($_GET['high']) ? $_GET['high'] : '';
    $contnt = isset($_GET['conten']) ? $_GET['conten'] : '';
    $qty = isset($_GET['qty']) ? $_GET['qty'] : '';
    // echo $contnt;
    // $qty = 12;
    // $contnt = 1;
    // $high = 0;
// '".$contnt."','".$qty."'
    //页   数量     2*10
    $contnt = ($contnt-1) * $qty;
    if($high == ''){
        $sql = "select * from commodity id limit ".$contnt.",".$qty.""; //注意这里不用双单引号，应该是数字，不是字符串
    }else{
        $sql = "select * from commodity order by price ".$high." limit ".$contnt.",".$qty."" ; 
    }
    // echo $sql;
    
    // http://127.0.0.1:1999/php/home.php?content=0&qty=10
    // var_dump($sql);
    
    // 返回数量
    $num = 'select * from commodity';
    $numshu = $conn->query($num);
    $numdata = mysqli_num_rows($numshu);
    
    $res = $conn->query($sql);
    $data = $res->fetch_all(MYSQLI_ASSOC);

    $arr = array(
        'data'=>$data,
        'conten'=>$contnt,
        'qty'=>$qty,
        'num'=>$numdata,
        'high'=>$high
        );
    // var_dump($data);
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);

    // $num-<close();
    // $numshu->close();
    // $data->close();
    $res->close();
    $conn->close();


?>
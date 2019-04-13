<?php
    include 'server.php';
    $key = isset($_GET['key']) ? $_GET['key'] : '';  //键 + - 
    $num = isset($_GET['dataid']) ? $_GET['dataid'] : ''; //id值
//    $key = 'jia';
//    $num = 'flyxie68';

    $sqlcha = "select * from shopping where daid = '".$num."'";
   
    $rescha = $conn->query($sqlcha);
    $chares = $rescha->fetch_all(MYSQLI_ASSOC);
    $zhi = $chares[0]['quantity'];
    
    if($zhi == 0){
        $sql = "delete from shopping where daid = '".$num."'"; 

    }else if($key == 'jian'){
        --$zhi; 
        $sql = "update shopping set quantity = '".$zhi."' where daid = '".$num."'"; 
        if($zhi == 0){
            
            $sqlremove = "delete from shopping where daid = '".$num."'"; 
            $ress = $conn->query($sqlremove);
        }
       
    }else if($key == 'jia'){
        ++$zhi;
        $sql = "update shopping set quantity = '".$zhi."' where daid = '".$num."'"; 
       
    }else if($key == 'del'){
        $sql = "delete from shopping where daid = '".$num."'"; 
    }


    $res = $conn->query($sql);

    $arr = array(
        'data'=>$zhi,
        'num'=>$num,
        'key'=>$key,
        'cha'=>$chares
        );
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);
   

//    $res->close();
   $conn->close();

?>
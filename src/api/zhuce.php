<?php  
    
    include 'server.php';
    $user = isset($_POST['user']) ? $_POST['user'] : '';
    $pass = isset($_POST['pass']) ? $_POST['pass'] : '';
    $sole = getRandomString(10);

    //判断用户名和密码是否为空
    if($user !='' && $pass !=''){
        $sql = "insert into login(sole,user,pass) value('".$sole."','".$user."','".$pass."')";
        // echo $sql;
    }else{
        $sql = '';
    };
   
    //不为空则执行
     if($res = $conn->query($sql)){
        $arr = array(
            'insert'=>true,
            'user'=>$user,
            'pass'=>$pass,
            'sole'=>$sole
        );
     }else{
        $arr = array(
            'insert'=>false,
            'user'=>$user,
            'pass'=>$pass,
            'sole'=>$sole
        );
     };
     function getRandomString($len, $chars=null){
         if (is_null($chars)){
            $chars = "abcdefghijklmnopqrstuvwxyz0123456789";
         }  
         mt_srand(10000000*(double)microtime());
         for ($i = 0, $str = '', $lc = strlen($chars)-1; $i < $len; $i++){
             $str .= $chars[mt_rand(0, $lc)];  
         }
         return $str;
     };
    // $data = mysqli_num_rows($res); //查询长度
    // 
   echo json_encode($arr,JSON_UNESCAPED_UNICODE);
   
  
   $conn->close();


?>
<?php
 
$servername = "localhost";
$username = "root";
$password = "root";
$port = 8889;
$database = "m_husainova_db"; // name of your databse
 
try{
$conn = new PDO("mysql:host=$servername; dbname=$database; port=$port", $username, $password);
// set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // not sure if you need the next line but you may
    //$conn->exec("SET NAMES 'utf8'");
 
}catch(Exception $e){
      echo "Error: " . $e->getMessage();
    }
?>

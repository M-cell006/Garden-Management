<?php

header("Content-Type: application/json; charset=UTF-8");
main();

function main(){

  require_once 'connectToDB.php';
  require_once "verifyToken.php";
  require_once "secret.php";

  // set default response
  $response = array("code" => 0, "data" => "");

   // capture the input of JSON request from client
   $request = file_get_contents('php://input');

   //decode the JSON so it is useable in php
   $data = json_decode($request);
   
   // grab the webToken
   $token = $data->webToken;
   
   // get secret key
   $secret = getKey();
 
   // determine if the webToken is valid
   if (verifyToken($token, $secret)){

    //instantiate the prepared parametrised SQL statement

    $sql = "SELECT TaskID, taskName 
            FROM task
            ORDER BY taskName";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    // get all results
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    //set the results;
    if ($stmt->rowCount() > 0) {
      $response["code"] = 1;
      $response["data"] = $results;
    }
    //send the results back
    echo json_encode($response);



    //close the connection
    $conn = null;
   }
}

?>
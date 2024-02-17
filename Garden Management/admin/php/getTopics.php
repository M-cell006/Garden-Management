<?php

header("Content-Type: application/json; charset=UTF-8");
main();

function main(){

  require_once 'connectToDB.php';

  // set default response
  $response = array("code" => 0, "data" => "");

  // capture the input of JSON request from client
  $request = file_get_contents('php://input');
 
  //decode the JSON so it is useable in php
  $decodedData = json_decode($request);

  // Retrieve the condition sent
   $condition = $decodedData-> condition;

  // Retrieve the data sent
  $data = $decodedData-> dataSent;

  if ($condition == "subject"){

    //instantiate the prepared parametrised SQL statement
    $sql = "SELECT DISTINCT Topic.topicID, Topic.topicName 
    FROM Topic, Product
    WHERE Product.topicID = Topic.topicID
    AND Product.subjectID = :subjectid";

    $stmt = $conn->prepare($sql);
    $stmt -> bindParam(':subjectid', $data->subjectid);
  }
  
  else if ($condition == "subjectlevel") {

  //instantiate the prepared parametrised SQL statement
  $sql = "SELECT Topic.topicID, Topic.topicName 
          FROM Topic, Product, Level
          WHERE Product.topicID = Topic.topicID
          AND Product.levelID = Level.levelID
          AND Product.subjectID = :subjectid
          AND Level.levelID = :levelid";

  
  $stmt = $conn->prepare($sql);
  $stmt -> bindParam(':subjectid', $data->subjectid);
  $stmt -> bindParam(':levelid', $data->levelid);

  }

  $stmt->execute();
  // Fetch the results as an associative array
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


?>
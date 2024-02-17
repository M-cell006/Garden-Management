<?php

header("Content-Type: application/json; charset=UTF-8");
main();

function main(){

  require_once 'connectToDB.php';
  require_once "sanitise.php";

  // response codes are:
  // code 0 = failure, 1 = success

  // set default response1
  $response1 = array("code" => 0, "message" => "");

  // set default response2
  $response2 = array("code" => 0, "message" => "");

  // set default response3
  $response3 = array("code" => 0, "message" => "");


  // capture the input of JSON request from client
  $request = file_get_contents('php://input');

  //decode the JSON so it is useable in php
  $jsonRequest = json_decode($request);

   //var_dump($jsonRequest);


  //get the data
  // sanitise is a function located in ../cleanup/sanitise.php
  $plantid = sanitise($jsonRequest->subjectid);
  $commonname = sanitise($jsonRequest->subjectname);
  $levelid = sanitise($jsonRequest->levelid);
  $levelname = sanitise($jsonRequest->levelname);
  $topicid = sanitise($jsonRequest->topicid);
  $topicname = sanitise($jsonRequest->topicname);
  $price = sanitise($jsonRequest->price);
  $datefrom = sanitise($jsonRequest->datefrom);
;

  if ($subjectid == -1) {
    // try to add the new subject
    $response1 = addNewPlant($conn, $subjectname);
  }

  if ($topicid == -1) {
    // try to add the new topic
    $response2 = addNewTopic($conn, $topicname);

  }

  // try to add a new product
  $response3 = addNewProduct($conn, $subjectname, $topicname, $levelid,$price,$datefrom);

  // Prepare the responses as an array of arrays
   $responses = array($response1, $response2, $response3);

  //send the JSON response

  echo json_encode($responses);

  //close the connection
  $conn = null;
}

function addNewPlant ($conn, $subjectname){

  $sql = "INSERT into Subject VALUES
          (NULL, :subjectname)";

  $stmt = $conn->prepare($sql);
  //bind parameters to the data

  $stmt->bindParam(':subjectname', $subjectname);

  try{
    $stmt->execute();
    $response1["code"] = 1;
    $response1["message"] = "Subject: added successfully";
  }
  catch (PDOException $e){
      $response1["code"] = 0;
      $response1["message"] = $e->getMessage();

  }
  return $response1;

}

function addNewTopic ($conn, $topicname){

  $sql = "INSERT into Topic VALUES
          (NULL, :topicname)";

  $stmt = $conn->prepare($sql);
  //bind parameters to the data

  $stmt->bindParam(':topicname', $topicname);

  try{
    $stmt->execute();
    $response2["code"] = 1;
    $response2["message"] = "Topic: added successfully";
  }
  catch (PDOException $e){
      $response2["code"] = 0;
      $response2["message"] = $e->getMessage();

  }
  return $response2;

}

function addNewProduct($conn, $subjectname, $topicname, $levelid,$price, $datefrom){

  $sql = "INSERT into Product VALUES
          (NULL, 
           (SELECT subjectID FROM Subject WHERE subjectname = :subjectname),
           (SELECT topicID FROM Topic WHERE Topicname = :topicname),
          :levelid,
          :price,
          :datefrom,
          NULL)";

  $stmt = $conn->prepare($sql);
  //bind parameters to the data

  $stmt->bindParam(':subjectname', $subjectname);
  $stmt->bindParam(':topicname', $topicname);
  $stmt->bindParam(':levelid', $levelid);
  $stmt->bindParam(':price', $price);
  $stmt->bindParam(':datefrom', $datefrom);

  try{
    $stmt->execute();
    $response3["code"] = 1;
    $response3["message"] = "Product: added Successfully";
  }
  catch (PDOException $e){
      $response3["code"] = 0;
      $response3["message"] = $e->getMessage();

  }
  return $response3;

}
    
?>
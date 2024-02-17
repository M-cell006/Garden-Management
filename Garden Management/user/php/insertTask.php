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
  $plantid = sanitise($jsonRequest->plantid);
  $plantname = sanitise($jsonRequest->plantname);
  $taskid = sanitise($jsonRequest->taskid);
  $taskname = sanitise($jsonRequest->taskname);
  $pldescription = sanitise($jsonRequest->pldescription);
  $frequency = sanitise($jsonRequest->frequency);
;

  // try to add a new task
  $response3 = addNewTask($conn, $plantname, $taskname, $pldescription, $frequency);

  // Prepare the responses as an array of arrays
   $responses = array($response1, $response2, $response3);

  //send the JSON response

  echo json_encode($response3);

  //close the connection
  $conn = null;
}

function addNewTask($conn, $plantname, $taskname, $pldescription, $frequency){

  $sql = "INSERT into planttask VALUES
          (NULL, 
           (SELECT plantID FROM plant WHERE CommonName = :plantname),
           (SELECT taskID FROM task WHERE taskName = :taskname),
          :pldescription,
          :frequency,
          NULL)";

  $stmt = $conn->prepare($sql);
  //bind parameters to the data

  $stmt->bindParam(':plantname', $plantname);
  $stmt->bindParam(':taskname', $taskname);
  $stmt->bindParam(':pldescription', $pldescription);
  $stmt->bindParam(':frequency', $frequency);

  echo ("Plant selected: $plantname");
  echo("Task name: $taskname");


  try{
    $stmt->execute();
    $response3["code"] = 1;
    $response3["message"] = "Task: added Successfully";
  }
  catch (PDOException $e){
      $response3["code"] = 0;
      $response3["message"] = $e->getMessage();

  }
  return $response3;

}
    
?>
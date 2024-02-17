<?php
    header("Content-Type: application/json; charset=UTF-8");
    main();

    function main(){
        require 'connectToDB.php';
        require 'sanitise.php';
        // response codes are:
        // code 0 = failure, 1 = success, 2 = failure due to duplicate

        // set default code in new dictionary
        $response = array("code" => 0, "message" => "");

    
        // capture the input of JSON request from client
        $request = file_get_contents('php://input');

        //decode the JSON so it is useable in php
        $jsonRequest = json_decode($request);

        //var_dump($jsonRequest);

        //determine if results are found
        if (checkForExistingUser($conn, $jsonRequest) != 0){
            $response["code"] = 2;
            $response["message"] = "User already exists";
           

        }
        else{
            //try to add the customer
            $response = addCustomer($conn, $jsonRequest);
        }
        //send the JSON response
        echo json_encode($response);

        //close the connection
        $conn = null;
    
    }

    function checkForExistingUser ($conn, $jsonRequest){

        
        //determine if the email is already in the database
        $stmt = $conn->prepare("
        SELECT COUNT(userEmail) as noOfUsers
        FROM useraccount
        WHERE userEmail = :email");

        $stmt -> bindParam(':email', $jsonRequest->email);

        //execute the query
        $stmt->execute();

        //set the fetch mode to and get keys and values (dictionary)
        $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);

        //get all results
        $results = $stmt->fetchAll();

        //grab the number of results
        $noOfResults = $results[0]["noOfUsers"];
       
     
        return $noOfResults;
    
    
    }

    function addCustomer($conn, $jsonRequest){

        //initialise reaponse
        $response = array("code"=>0, "message"=>"");


        //get the data
        // sanitise is a function located in ../cleanup/sanitise.php
       
        $email = sanitise($jsonRequest->email);
        $password = sanitise($jsonRequest->password);

        //create a password hash
        $password = generatePassword($password);


        $sql = 'INSERT INTO userAccount (userEmail, userPassword) 
        VALUES (:email, :password)';

        $stmt = $conn->prepare($sql);
        
        //bind parameters to the data

        
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);

        //execute the query

        try{
            $stmt->execute();
            $response["code"] = 1;
            $response["message"] = "successfully added";
        }
        catch (PDOException $e){
            $response["code"] = 0;
            $response["message"] = $e->getMessage();

        }
        return $response;



    }

    function generatePassword($password){

        //hash password using SHA-256
        return hash('sha256', $password);

    }

?>


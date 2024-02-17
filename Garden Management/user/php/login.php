<?php
    header("Content-Type: application/json; charset=UTF-8");
    main();

    function main(){

        require_once 'connectToDB.php';
        require_once "token.php";
        require_once "sanitise.php";

        // response codes are:
        // code 0 = failure, 1 = success, 2 = failure due to incorrect password

        // set default code in new dictionary
        $response = array("code" => 0, "jwt" => "", "data" => "");

    
        // capture the input of JSON request from client
        $request = file_get_contents('php://input');

        //decode the JSON so it is useable in php
        $jsonRequest = json_decode($request);


        // sanitise the data
        $email = sanitise($jsonRequest->email);
        $enteredPassword = sanitise($jsonRequest->password);

        //determine if the email is already in the database
        $sql = "SELECT userID, userEmail, userPassword FROM userAccount WHERE userEmail = :email";

        $stmt = $conn->prepare($sql);

        // bind parameter
        $stmt -> bindParam(':email', $email);
 
        //execute the query
        $stmt->execute();


        //set the fetch mode to associative and get keys and values (dictionary)
        $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
        

        if ($stmt->rowCount()>0){
            // user exists, so check password

            // put user details in a dictionary
            $user = $stmt->fetch(PDO::FETCH_ASSOC, PDO:: FETCH_ORI_NEXT);
            
            if (verifyPassword($enteredPassword, $user["userPassword"])) {
               
                // password verified, generate a token
            
                $response["code"] = 1;
                $response["jwt"] = getToken($user);
                $response["data"] = $user;
            

            }
            else{
                // incorrect password
                $response["code"] = 2;
                $response["jwt"] = "userID found";
                $response["data"] = $user;
            }
        }


        //send the JSON response
        echo json_encode($response);
        
        //close the connection
        $conn = null;
    
    }
       // Function to hash a password using SHA-256
       function hashPassword($password) {
        return hash('sha256', $password);
    }

    // Function to check if entered password matches the hashed password in the database
    function verifyPassword($enteredPassword, $hashedPasswordFromDatabase) {
        $hashedEnteredPassword = hashPassword($enteredPassword);
        if ($hashedEnteredPassword === $hashedPasswordFromDatabase){
            return true;
        }
        else{
            return false;
        }

    }
    
?>

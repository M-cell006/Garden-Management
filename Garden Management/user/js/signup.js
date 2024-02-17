
// This java script file receives the data from the signup.html form
// checks to ensure the user passwords match before sending it to the server

// Add event listeners to the form
const form = document.getElementById('signUpForm');
form.addEventListener('submit', handleFormSubmit);


  function handleFormSubmit(event) {
	event.preventDefault();
	processForm()

  }


  function processForm(){
	
	var userDetails = gatherData()
	console.log(userDetails); // used for debugging

	if (validateDetails(userDetails)){
		// post the data
		postRequest(userDetails)
	}
	else{
		alert ("passwords do not match - try again")
		document.getElementById("password1").value = ""
		document.getElementById("password2").value = ""

	}
	
  }

  //gather the data from the form fields into JSON 
  function gatherData(){
	
	var userDetails = {
		
		email:   document.getElementById("email").value,
		password:   document.getElementById("password1").value,
		password2:   document.getElementById("password2").value,

	}
	return userDetails
}

// check if passwords match
function validateDetails(userDetails){
	//initialise variables 
	var valid = false
	
	if (userDetails.password == userDetails.password2){
		valid = true
	}
	
	return valid
}

// make an AJAX POST request to server 
async function postRequest(userDetails){
	
	// use the fetch API 
	try{

		const response = await fetch("../php/signup.php",{
			method: 'POST',
			headers: {
				
				'Content-Type': 'application/json', // sent request
				'Accept': 		'application/json'  // expected data sent back
				
			},
			body: JSON.stringify(userDetails), // convert object into a JSON string
		})

		const data = await response.json();
		console.log(data);
		handleResponseCode(data);
		
	}catch (error){
    	console.log('Error:',error);
	}
}

// handle response from server 
function handleResponseCode(data){
	console.log("response code: ", data.code);
	console.log("response message: ", data.message);

	if (data.code  == 1){
		alert ("Your account has been successfully created")
		// redirect to the dashboard
		var redirect = "../pages/userDashboard.html";
		window.location.assign(redirect);
	}
	else if (data.code == 2 ){
		alert (data.message );
	}
}

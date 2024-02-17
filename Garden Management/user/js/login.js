// this java script file receives the data from the login.html form
// checks to ensure the user passwords match before sending it to the server

// Add event listeners to the form
const form = document.getElementById('userLoginForm');
form.addEventListener('submit', handleFormSubmit);


function handleFormSubmit(event) {
	event.preventDefault();

	//gather the data from the form fields into JSON 
	var userDetails = {
		
		email:   document.getElementById("email").value,
		password:   document.getElementById("password").value

	}
	console.log(userDetails);
	postRequest(userDetails);


}


async function postRequest(userDetails){
	// make an AJAX POST request to server 

	try{

		const response = await fetch("../php/login.php",{
			method: 'POST',
			headers: {
				
				'Content-Type': 'application/json', // sent request
				'Accept': 		'application/json'  // expected data sent back
				
			},
			body: JSON.stringify(userDetails),
		})

		const userdata = await response.json();
		console.log(userdata);
		handleResponseCode(userdata);

	}catch (error){
    	console.log('Error:',error);
	}
	
}

function handleResponseCode(userdata){

	const responseCode = userdata.code;
	const responseJwt = userdata.jwt;
	const responseData = userdata.data;

	console.log("response code: ", responseCode);
	console.log("response jwt: ", responseJwt);
	console.log("response data: ", responseData);
	console.log("response data userid: ", userdata.data.userID);

	if (responseCode  == 0){
		// account does not exist
		alert ("Invalid credentials! Please sign up for an account");
	}
	else if (responseCode == 1){
		// account exist, create a session storage to store key-value pairs in the browser
		//session storage is faster and more secure than cookies for storing small amounts of data
		//data stored in session storage is only  accessible within the tab where it was stored
		//when the user closes the tab or the browser, the session storage is deleted
		
		// Store a value in session storage
		sessionStorage.setItem("webToken", responseJwt);
		sessionStorage.setItem("loggedIn", "true");

		// store custID in local storage using localStorage API
		localStorage.setItem('userID', responseData.userID);

		// redirect to the dashboard
		var redirect = "../pages/userFunction.html";
		window.location.assign(redirect);
	}
	else if (responseCode == 2){
		console.log (responseData);
		alert("Please check your email and password again.")

	}


}


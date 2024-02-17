
document.addEventListener('DOMContentLoaded', function () {

  //gather the session data
	const dataTosend = {
		// retrieve the CustID from local storage using the localStorage API
		userID: localStorage.getItem('userID'),
		webToken: sessionStorage.webToken
	}
	console.log(dataTosend);
	  
	if (dataTosend.webToken === undefined) {
	
		// webToken is undefined, so user not logged in
	   
		alert("You need to log in");
		window.location.assign("../pages/login.html");
	
	} else {
    
  const condition = "allProfile"
  fetchProfile(condition, dataTosend);
    
  }
}
)

/*
// Add event listeners to the custom buttons
document.getElementById('activeSubsButton').addEventListener('click', handleActiveButton);
document.getElementById('matureSubsButton').addEventListener('click', handleMatureButton);


// Function to handle form submission for Active Subscriptions
function handleActiveButton() {
  console.log("Active submissions Submit");
  const cardTitleElement = document.querySelector('.card-header');
  changeCardTitle(cardTitleElement, "View customers with active subscriptions");
  const dataTosend = {
		// retrieve the CustID from local storage using the localStorage API
		adminID: localStorage.getItem('adminID'),
		webToken: sessionStorage.webToken
	}
  const condition = "activeSubsCust"
  fetchAllCustomers(condition, dataTosend);

}

// Function to handle form submission for Matured Subscription
function handleMatureButton() {
  console.log("Mature submissions Submit");
  const cardTitleElement = document.querySelector('.card-header');
  changeCardTitle(cardTitleElement, "View customers whose subscriptions have matured");
  const dataTosend = {
		// retrieve the CustID from local storage using the localStorage API
		adminID: localStorage.getItem('adminID'),
		webToken: sessionStorage.webToken
	}
  const condition = "maturedSubsCust"
  fetchProfile(condition, dataTosend);


}
*/

function changeCardTitle(cardTitleElement, newTitle) {
  cardTitleElement.style.fontSize = '24px'
  cardTitleElement.innerText = newTitle;
}

// fetch customer details

async function fetchProfile(condition, dataTosend){
  

  try{
    const response = await fetch("../php/viewProfile.php",{
      method: "POST",
      body: JSON.stringify({condition: condition, dataSent: dataTosend})

      
    })
  
    const tableBody = document.querySelector("#profilelist tbody");
    tableBody.innerHTML = "";

    const profiledetails = await response.json();


    if (profiledetails.code  == 0){
      console.log("No profile found");
    }
    else if (profiledetails.code == 1){
      console.log("profiledetails.data",profiledetails.data);

      displayProfileList(profiledetails,tableBody);
    
    }
  } catch (error){
    console.log('Error:',error);
  }
 
};


function displayProfileList(profiledetails,tableBody){
  
  // create table heading
  const row = tableBody.insertRow();
  const useremailCell = row.insertCell();
  const userpasswordCell = row.insertCell();
 /* const emailCell = row.insertCell();
  const startdateCell = row.insertCell();
  const enddateCell = row.insertCell();*/
 
  row.style.fontWeight = 'bold';
  useremailCell.textContent = 'User Email';
  userpasswordCell.textContent = 'Password';
 /*emailCell.textContent = 'Email';
  startdateCell.textContent = 'Start Date';
  enddateCell.textContent = 'End Date';*/

  // Loop through the JSON data

  profiledetails.data.forEach(function(profiledetail) {
  const row = tableBody.insertRow();
  const useremailCell = row.insertCell();
  const userpasswordCell = row.insertCell();
  /*const emailCell = row.insertCell();
  const startdateCell = row.insertCell();
  const enddateCell = row.insertCell();*/


  useremailCell.textContent = profiledetail.userEmail;
  userpasswordCell.textContent = profiledetail.userPassword;
  /*surnameCell.textContent = customerdetail.surname;
  emailCell.textContent = customerdetail.email;
  startdateCell.textContent = customerdetail.startdate;
  enddateCell.textContent = customerdetail.enddate;*/
 
 });

}





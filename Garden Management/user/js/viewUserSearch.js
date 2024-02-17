
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
    
  const condition = "allPlants"
  fetchPlants(condition, dataTosend);
    
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

async function fetchPlants(condition, dataTosend){
  

  try{
    const response = await fetch("../php/viewUserSearch.php",{
      method: "POST",
      body: JSON.stringify({condition: condition, dataSent: dataTosend})

      
    })
  
    const tableBody = document.querySelector("#plantlist tbody");
    tableBody.innerHTML = "";

    const plantdetails = await response.json();


    if (plantdetails.code  == 0){
      console.log("No plant found");
    }
    else if (plantdetails.code == 1){
      console.log("plantdetails.data",plantdetails.data);

      displayPlantList(plantdetails,tableBody);
    
    }
  } catch (error){
    console.log('Error:',error);
  }
 
};


function displayPlantList(plantdetails,tableBody){
  
  // create table heading
  const row = tableBody.insertRow();
  const plantnameCell = row.insertCell();
  const botanicalnameCell = row.insertCell();
  const descriptionCell = row.insertCell();
  const categorynameCell = row.insertCell();
 
  row.style.fontWeight = 'bold';
  plantnameCell.textContent = 'Common Name';
  botanicalnameCell.textContent = 'Botanical Name';
  descriptionCell.textContent = 'Description';
  categorynameCell.textContent = 'Category';

  // Loop through the JSON data

  plantdetails.data.forEach(function(plantdetail) {
  const row = tableBody.insertRow();
  const plantnameCell = row.insertCell();
  const botanicalnameCell = row.insertCell();
  const descriptionCell = row.insertCell();
  const categorynameCell = row.insertCell();


  plantnameCell.textContent = plantdetail.CommonName;
  botanicalnameCell.textContent = plantdetail.BotName;
  descriptionCell.textContent = plantdetail.PlantDescription;
  categorynameCell.textContent = plantdetail.catName;
 
 });

}





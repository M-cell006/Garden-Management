const plantdropdown = document.querySelector("#plantid");

document.addEventListener('DOMContentLoaded', function () {

    //gather the session data
    let dataTosend = {
      userID: localStorage.getItem('userID'),
      webToken: sessionStorage.webToken
    }
    
    if (dataTosend.webToken === undefined) {
  
      // webToken is undefined, so user not logged in
     
      alert("You need to log in!");
      window.location.assign("../pages/login.html");
  
    } else {
      // get the data from the relevant table in the database
      fetchAllPlants(dataTosend);
    }
  
}
)


// fetch all plants from database

async function fetchAllPlants(dataTosend){
  try{
    const response = await fetch("../php/getPlants.php",{
      method: "POST",
      body: JSON.stringify(dataTosend)
      
    })  

    const plantdetails = await response.json();
    if (plantdetails.code  == 0){
      console.log("No records found");
    }
    else if (plantdetails.code == 1){
      console.log(plantdetails.data);

      plantdropdown.innerHTML = "";

      displayPlants(plantdetails,plantdropdown );
        
    } 
  } catch (error){
      console.log(error);
  }
 
};

function displayPlants(plantdetails,plantdropdown ){

  // add first option to level drop down
  let firstOption = new Option("Select a plant", -1);
  plantdropdown.appendChild(firstOption);

  // Loop through the JSON data and add each level as an option to leveldropdown 

  for (let i = 0; i < plantdetails.data.length; i++) {
    const option = document.createElement("option");
    option.value = plantdetails.data[i].PlantID;
    option.text = plantdetails.data[i].CommonName;
    plantdropdown.appendChild(option);
  }
}





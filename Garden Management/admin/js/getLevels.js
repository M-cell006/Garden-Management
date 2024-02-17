
const leveldropdown = document.querySelector("#levelnameid");

document.addEventListener('DOMContentLoaded', function () {

    //gather the session data
    let dataTosend = {
      adminID: localStorage.getItem('adminID'),
      webToken: sessionStorage.webToken
    }
    
    if (dataTosend.webToken === undefined) {
  
      // webToken is undefined, so user not logged in
     
      alert("You need to log in!");
      window.location.assign("../pages/login.html");
  
    } else {
      // get the data from the relevant table in the database
      fetchAllLevels(dataTosend);
    }
  
}
)


// fetch all subjects from database

async function fetchAllLevels(dataTosend){
  try{
    const response = await fetch("../php/getLevels.php",{
      method: "POST",
      body: JSON.stringify(dataTosend)
      
    })  

    const leveldetails = await response.json();
    if (leveldetails.code  == 0){
      console.log("No records found");
    }
    else if (leveldetails.code == 1){
      console.log(leveldetails.data);

      leveldropdown.innerHTML = "";

      displayLevels(leveldetails,leveldropdown );
        
    } 
  } catch (error){
      console.log(error);
  }
 
};

function displayLevels(leveldetails,leveldropdown ){

  // add first option to level drop down
  let firstOption = new Option("Select a level", -1);
  leveldropdown.appendChild(firstOption);

  // Loop through the JSON data and add each level as an option to leveldropdown 

  for (let i = 0; i < leveldetails.data.length; i++) {
    const option = document.createElement("option");
    option.value = leveldetails.data[i].levelID;
    option.text = leveldetails.data[i].levelname;
    leveldropdown.appendChild(option);
  }


  /*leveldetails.data.forEach(function(level) {
    let option = document.createElement("option");
    option.value = level.levelID;
    option.text = level.levelname;
    console.log(option.value, option.text);
   
    leveldropdown.appendChild(option);
 });*/

}





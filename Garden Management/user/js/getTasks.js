const taskdropdown = document.querySelector("#tasknameid");

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
      fetchAllTasks(dataTosend);
    }
  
}
)


// fetch all subjects from database

async function fetchAllTasks(dataTosend){
  try{
    const response = await fetch("../php/getTasks.php",{
      method: "POST",
      body: JSON.stringify(dataTosend)
      
    })  

    const taskdetails = await response.json();
    if (taskdetails.code  == 0){
      console.log("No records found");
    }
    else if (taskdetails.code == 1){
      console.log(taskdetails.data);

      taskdropdown.innerHTML = "";

      displayTasks(taskdetails,taskdropdown);
        
    } 
  } catch (error){
      console.log(error);
  }
 
};

function displayTasks(taskdetails,taskdropdown ){

  // add first option to level drop down
  let firstOption = new Option("Select a task", -1);
  taskdropdown.appendChild(firstOption);

  // Loop through the JSON data and add each level as an option to leveldropdown 

  for (let i = 0; i < taskdetails.data.length; i++) {
    const option = document.createElement("option");
    option.value = taskdetails.data[i].TaskID;
    option.text = taskdetails.data[i].taskName;
    taskdropdown.appendChild(option);
  }


 

}





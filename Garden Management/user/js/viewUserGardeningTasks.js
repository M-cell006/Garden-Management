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
      
    const condition = "allTasks"
    fetchTasks(condition, dataTosend);
      
    }
  }
  )
  
  function changeCardTitle(cardTitleElement, newTitle) {
    cardTitleElement.style.fontSize = '24px'
    cardTitleElement.innerText = newTitle;
  }
  
  // fetch task details
  
  async function fetchTasks(condition, dataTosend){
    
  
    try{
      const response = await fetch("../php/viewUserGardeningTasks.php",{
        method: "POST",
        body: JSON.stringify({condition: condition, dataSent: dataTosend})
  
        
      })
    
      const tableBody = document.querySelector("#tasklist tbody");
      tableBody.innerHTML = "";
  
      const taskdetails = await response.json();
  
  
      if (taskdetails.code  == 0){
        console.log("No tasks found");
      }
      else if (taskdetails.code == 1){
        console.log("taskdetails.data",taskdetails.data);
  
        displayTaskList(taskdetails,tableBody);
      
      }
    } catch (error){
      console.log('Error:',error);
    }
   
  };
  
  
  function displayPlantList(taskdetails,tableBody){
    
    // create table heading
    const row = tableBody.insertRow();
    const tasknameCell = row.insertCell();
    const plantnameCell = row.insertCell();
    const taskdescriptionCell = row.insertCell();
    const setdateCell = row.insertCell();
    const duedateCell = row.insertCell();
    const statusCell = row.insertCell();
   
    row.style.fontWeight = 'bold';
    plantnameCell.textContent = 'Plant Name';
    tasknameCell.textContent = 'Task Name';
    taskdescriptionCell.textContent = 'Task Description';
    setdateCell.textContent = 'Date Set';
    duedateCell.textContent = 'Date Due';
    statusCell.textContent = 'Status';
  
    // Loop through the JSON data
  
    taskdetails.data.forEach(function(taskdetail) {
    const row = tableBody.insertRow();
    const plantnameCell = row.insertCell();
    const tasknameCell = row.insertCell();
    const taskdescriptionCell = row.insertCell();
    const setdateCell = row.insertCell();
    const duedateCell = row.insertCell();
    const statusCell = row.insertCell();
  
  
  
    plantnameCell.textContent = taskdetail.CommonName;
    tasknameCell.textContent = taskdetail.taskName;
    taskdescriptionCell.textContent = taskdetail.PlantDescription;
    setdateCell.textContent = taskdetail.setDate;
    duedateCell.textContent = taskdetail.dueDate;
    statusCell.textContent = taskdetail.status;
   
   });
  
  }

// DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed

document.addEventListener('DOMContentLoaded', function () {

   //gather the session data
	let dataTosend = {
		// retrieve the CustID from local storage using the localStorage API
		adminID: localStorage.getItem('adminID'),
		webToken: sessionStorage.webToken
	}
	console.log(dataTosend);
	  
	if (dataTosend.webToken === undefined) {
	
		// webToken is undefined, so user not logged in
	   
		alert("You need to log in!");
		window.location.assign("../pages/login.html");
	
	} else {
    // get the data from the relevant table in the database
    fetchAllSubjects(dataTosend);
  }
  
});

// Add event listener to the custom elements
const subjectdropdown = document.querySelector("#subjectnameid")

// fetch all products from database

async function fetchAllSubjects(dataTosend){
  try{
    const response = await fetch("../php/getSubjects.php",{
      method: "POST",
      body: JSON.stringify(dataTosend)
      
      
    })

   
    const subjectdetails = await response.json();
    if (subjectdetails.code  == 0){
      console.log("No records found");
    }
    else if (subjectdetails.code == 1){
      console.log(subjectdetails.data);

      subjectdropdown.innerHTML = "";

      displaySubject(subjectdetails, subjectdropdown);
    
    }
     
  } catch (error){
      console.log(error);
  }
 
};

function displaySubject(subjectdetails, subjectdropdown){

   // add first option to subject drop down

   let firstOption = new Option("Select a subject", -1);
   subjectdropdown.appendChild(firstOption);


   // Loop through the JSON data and add each subject as an option to subjectdropdown 

   for (let i = 0; i < subjectdetails.data.length; i++) {
    const option = document.createElement("option");
    option.value = subjectdetails.data[i].subjectID;
    option.text = subjectdetails.data[i].subjectname;
    subjectdropdown.appendChild(option);
  }
  let lastOption = new Option("Add a new subject", 999);
   subjectdropdown.appendChild(lastOption);

   /*subjectdetails.data.forEach(function(subject) {
    let option = document.createElement("option");
    option.value = subject.subjectID;
    option.text = subject.subjectname;
    console.log(option.value, option.text);
   
    subjectdropdown.appendChild(option);
 });*/



}



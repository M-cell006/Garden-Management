
const level = document.getElementById("levelnameid");
const invalidFeedbackElement = document.getElementById('invalidFeedback');


// Add event listeners to when a level is changed
level.addEventListener('change', handleChangeLevel);

  
  // check if a valid level has been selected
  function handleChangeLevel() {
  
    if (level.selectedIndex == 0) {
      console.log("No level option selected");
      alert("Please select a level");

      // Set the invalid status
      level.classList.add('is-invalid');
      // Show the error message
      invalidFeedbackElement.style.display = 'block';

    } else {

      console.log("Option selected: " + level.value);

      // Clear the invalid status
      level.classList.remove('is-invalid');

      // Hide the error message
      invalidFeedbackElement.style.display = 'none';
    
    }
    
  };


  // Add a submit event listener to the form
const form = document.getElementById('selectLevelForm');
form.addEventListener('submit', handleFormSubmit);
  

function handleFormSubmit(event) {
	event.preventDefault();

  if (validCondition()){
 
      let dataTosend = gatherData();
      console.log(dataTosend);

      //insertDetails(dataTosend);

      // Reset the form
      form.reset();
  
      // Add is-invalid back to form elements
      addValidityConstraints();
      
 
  }
  else{
    alert("Form incomplete!");
  }

} 

function addValidityConstraints(){
 
  level.classList.add("is-invalid");

}

function validCondition(){

  if (level.value == -1) {
    return false;
  }
  else {
    return true
  }
 
}


function getuserLevel(level){
  const selectedOption = level.options[level.selectedIndex];
  const levelID = selectedOption.value;
  const levelName = selectedOption.text;

  let userLevel = [];

  userLevel = [levelID,levelName];
  
  return userLevel;
}


function gatherData(){


  const levelData = getuserLevel(level);
  console.log ("gatherData level: ", levelData[0], levelData[1]);

  let dataTosend = {
  
    levelid: levelData[0],
    levelname: levelData[1],

  } 
  return dataTosend;
}
const plantchosen = document.getElementById("plantid");
const taskchosen = document.getElementById("tasknameid");
const pldescription = document.getElementById("descriptionid");
const frequency = document.getElementById("frequencyid")
const confirmaction = document.getElementById("confirmid");
const invalidFeedbackElement = document.getElementById('invalidFeedback');

plantchosen.addEventListener('change', handleChangePlant);
taskchosen.addEventListener('change', handleChangeTask);
frequency.addEventListener('input', checkFrequencyEmpty);
pldescription.addEventListener('input', checkDescriptionEmpty);
// Add a change event listener to confirmaction
confirmaction.addEventListener("change", handleConfirm);

// check if a valid plant has been selected

function handleChangePlant() {

  if (plantchosen.selectedIndex == 0) {
    console.log("No plant selected");
    alert("Please select a plant");

    // Set the invalid status
    plantchosen.classList.add('is-invalid');
    // Show the error message
    invalidFeedbackElement.style.display = 'block';

  } else {
    console.log("Plant selected: " + plantchosen.value);

    // Clear the invalid status
    plantchosen.classList.remove('is-invalid');

    // Hide the error message
    invalidFeedbackElement.style.display = 'none';
  }
}
function handleChangeTask() {
  if (taskchosen.selectedIndex == 0) {
    console.log("No task selected");
    alert("Please select a task");

    // Set the invalid status
    taskchosen.classList.add('is-invalid');
    // Show the error message
    invalidFeedbackElement.style.display = 'block';

  } else {
    console.log("Task selected: " + taskchosen.value);

    // Clear the invalid status
    taskchosen.classList.remove('is-invalid');

    // Hide the error message
    invalidFeedbackElement.style.display = 'none';
  }
}

function checkFrequencyEmpty() {
  // Get the value of the input field
  var freqValue = frequency.value;
  console.log(freqValue)
  // Check if the input value is empty
  if (freqValue.trim() === '') {
      alert('Frequency field is empty!');
      console.log('Frequency field is not completed.');
      // Set the invalid status
      frequency.classList.add('is-invalid');
      // Show the error message
      invalidFeedbackElement.style.display = 'block';

  } else {
      console.log('Frequency field is completed.');
       // Clear the invalid status
      frequency.classList.remove('is-invalid');

      // Hide the error message
      invalidFeedbackElement.style.display = 'none';
  }
}
function checkDescriptionEmpty() {
  // Get the value of the input field
  var descValue = pldescription.value;
  console.log(descValue)
  // Check if the input value is empty
  if (descValue.trim() === '') {
      alert('Description field is empty!');
      console.log('Description field is not completed.');
      // Set the invalid status
      pldescription.classList.add('is-invalid');
      // Show the error message
      invalidFeedbackElement.style.display = 'block';

  } else {
      console.log('Description field is completed.');
       // Clear the invalid status
       pldescription.classList.remove('is-invalid');

      // Hide the error message
      invalidFeedbackElement.style.display = 'none';
  }
}
function handleConfirm(){

  check = false;
  if (confirmaction.checked) {
    console.log("Checkbox has been checked.");
    // Clear the invalid status
    confirmaction.classList.remove('is-invalid');

    // Hide the error message
    invalidFeedbackElement.style.display = 'none';
    check = true;

  } else {
    console.log("Checkbox has been unchecked.");
    alert("Please confirm.")
     // Set the invalid status
     confirmaction.classList.add('is-invalid');
     // Show the error message
     invalidFeedbackElement.style.display = 'block';
  }
  return check;
   
}


function getuserPlant(plantchosen){
  const selectedOption = plantchosen.options[plantchosen.selectedIndex];
  const plantid = selectedOption.value;
  const commonName = selectedOption.text;

  let userPlant = [];

  userPlant = [plantid,commonName];
  
  return userPlant;
}

function getuserTask(taskchosen){
  const selectedOption = taskchosen.options[taskchosen.selectedIndex];
  const taskid = selectedOption.value;
  const taskName = selectedOption.text;

  let userTask = [];

  userTask = [taskid,taskName];
  
  return userTask;
}

function getuserFrequency(frequency){

  let userFrequency;
  const days = frequency.value;

  if (days != ""){
    console.log("Frequency is valid:", days);
    userFrequency = days;
  }

  return userFrequency;
}

function getuserDescription(pldescription){

  let userDescription;
  const text = pldescription.value;

  if (text != ""){
    userDescription = text;
  }

  return userDescription;
}



// Add a submit event listener to the form
const form = document.getElementById('insertForm');
form.addEventListener('submit', handleFormSubmit);


function handleFormSubmit(event) {
	event.preventDefault();

    correct = handleConfirm();
    console.log (correct);
    if (correct){
      let dataTosend = gatherData();
      console.log(dataTosend);
      //insertDetails(dataTosend);

      // Reset the form
      form.reset();
    }
    else{
      alert("Form incomplete!");
 
    }
  
}

function gatherData(){

  
  const plantData = getuserPlant(plantchosen);
  console.log ("gatherData plant: ", plantData[0], plantData[1]);

  const taskData = getuserTask(taskchosen);
  console.log ("gatherData task: ", taskData[0], taskData[1]);

  const descriptionData = getuserDescription(pldescription) ;
  console.log ("gatherData description: ", descriptionData);

  const frequencyData = getuserFrequency(frequency);
  console.log ("gatherData frequency: ", frequencyData);
 
  let dataTosend = {
    plantid: plantData[0],
    plantname: plantData[1],
    taskid: taskData[0],
    taskname: taskData[1],
    pldescription:descriptionData,
    frequency:frequencyData

  } 
  return dataTosend;
}
   
async function insertDetails(dataTosend){
  //console.log(dataTosend);

  const serverfilename = "../php/insertTask.php"
	try{
    const response = await fetch(serverfilename,{
      method: "POST",
      body: JSON.stringify(dataTosend)
     
    })

    const responses = await response.json();

    //console.log(responses);
		
		handleResponseCode(responses);
 
  }catch (error){
    console.log('Error:',error);
  }

}

// handle response from server 
function handleResponseCode(responses){

  let combinedMessage = "";
  responses.forEach(response => {
    const code = response.code;
    const message = response.message;
    console.log(`Code: ${code}, Message: ${message}`);
    if (code == 1){
      combinedMessage = combinedMessage + message + "\n ";
    }
   
  });

  alert(combinedMessage);
}
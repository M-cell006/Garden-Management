const subjectchosen = document.getElementById("subjectnameid");
const levelchosen = document.getElementById("levelnameid");
const newsubjectrequest = document.getElementById("newsubjectnameid");
const newtopicrequest = document.getElementById("newtopicnameid");
const pricerequest = document.getElementById("priceid");
const confirmaction = document.getElementById("confirmid");


// Add a submit event listener to the form
const form = document.getElementById('insertForm');
form.addEventListener('submit', handleFormSubmit);

// Add a change event listener to confirmaction
confirmaction.addEventListener("change", handleConfirm);

function handleFormSubmit(event) {
	event.preventDefault();

  if (validCondition()){
 
    correct = handleConfirm();
    console.log (correct);
    if (correct){
      let dataTosend = gatherData();
      console.log(dataTosend);
      insertDetails(dataTosend);

      // Reset the form
      form.reset();
  
      // Add is-invalid back to form elements
      addValidityConstraints();
      
    }
 
  }
  else{
    alert("Form incomplete!");
  }

}


function addValidityConstraints(){
  subjectchosen.classList.add("is-invalid");
  levelchosen.classList.add("is-invalid");
  pricerequest.classList.add("is-invalid");
  newsubjectrequest.classList.add("is-invalid");
  newtopicrequest.classList.add("is-invalid");
  confirmaction.classList.add("is-invalid")
}

function validCondition(){

  let state;

  if ( (level.value == -1) || (subject.value == -1) || ((subject.value == 999) && (newsubjectname.value == "")) || (newtopicname.value == "" ) || (price.value == "") ){
    state = false;
  }
  else {
    state = true;
  }

  return state;
 
}
 

function getuserSubject(subjectchosen,newsubjectrequest){

  const selectedOption= subjectchosen.options[subjectchosen.selectedIndex];
  let subjectID = selectedOption.value;
  let subjectName = selectedOption.text;
  let usersubject = [];
  
  
  if (subjectID == 999 ){
    newSubjectField = newsubjectrequest.value
    if (newSubjectField != ""){
      console.log("New subject:", newSubjectField);
      usersubject = [-1, newSubjectField];
    }
  }
  else{
    usersubject = [subjectID, subjectName];
    
  }
  
  return usersubject;
  
}


function getuserLevel(levelchosen){
  const selectedOption = levelchosen.options[levelchosen.selectedIndex];
  const levelID = selectedOption.value;
  const levelName = selectedOption.text;

  let userLevel = [];

  userLevel = [levelID,levelName];
  
  return userLevel;
}
  
function getuserTopic(newtopicrequest){

  let userTopic = [];

  const newTopicField = newtopicrequest.value
  
  if (newTopicField != ""){
    console.log("New topic:", newTopicField);
    userTopic = [-1, newTopicField];

  }
  return userTopic;
}


function getuserPrice(pricerequest){

  let userPrice;
  const amount = pricerequest.value

  if (amount != ""){
    console.log("Amount is valid:", amount);
    userPrice = amount;
  }

  return userPrice;
}

function handleConfirm(){

  let check = false;

  if (confirmaction.checked) {
    console.log("Checkbox has been checked.");
    check = true
  } else {
    console.log("Checkbox has been unchecked.");
  }

  return check;
   
}


function getTodayDate(){

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  console.log(formattedDate);

  return formattedDate;
}
  
function gatherData(){

  
  const subjectData = getuserSubject(subjectchosen,newsubjectrequest);
  console.log ("gatherData subject: ", subjectData[0],subjectData[1]);

  const levelData = getuserLevel(levelchosen);
  console.log ("gatherData level: ", levelData[0], levelData[1]);

  const topicData = getuserTopic(newtopicrequest);
  console.log ("gatherData topic: ", topicData[0],topicData[1]);

  const priceData = getuserPrice(pricerequest) ;
  console.log ("gatherData price: ", priceData);

  const dateData = getTodayDate();
  console.log ("gatherData date: ", dateData);
 
  let dataTosend = {
    subjectid: subjectData[0],
    subjectname: subjectData[1],
    levelid: levelData[0],
    levelname: levelData[1],
    topicid: topicData[0],
    topicname: topicData[1],
    price:priceData,
    datefrom:dateData

  } 
  return dataTosend;
}
   


async function insertDetails(dataTosend){
  //console.log(dataTosend);

  const serverfilename = "../php/insertProduct.php"
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

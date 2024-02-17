
const subjectoption = document.getElementById("subjectnameid");
const leveloption = document.getElementById("levelnameid");


// Add event listeners to the custom elements
subjectoption.addEventListener('change', handleChangeSubject);
leveloption.addEventListener('change', handleChangeLevel);


// getting topics related to subject if suitable option chosen
function handleChangeSubject() {

  if (subjectoption.value == -1) {
    console.log ("No subject selected")
    topiclist.innerHTML = "";
  }
  else if (subjectoption.value == 999){
    subjectoption.disabled = true;
    console.log ("New Subject Selected")
    // Set the selectedIndex for level drop down to the first item)
    leveloption.selectedIndex = 0; 
  }
  else {
    console.log("valid subject option selected");

    let dataTosend = {
      subjectid: document.getElementById("subjectnameid").value
    } 
    console.log(dataTosend);
    
    // Set the selectedIndex for level drop down to the first item)
    leveloption.selectedIndex = 0; 
    const condition = "subject"
    
    getTopicsData(condition, dataTosend);
  }

};


// getting topics related to subject and level if suitable option chosen
function handleChangeLevel() {

  if (subjectoption.value == -1 || subjectoption.value == 999) {
    console.log("no existing subject selected");
  }
  else if ((leveloption.selectedIndex == 0)){
    console.log("no valid level selected");
    topiclist.innerHTML = "";
  }
  else{
    let dataTosend = {
      subjectid: document.getElementById("subjectnameid").value,
      levelid: document.getElementById("levelnameid").value
    }
    console.log(dataTosend);
    
    const condition = "subjectlevel"
    getTopicsData(condition, dataTosend);
  }  

};


async function getTopicsData(condition, dataTosend){
  //console.log(dataTosend);
 
  const serverfilename = "../php/getTopics.php";
	try{
    const response = await fetch(serverfilename,{
      method: "POST",
      body: JSON.stringify({condition: condition, dataSent: dataTosend})
     
    })

    const topicdetails = await response.json();

    const topiclist= document.getElementById("topiclistid");
    topiclist.innerHTML = "";
      
    if (topicdetails.code  == 0){
  
      alert("No topics found");
    }
    else if (topicdetails.code == 1){

      console.log(topicdetails.data);

      displayList(topicdetails,topiclist ) 

    }
  } catch (error){
    console.log('Error:',error);
  } 
}


function displayList(topicdetails,topiclist){

  console.log(topicdetails.data);
 
  // Loop through the JSON data and add each topic in the topic list

    topicdetails.data.forEach(function(topic) {
    let listItem = document.createElement("li");
    listItem.textContent = topic.topicName;
    
    topiclist.appendChild(listItem);
 });

}










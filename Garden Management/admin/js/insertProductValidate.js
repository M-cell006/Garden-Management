
const newsubjectname = document.getElementById("newsubjectnameid");
const newtopicname = document.getElementById("newtopicnameid");
const price = document.getElementById("priceid");
const subject = document.getElementById("subjectnameid");
const level = document.getElementById("levelnameid");
const topic = document.getElementById("topiclistid");


// Add event listeners to the custom elements
subject.addEventListener('change', handleChangeSubject);
level.addEventListener('change', handleChangeLevel);
price.addEventListener('change', handleChangePrice);
newsubjectname.addEventListener('input', handleNewSubjectName);
newtopicname.addEventListener('input', handleNewTopicName);

// check if new subject has to be added and handle its appearance and input
function handleChangeSubject() {
    
    if (subject.value == 999){
  
      const newsubjectheader = document.getElementById("newsubjectlabel")
      // reveal label for new subject
      newsubjectheader.style.display = "block";
      newsubjectname.disabled = false;
      // reveal text box for new subject
      newsubjectname.style.display = "block"; 
      
    }
    else{
      console.log("subject option changed");
      newsubjectname.disabled = true; 
      price.value = "";   
    }  
    
  };
  
  
  // check if a valid level has been selected
  function handleChangeLevel() {
  
    if (level.selectedIndex == 0) {
      console.log("No level option selected");
      alert("Please select a level");
    } else {
      console.log("Option selected: " + level.value);
    }
    
  };
  
  
  function validatePrice(amount) {
    // Regular expression to match a valid price format (e.g., 10.99, 100, 1000.50)
    const priceRegex = /^\d+(\.\d{1,2})?$/;
  
    return priceRegex.test(amount);
  };
  
  //check if price entered is vali adn within range
  
  function handleChangePrice() {
  
  
    if (validatePrice(price.value)){
  
      //Parse the input value to a floating-point number
      let amountinFloat = parseFloat(price.value); 
      console.log("amountinFloat", amountinFloat);
      let minPrice = parseFloat(price.getAttribute("min"));
      let maxPrice = parseFloat(price.getAttribute("max"));
     
  
      if (!isNaN(amountinFloat) && amountinFloat >= minPrice && amountinFloat <= maxPrice) {
        console.log("Price is within the range.");
        
  
      } else {
      console.log("Price not within the correct range.");
      alert("Price is not within the correct range.");
      price.value = ""
      }
  
    } else {
      console.log("Price not valid");
      price.value = ""
    }
    
  };
  

// Converts input to lower case and remove space using a regular expression and 
// compare with existing dropdown options

function validateUserSubject(newsubjectname, subject) {

    const inputText = newsubjectname.value;
  
    // The regular expression /\s/ is used to match a whitespace character. 
    // The replace() method is used with the regex to match all whitespace characters in the input text
    // The second argument of replace() is an empty string "", which effectively removes the matched spaces
    // the text is then converted to lower case
  
    let trimmedTextLowerCase = inputText.replace(/\s/g, "").toLowerCase();
    console.log (trimmedTextLowerCase);
  
    let options = subject.options;
  
    for (let i = 0; i < options.length; i++) {
      let trimmedOptionTextLowerCase = options[i].text.replace(/\s/g, "").toLowerCase()
      console.log(trimmedOptionTextLowerCase);
      if (trimmedOptionTextLowerCase === trimmedTextLowerCase) {
        console.log("Input already exists in the dropdown");
        newsubjectname.value = "";
        subject.disabled = false;
  
        return;
      }
      else{
        subject.disabled = true;    
      }
    }
    if (newsubjectname.value == ""){
      subject.disabled = false;  
    }
    console.log("Input does not exist in the dropdown");
    console.log ("input:", inputText);  
    
  }
  
  
  function handleNewSubjectName(){
    validateUserSubject(newsubjectname, subject);
   
  };
  
  
  function validateUserTopic(newtopicname, topic) {
  
    let inputText = newtopicname.value;
  
  
    let listItems = topic.getElementsByTagName("li");
  
    for (let i = 0; i < listItems.length; i++) {
      console.log (listItems[i].textContent)  
    }
  
    // The regular expression /\s/ is used to match a whitespace character. 
    // The replace() method is used with the regex to match all whitespace characters in the input text
    // The second argument of replace() is an empty string "", which effectively removes the matched spaces
    // the text is then converted to lower case
  
    let trimmedTextLowerCase = inputText.replace(/\s/g, "").toLowerCase();
    console.log (trimmedTextLowerCase);
  
  
    // lopp through list items and compare
    for (let i = 0; i < listItems.length; i++) {
      let trimmedOptionTextLowerCase = listItems[i].textContent.replace(/\s/g, "").toLowerCase()
      console.log(trimmedOptionTextLowerCase);
      if (trimmedOptionTextLowerCase === trimmedTextLowerCase) {
        console.log("Input already exists in the list");
        newtopicname.value = "";
        return;
      }
    }
   
    console.log("Input does not exist in the list");
    console.log ("input:", inputText);  
    
    
  }
  
function handleNewTopicName(){
    validateUserTopic(newtopicname, topic);
   
  };
  
  
  
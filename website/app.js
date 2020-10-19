/* Global Variables */
const baseUrl = `http://api.openweathermap.org/data/2.5/weather?zip=`;
const apiKey = '&appid=932c995e7a84e179178cca3fc9b238e5';
const celsius = '&units=metric';
//Select html elements to use later
const zipCodeInput = document.querySelector('#zip');
const feelingInput = document.querySelector('#feelings');
const generateButton = document.querySelector('#generate');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();
//function to do when 'Generate' button is clicked
generateButton.addEventListener('click', performAction);
function performAction(e){
   const zipCode = zipCodeInput.value;
   const feelings = feelingInput.value;
   console.log(feelings);
   if(zipCode == ''){
     e.preventDefault();
     alert('Please enter your zip code in order to get current temprature');
   }else{
     getFromAPI(baseUrl, zipCode, apiKey, celsius)
     .then((data)=>{
       console.log(data.main);
       postData('/api/', {main: data.main, date: newDate, feelings: feelings});
     })
     .then(()=>{updateUI()
     })
   }
}
//Get the current weather from openweathermap.org
const getFromAPI = async (baseUrl, zipCode, appId, celsius)=>{
  const response = await fetch (baseUrl+ zipCode+ appId+ celsius);
  try{
    const data = response.json();
    console.log(data);
    return data;
  }catch(error){
    console.log('error', error);
  }
}
//Post data to the server
const postData = async (url = '', data = {})=>{
  const response = await fetch(url, {
    method: 'POST',
    credintials: 'same-origin',
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(data),
  });
  try{
    const newData = await response.json();
    console.log(newData);
    return newData;
  }catch(error){
    console.log('error', error);
  }
}
//Get the data from server and update UI
const updateUI = async() => {
  const request = await fetch('/api/');
  try{
    const allData = await request.json();
    document.getElementById('temp').innerHTML = `Temp: ${allData.temp}  ْC `;
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    if(allData.content == '')
      document.getElementById('content').innerHTML = 'Content: ❎ User doesn\'t enter his feelings.' ;
    else
      document.getElementById('content').innerHTML = `Content: ${allData.content}`;
    }catch(error){
    console.log('error', error);
  }
}

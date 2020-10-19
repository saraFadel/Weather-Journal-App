// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app =  express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, listening);
function listening(){
  console.log(`Server is running on localhost:${3000}`);
}
//GET Route
app.get('/api/', getRoute);
function getRoute(request, response){
  response.send(projectData);
  console.log(projectData);
}

//POST Route
app.post('/api/', postRoute);
function postRoute(request, response){
  //console.log(request.body);
  projectData ={
    temp: request.body.main.temp,
    date: request.body.date,
    content: request.body.feelings
  }
  response.send(projectData);
  console.log(projectData);
}

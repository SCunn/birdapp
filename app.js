
// creating a variable named express and storing the return value of require function
// require is a nodejs function, in this case it is called with parameter called "express" which loads express module
var express = require("express"); // call the express module which is default provded by Node
// Executing the function stored in express variable
// And storing the result into app variable 
var app = express(); // now we need to declare our app which is the envoked express application

// Set the template engine
app.set('view engine', 'ejs'); //Tells the app that all pages will be rendered in the jade syntax unless otherwise stated


app.use(express.static("views"));// allows access to views folder
app.use(express.static("style")); // Allows access to the styles folder
app.use(express.static("images")); // Allows access to the image folder

// body parser to get information
var fs = require('fs');
var bodyParser = require("body-parser"); // call body parser module and make use of it
app.use(bodyParser.urlencoded({extended:true}));



var users = require("./model/users.json"); // allow the app to access the users.json

// set up middleware function invoking the request and response function
app.get('/', function(req, res) {
res.render("index"); // renders the index page in the web browser
console.log("Home Page Loaded"); // used to output activity in the console
});


// gets the user's page
app.get('/userpage', function(req,res){
   res.render("userpage",{users}); // get the User page when somebody visits the /userpage url
   console.log("Here's the User page, I can view the User's here!");
});
// gets the add user page
app.get('/adduser', function(req,res){
   res.render("adduser");
   console.log("I found the add user page");
});

// post request to send JSON data to server

app.post("/adduser", function(req,res){
   
   // Search for the largest ID in the users.json file
   
   function getBigId(contacts, id){ //function getBigId with parameters contactss and id
      var bIg;
      
      for(var i = 0; i < contacts.length; i++){ // loops through the users in the JSON file as long as there are contacts 
         if(!bIg || parseInt(users[i][id]) > parseInt(bIg[id])); 
         bIg = contacts[i];
      }
      return bIg;
   }
   
   
   // create a new id for the next JSON item
   bigUid = getBigId(users, "id"); // calls the getBigId function from above and passes in parameters 
   
   var add_Id = bigUid.id + 1; // add an id number + 1 larger than the previous id number
   
   // display result in the console
   console.log("The New ID is" + add_Id);
   
   // this section accesses what the user types in the form and passes the infromation
   //to the JSON file as new data
   
   var user_New = { 
      
      id: add_Id, 
      name: req.body.name, 
      Comment: req.body.Comment, 
      email: req.body.email 

   }
   
   fs.readFile('./model/users.json', 'utf8',  function readfileCallback(err){
        
        if(err) {
            throw(err)
            
        } else {
            
            users.push(user_New); // add the new data to the JSON file
            json = JSON.stringify(users, null, 4); // this line structures the JSON so it is easy on the eye
            fs.writeFile('./model/users.json',json, 'utf8');
            
        }
        
   });
     res.redirect('/userpage');   
});




// this code provides the server port for our application to run on
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
console.log("Yippee its running");
  
});

// app.js page.  This page was created by Shane Cunningham and is based on the app.js page created by Liam McCabe


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
app.use(express.static("audio")); // Allows access to the image folder

var mysql = require('mysql');


// body parser to get information
var fs = require('fs');
var bodyParser = require("body-parser"); // call body parser module and make use of it
app.use(bodyParser.urlencoded({extended:true}));

const fileUpload = require('express-fileupload');
app.use(fileUpload());


// ----------------SQL------------------------

const db = mysql.createConnection({
    host: 'den1.mysql6.gear.host',      // address where the database is hosted
    user: 'shanesdb',
    password: 'Ny8T9?L2Eu_p',
    database: 'SHANESDB'
 });
// Next we need to create a connection to the database

db.connect((err) =>{
     if(err){
        console.log("go back and check the connection details. Something is wrong.") // console.log is used instead of crashing the app
        // throw(err)
    } 
     else{
        
        console.log('database connected')
    }
    
    
})

// this route will create a database table

// app.get('/createtable',function(req,res){
//     // Create a table that will show Item Id, name, image, Audio and Facts
//     let sql = 'CREATE TABLE shanec (Id int NOT NULL AUTO_INCREMENT PRIMARY KEY, Name varchar(255), Image varchar(255), Audio varchar(255), Facts varchar(255))';
       
    //     let sql = 'CREATE TABLE activity (Id int NOT NULL AUTO_INCREMENT PRIMARY KEY, Bird varchar(255), Location varchar(255), Date varchar(255))';
       
//     let query = db.query(sql, (err,res) => {
        
//          if(err) throw err;
        
//          console.log(res);
        
//     });
    
//     res.send("You created your first DB Table")
    
//  })


// ==========This route will create a product ============================ 

// app.get('/insert',function(req,res){
//     // Insert Into table Item Id, name, image, Audio and Facts
//     let sql = 'INSERT INTO activity (Bird, Location, Date) VALUES("Common Buzzard", "Clonmel, Tipperary", "3:37 pm 09/08/2019")';
    
//     let sql = 'INSERT INTO shanec (Name, Image, Audio, Facts) VALUES("White Tailed Eagle", "white-tailed-eagle.jpg", "white-tailed-eagle.jpg", "Large Bird of prey")';
    
//     let query = db.query(sql, (err,res) => {
        
//          if(err) throw err;
        
//          console.log(res);
        
//     });
    
//     res.send("You created your Item");
    
//  });






//------------------------MYSQL Table activity (news) ----------------------------




//--------------Create get news -------------

app.get('/news', function(req, res) {
     
    let sql = 'SELECT * FROM activity';
    
    let query = db.query(sql, (err,result) => {
        
        if(err) throw err;
        
        console.log(result);
        
        res.render('news', {result});
        
    });
    
    //res.send("You created your first Product");
    
});




//-------------- Create Get addnews --------------

app.get('/addnews', function(req, res) {
   res.render('addnews'); 
});



//----------------- Create post addnews -----------------

app.post('/addnews', function(req, res) {
    
     // Insert into table that will show Item Id, Name, image, audio and Facts
    let sql = 'INSERT INTO activity (Bird, Location, Date) VALUES ("   '+req.body.bird+'   ", "'+req.body.local+'", "'+req.body.date+'") ';
    
    let query = db.query(sql, (err,res) => {
        
        if(err) throw err;
        
        console.log(res);
        
    });
    
    res.redirect('/news')
    //res.send("You created your first Item")
    
})


//----------------------- Create edit news Get request -----------------


// URL to get the edit news page 

app.get('/editnews/:id', function(req, res) {
    
     let sql = 'SELECT * FROM activity WHERE Id =  "'+req.params.id+'" ';
    
    let query = db.query(sql, (err,result) => {
        
        if(err) throw err;
        
        console.log(result);
        
        res.render('editnews', {result});
        
    });
    
    
    
    
});

// URL to edit news


app.post('/editnews/:id', function(req,res){
    // Create a table that will show product Id, name, price, image and sporting activity
    let sql = 'UPDATE activity SET Bird = "   '+req.body.bird+'   ",  Location = "'+req.body.local+'", Date = "'+req.body.date+'" WHERE Id =  "'+req.params.id+'" ';
    
    let query = db.query(sql, (err,res) => {
        
        if(err) throw err;
        
        console.log(res);
        
    });
    
    res.redirect('/news')
    //res.send("You created your first Product")
    
})


// URL TO delete news

app.get('/deletenews/:id', function(req,res){
    
        let sql = 'DELETE FROM activity WHERE Id =  "'+req.params.id+'" ';
    
    let query = db.query(sql, (err,result) => {
        
        if(err) throw err;
        
        console.log(result);
        
       
        
    });
    
    res.redirect('/news')
    
    
});









//------------------------MYSQL Table shanec (items) ----------------------------





//------------------------ Url to get the items ----------------------------

app.get('/items', function(req,res){
    
    let sql = 'SELECT * FROM shanec';
    
    let query = db.query(sql, (err,result) => {
        
        if(err) throw err;
        
        console.log(result);
        
        res.render('items', {result});
        
    });
    
    //res.send("You created your first Product");
    
});

// URL to get the add item page

app.get('/additem', function(req, res) {
   
   res.render('additem'); 
});



// post request to write info to the database

app.post('/additem', function(req, res) {
    
    let sampleFile = req.files.sampleFile;
    filename = sampleFile.name;
    
    sampleFile.mv('./images/' + filename, function(err){
        
        if(err)
        
        return res.status(500).send(err);
        console.log("Image you are uploading is " + filename)
       // res.redirect('/');
    })
    
    
   
    // Insert into table that will show Item Id, Name, image, audio and Facts
    let sql = 'INSERT INTO shanec (Name, Image, Audio, Facts) VALUES ("   '+req.body.name+'   ", "'+filename+'", "'+req.body.audio+'", "'+req.body.facts+'") ';
    
    let query = db.query(sql, (err,res) => {
        
        if(err) throw err;
        
        console.log(res);
        
    });
    
    res.redirect('/items')
    //res.send("You created your first Item")
   
});

// URL to get the edit Item page 

app.get('/edititem/:id', function(req, res) {
    
     let sql = 'SELECT * FROM shanec WHERE Id =  "'+req.params.id+'" ';
    
    let query = db.query(sql, (err,result) => {
        
        if(err) throw err;
        
        console.log(result);
        
        res.render('edititem', {result});
        
    });
    
    
    
    
})
// URL to the edit Item  

app.post('/edititem/:id', function(req, res) {
    
     let sampleFile = req.files.sampleFile;
    filename = sampleFile.name;
    
    sampleFile.mv('./images/' + filename, function(err){
        
        if(err)
        
        return res.status(500).send(err);
        console.log("Image you are uploading is " + filename)
       // res.redirect('/');
    });
    
   
    // Update table to show new Information
    let sql = 'UPDATE shanec SET Name = " '+req.body.name+' ", Image = "'+filename+'", Audio = "'+req.body.audio+'", Facts = "'+req.body.facts+'" WHERE Id = "'+req.params.id+'" ';
    
    let query = db.query(sql, (err,res) => {
        
        if(err) throw err;
        
        console.log(res);
        
    });
    
    res.redirect('/items');
    //res.send("You created your first Item")
   
});

// URL TO delete a product

app.get('/delete/:id', function(req,res){
    
        let sql = 'DELETE FROM shanec WHERE Id =  "'+req.params.id+'" ';
    
    let query = db.query(sql, (err,result) => {
        
        if(err) throw err;
        
        console.log(result);
        
       
        
    });
    
    res.redirect('/items')
    
    
})
// ______________________SQL Ends Here ______________________


// -----------------------Uploader----------------------------

app.get('/upload', function(req, res) {
    
    res.render('upload');
    
});

app.post('/upload', function(req, res) {
    
    let sampleFile = req.files.sampleFile;
   // let audioFile = req.files.audioFile
    
  filename = sampleFile.name;
  //filename2 = audioFile.name;
  
    //sampleFile.mv('./images/' + filename || filename2, function(err){
    sampleFile.mv('./images/' + filename, function(err){
        
        if(err)
        
        return res.status(500).send(err);
        console.log("Image you are uploading is " + filename);
        res.redirect('/');
    });
    
    //   let audioFile = req.files.audioFile;
    // filename2 = audioFile.name;
    
    // audioFile.mv('./audio/' + filename2, function(err){
        
    //     if(err)
        
    //     return res.status(500).send(err);
    //     console.log("Image you are uploading is " + filename2)
    //     res.redirect('/');
    // })
    
});





// ------------------End of Uploader-----------------------------




// ---------Search function --------------------------------

// Search function

app.post('/search', function(req,res){
    
        let sql = 'SELECT * FROM shanec WHERE Name LIKE   "%'+req.body.search+'%" ';
    
    let query = db.query(sql, (err,result) => {
        
        if(err) throw err;
        
        console.log(req.body.search);
        
        res.render('items', {result})
        
    });
    
    
    
    
})




//------------------JSON----------------------------------------------------
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


// This section will control the edit JSON Data

// get to edit page

app.get('/edituser/:id', function(req, res) {
   // build the information based on changes made by the user
   function chooseUser(mainOne){
     return mainOne.id === parseInt(req.params.id) 
   };
   
   var mainOne = users.filter(chooseUser);
   
   res.render("edituser", {res:mainOne});
});

// Perform/post the edit
app.post('/edituser/:id', function(req,res){
   
   // stringify the JSON data so it can be called as a variable and modified when needed
      var json = JSON.stringify(users);
      
   //declare the incoming id from the url as a variable
      var keyFind = parseInt(req.params.id);
   
   
   // use predetermined JavaScript functionality to map the data and find the information needed
      var index = users.map(function(users) {return users.id}).indexOf(keyFind);
    
   // These lines collect content from the body where the user fills in the form
    
      var a = parseInt(req.params.id);
      var b = req.body.name;
      var c = req.body.Comment;
      var d = req.body.email;
    
   // The next section pushes new data to the json
    
      users.splice(index, 1, {name: b, Comment: c, email: d, id: a });
      
   // this reformats the JSON and pushes it back to the file 
      json = JSON.stringify(users, null, 4); // Structures the JSON to be more legible
      fs.writeFile('./model/users.json',json, 'utf8', function(){});
      
      res.redirect("/userpage");
});

app.get('/deleteuser/:id', function(req,res){
    
    
    // firstly we need to stringify our JSON data so it can be call as a variable an modified as needed
    var json = JSON.stringify(users);
    
    // declare the incoming id from the url as a variable 
    var keyToFind = parseInt(req.params.id);
    
    // use predetermined JavaScript functionality to map the data and find the information I need 
    var index = users.map(function(users) {return users.id}).indexOf(keyToFind);
    

    users.splice(index, 1);
    
  
    
    // now we reformat the JSON and push it back to the actual file
    json = JSON.stringify(users, null, 4); // this line structures the JSON so it is easy on the eye
    fs.writeFile('./model/users.json',json, 'utf8', function(){});
    
    res.redirect("/userpage");
    
    
});

// this code provides the server port for our application to run on
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
console.log("Yippee its running");
  
});

const express = require("express");
const mysql = require("mysql");
const ejs = require("ejs");
const app = express();
const bodyParser = require("body-parser");
const cors=require('cors');
const session = require('express-session');
var username="";
var temp=[];




app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql123",
    database: "sjce_placement",
    port: "3306"
})
app.use(cors());

connection.connect((err) => {
    if(err){
        throw err;
    }
    else{
        console.log("Connected!");
    }
})
// app.get("", function(req,res){
// res.render('design');
// });

// connection.query("SELECT student.Full_Name,company.c_name,company.tier FROM student JOIN company WHERE student.CGPA_of_all_4_semesters>=company.cutoff"){
//     if(err){
//         throw err;
//     }
    
//         console.log("DATA SENT SUCCESFULLY");
//         console.log(rows);
    
// })


app.get("/", function(req,res){
    res.render("Login");
  });
app.get("/register", function(req,res){
    res.render("Registeration");
  });
app.get("/details", function(req,res){
    res.sendFile(__dirname+"/details.html");
  }); 
 

app.post("/register",function(req,res){
    const name=req.body.fname;
    const usn=req.body.usn;
    const email=req.body.username;
    const spassword=req.body.password;
    const cpassword=req.body.cpassword;
    connection.query('INSERT into registration(fname,usn,username,password,cpassword)VALUES("'+name+'","'+usn+'","'+email+'","'+spassword+'","'+cpassword+'")');
    res.redirect('/');
})  

// app.post("/",function(req,res){
//   connection.query('INSERT into placement_admin(username,c_name)VALUES("'+username+'","'+c_name+'")');
// })

// app.post("/",function(req,res){

  
// })

app.get("/design",function(req,res){
  connection.query("SELECT * FROM registration",(err,results,fields) => {
    if(err) throw err;
    //res.send(results);
    res.render("design",{items:results});
  });
});

app.get("/home",function(req,res){
  connection.query("SELECT company.c_name,company.tier,company.test_date FROM student JOIN company WHERE student.CGPA_of_all_4_semesters>=company.cutoff AND student.Email_Address=? ",[username],(err,results,fields) => {
   
    temp=results;
    if(err) throw err;
    //res.send(results);
    res.render("home",{items:results});
  });
});


app.post("/home",function(req,res){
  
  //console.log(req.body.company);
  //const htmlbtn = document.getElementById(i);
  const x=req.body.company;
  const y=x.indexOf(",");
  const company_name=x.slice(0,y);
  const company_date=x.slice(y+1,);
  connection.query('INSERT into placement_admin(username,c_name,test_date)VALUES("'+username+'","'+company_name+'","'+company_date+'")');

  // function submitbtn(){
  //   getElementById(i).disabled=true;
  //   //Validation code goes here
  //   }
});



// app.post("/",function(req,res){
  // connection.query("SELECT company.c_name,company.tier,company.test_date FROM student JOIN company WHERE student.CGPA_of_all_4_semesters>=company.cutoff AND student.Email_Address=? ",[req.body.username],(err,results,fields) => {
  //   if(err) throw err;
  //   //res.send(results);
  //   res.render("home",{items:results});
//   });
// })


app.post('/', function(request, response) {
	 username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM registration WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
      
				response.redirect('/home');
        
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} 
  else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port "+ port);

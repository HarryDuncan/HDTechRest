var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var aws = require('aws-sdk');
const bodyParser = require('body-parser');
const cors = require('cors');

//Initialized the REST app
const app = express();
app.use(cors());


app.use(bodyParser());



if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}




app.get('/tech', (req, res) =>{
 		MongoClient.connect(process.env.DATABASE , { useNewUrlParser: true }, function(err, db) {
		  if (err) throw err;
		  var dbo = db.db("HDTech")
		  dbo.collection("HDTech").find({}).toArray(function(err, result) {
		    if (err) throw err;
			res.send(result);
		})	
		db.close();
		});
		
})

app.get('/portfolio', (req, res) =>{
	MongoClient.connect(process.env.DATABASE , { useNewUrlParser: true }, function(err, db) {
		  if (err) throw err;
		  var dbo = db.db("HDTech")
		  dbo.collection("Portfolio").find({}).toArray(function(err, result) {
		    if (err) throw err;
			res.send(result);
		})	
		db.close();
		});
})


// Edit this with YOUR email address.
var email   = "h.duncan@live.com";
    
// Load your AWS credentials and try to instantiate the object.
aws.config.loadFromPath(__dirname + '/config.json');

// Instantiate SES.
var ses = new aws.SES();


// Sending RAW email
app.post('/send', function (req, res) {
	var From = req.body.data.name;
	var Phone = req.body.data.phone;
	var Email = req.body.data.email;
	var Message = req.body.data.message;
	console.log(From, Phone, Email, Message);
    var ses_mail = "From: 'Haus Duncan Tech' <" + email + ">\n";
    ses_mail = ses_mail + "To: " + email + "\n";
    ses_mail = ses_mail + "MIME-Version: 1.0\n";
    ses_mail = ses_mail + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
    ses_mail = ses_mail + "--NextPart\n";
    ses_mail = ses_mail + "Content-Type: text/html; charset=us-ascii\n\n";
    ses_mail = ses_mail + "New message from " + From + " \n" + Phone + " " + Email + " \n";
    ses_mail = ses_mail + Message;
    
    var params = {
        RawMessage: { Data: new Buffer(ses_mail) },
        Destinations: [ email ],
        Source: "'Haus Duncan' <" + email + ">'"
    };
    
    ses.sendRawEmail(params, function(err, data) {
        if(err) {
            res.send(err);
        } 
        else {
            res.send(data);
        }           
    });

   
});



app.listen(4000, () => {
	console.log('connected to db')
})
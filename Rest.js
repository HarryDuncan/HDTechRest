var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var AWS = require('aws-sdk');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}



//Initialized the REST app
const app = express();
app.use(cors());





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





app.listen(4000, () => {
	console.log('connected to db')
})
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/StudentInfo";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("19BDS0055 - RUSHABH KELA - NodeJS with MongoDB")
    console.log("Database StudentInfo created!");
    var dbc = db.db("StudentInfo");
    dbc.createCollection("details",  function(err, res) {
        if (err) throw err;
        console.log("Collection details created!");
        db.close();
    });
});

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, 'home.html'))
});

app.get("/insert", (req,res) => {
    res.sendFile(path.join(__dirname, 'insert.html'));
});

app.post("/insert", urlencodedParser, function (req,res) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbc = db.db("StudentInfo");
        var myobj = [
            { name: req.body.name, registerNum: req.body.regno, email: req.body.email, DOB: new Date(req.body.dob), CGPA: parseFloat(req.body.cgpa)}
        ];
    
        dbc.collection("details").insertMany(myobj, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount + "\n\n");
            db.close();
        });
    });
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.get("/update", (req,res) => {
    res.sendFile(path.join(__dirname, 'update.html'));
});

app.post("/update", urlencodedParser, function (req,res) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbc = db.db("StudentInfo");
    
        dbc.collection("details").updateOne({registerNum: req.body.regno}, {$set: {CGPA: req.body.cgpa}},  function(err, res) {
            if (err) throw err;
            console.log("Document Updated.");
            console.log("Updated Document -->");
            dbc.collection("details").find({registerNum: parseFloat(req.body.regno)}).toArray( function(err, result) {
                if (err) throw err;
                console.log(result);
                db.close();
            });
        });
    });
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.get("/delete", (req,res) => {
    res.sendFile(path.join(__dirname, 'delete.html'));
});

app.post("/delete", urlencodedParser, function (req,res) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbc = db.db("StudentInfo");
    
        dbc.collection("details").remove({registerNum: req.body.regno},  function(err, res) {
            if (err) throw err;
            console.log("Document Deleted.");
        });

    });
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.get("/query", (req,res) => {
    res.sendFile(path.join(__dirname, 'query.html'));
});

app.post("/query", urlencodedParser, function (req,res) {
    var reply = '';

    function getDetails() {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbc = db.db("StudentInfo");
        
            dbc.collection("details").find({}).toArray(function(err, result) {
                if (err) throw err;
                var i;
                for(i = 0; i < result.length; i++)
                {
                    if(result[i]['registerNum'] == req.body.regno) {
                        break;
                    }
                }
                reply += '<h1>Name: ' + result[i]['name'] + "</h1>";
                reply += '<h1>Register Number: ' + result[i]['registerNum'] + "</h1>";
                reply += '<h1>Email: ' + result[i]['email'] + "</h1>";
                reply += '<h1>DOB: ' + result[i]['DOB'] + "</h1>";
                reply += '<h1>CGPA: ' + result[i]['CGPA'] + "</h1>";
                console.log(reply);
                db.close();
            });
        });
    }

    function display() {
        res.send(reply);
    }

    getDetails();
    setTimeout(display, 3000);
});

app.listen(3000);
console.log("Server is ready");
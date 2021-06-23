var MongoClient=require('mongodb').MongoClient;
var express=require('express');
var bodyParser=require('body-parser');
var app=express();
var urlencodedParser=bodyParser.urlencoded({extended:true});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
var url="mongodb://localhost:27017/";

app.get('/', function(req, res) {
    res.sendFile('index.html', {root: __dirname })
});

// inserting form values

// app.post('/reg',function(req,res){
//     response={name:req.body.name,reg:req.body.reg};
//     console.log(response);
//     MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var data = db.db("fat");
//     data.collection("iwp").insertOne(response, function(err, out) {
//       if (err) throw err;
//       console.log("1 document inserted");
//       res.redirect('/');
//     });
//   });
  
// })

//display from mongodb in table

// app.get('/display', function(req, res) {
//     MongoClient.connect(url, function(err, db) {
//             if (err) throw err;
//             var data = db.db("fat");
//             data.collection("iwp").find({}).toArray(function(err, myout) {
//               if (err) throw err;
//               console.log("Started Displaying");
//               var output = '<html><header><title>Table List from DB</title></header><body>';
//               output += '<table border="1"><tr><td><b>' + 'Name' + '</b></td><td><b>' + 'Reg' + '</b></td></tr>';
//               myout.forEach(function(out){
//                   var ch=out.reg;
//                   if(ch=="19")
//                   {
//                     output += '<tr><td style="color:red;">' + out.name + '</td><td>' + out.reg + '</td></tr>';      
//                   }
//                 else output += '<tr><td>' + out.name + '</td><td>' + out.reg + '</td></tr>';
//               });
//               output += '</table></body></html>'
//               res.send(output);
//               db.close();
//             });
//           });
// });

// creating a collection

// MongoClient.connect(url,function(err,db){
//     if(err)throw err;
//     var data=db.db("fat");
//     data.createCollection("iwp",function(err,res){
//         if(err)throw err;
//         console.log("Collection Created");
//         db.close();
//     })
//     db.close();
// })

// inserting 

// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var data = db.db("fat");
//     var myobj = [{ name: "Harsh", reg:"19BCT0210"},{ name: "Gualti", reg:"19BCT0210"}];
//     data.collection("iwp").insertMany(myobj, function(err, res) {
//       if (err) throw err;
//       console.log("1 document inserted");
//       db.close();
//     });
//   });

//deleting

// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var data = db.db("fat");
//     var myqu = {name:/^G/};
//     data.collection("iwp").deleteMany(myqu, function(err, res) {
//       if (err) throw err;
//       console.log(  res.result.n+"1 document inserted");
//       db.close();
//     });
//   });

//updating

// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var data = db.db("fat");
//     var myqu = {name:/^G/};
//     var newvalue={$set:{name:"Harsh Gulati",reg:"19BCT0210 CSEIOT"}};
//     data.collection("iwp").updateOne(myqu,newvalue, function(err, res) {
//       if (err) throw err;
//       console.log(  res.result.n+"1 document updated");
//       db.close();
//     });
//   });

app.listen(3000, process.env.IP, function () {
    console.log('server started');
});
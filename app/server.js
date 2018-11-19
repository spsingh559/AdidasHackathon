
var path = require('path');
var webpack = require('webpack');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var index = require('./webserver/routes/index');
var users = require('./webserver/routes/users');
var app = express();
var compiler = webpack(config);
var fs=require('fs');

var multipart = require('connect-multiparty');

var multipartMiddleware = multipart();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, './webclient/')));

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


app.post('/api/registration', function(req,response){
    console.log('api registration');
    console.log(req.body);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sportDB");
        dbo.collection("registration").insertOne(req.body, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
        //   this.onboardingUser(req.body._id,req.body.name,"Pending");
          response.send("success");
        });

      });

    //   let obj= {
    //       _id:req.body._id,
    //       name:req.body.name,
    //       certificateName:"",
    //       issuer:"",
    //       did:"",
    //       enrollStatus:false,
    //       timeStamp:""
    //   }

    //   MongoClient.connect(url, function(err, db) {
    //     if (err) throw err;
    //     var dbo = db.db("sovrinDB");
    //     dbo.collection("certificate").insertOne(obj, function(err, res) {
    //       if (err) throw err;
    //       console.log("1 document inserted");
    //       response.send("success");
    //     });

    //   });

})


// ----------------------------------Login----------------------------------

app.post('/api/login', function(req,response){
    console.log('api registration');
    console.log(req.body);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sportDB");
        // var myobj = { name: "Company Inc", address: "Highway 37" };
        
        var query = { name: req.body.name };
  dbo.collection("registration").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result.length);
    if(result.length==0){
        response.send({
            response:"Fail"
        })
    }else{
    console.log(result[0]);
    if(result[0].pwd==req.body.pwd){
        console.log('inside if');
        response.send({
            response:"Succes",
            name:result[0].name,
            role:result[0].role,
            _id:result[0]._id,
        });
    }else{
        console.log('pass not match')
        response.send({
            response:"Fail"
        })
    }
}
    
    db.close();
  });
      });

})


// -----------------getUserByUserType for chatting-------------------

app.patch('/api/sendMessage', function(req,response){
    console.log('sendMessage api is');
  
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sovrinDB");
        var myquery = { _id: req.body._id };
        var newvalues = { $set: {message: req.body.message } };
        dbo.collection("channel").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
          response.send("success");
          db.close();
        });


})

});

// -----------------End getUserByUserType for chatting -------------------

// -----------------create channel for chatting-------------------

app.post('/api/createChannel', function(req,response){
    console.log('createChannel api is');
  
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sovrinDB");
        // var query = {name: req.params.name};
        dbo.collection("channel").insertOne(req.body, function(err, res) {
            if (err) throw err;
            console.log("createChannel done");
            response.send("success");
            db.close();
          });



})

});

// -----------------End getUserByUserType for chatting -------------------

// -----------------getUserByUserType for adding to chat list-------------------

app.get('/api/getChannelByPubOrSub/:name', function(req,response){
    console.log('getChannelByPubOrSub api');
   console.log('name received is', req.params.name)
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sovrinDB");
        var query = {  $or: [ { channelPub: req.params.name }, { channelSub: req.params.name } ] };
        dbo.collection("channel").find(query).toArray(function(err, result) {
    if (err) throw err;
    // console.log(result);
    response.send({data:result})
    db.close();
  })



})

});

// -----------------End getUserByUserType for adding to chat list -------------------


//Ruotes
// app.use('/', index);
// app.use('/api/v1/',require('./router'));


app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
}));

app.use(webpackHotMiddleware(compiler));



//Listening to port 8081
app.listen(8080, '0.0.0.0', function(err, result) {
    if (err) {
        console.error("Error ", err);
    }

    console.log("Server started at 8080");
});




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

// Web3 Configuration -----------------------------------
var Web3 = require('web3');
var ABI =require('./ABI');
var web3 =new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.eth.defaultAccount = '0x2d8ba2df7d45b160f7b05ec75347146d6227dba1';
let contractAddress='0x9c824b4a3b65c5fd0f91b288909bf636743e7b91';
 var sportsFunda = new web3.eth.Contract(ABI, contractAddress);
 var AccountAddress= require('./webclient/components/AccountAddress');
// Web3 Configuration End-----------------------------------
 

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



app.post('/api/createContract',function(req,res){
    console.log('/api/createContract');
    console.log(req.body);
    if(req.body.contractType=="A2I"){
        sportsFunda.methods.createContractWithInvestor(req.body.contractId, req.body.counterPartyAddress,req.body.amount,req.body.returnPercentage,req.body.duration,req.body.contractType).send({from: web3.eth.defaultAccount, gas: 1000000})
      .then(function(receipt){
        console.log(receipt);
        res.send({response:"success",
            txHash:receipt.transactionHash
        });
    });
    }else{
        sportsFunda.methods.createContractWithPlayer(req.body.contractId, req.body.counterPartyAddress,req.body.amount,req.body.returnPercentage,req.body.duration,req.body.contractType).send({from: web3.eth.defaultAccount, gas: 1000000})
        .then(function(receipt){
          console.log(receipt);
          res.send({response:"success",
            txHash:receipt.transactionHash
        });
      });
    }
    
})

app.get('/api/getMyContract/:address', function(req,res){
console.log(req.params.address);
sportsFunda.methods.myContract(req.params.address).call({from: web3.eth.defaultAccount, gas: 1000000}).then(function(receipt){
    // console.log(receipt);
    res.send(receipt);
//     res.send({response:"success",
//       txHash:receipt.transactionHash
//   });
});
});

app.get('/api/payToAdidasByInvestor/:amount/:user', function(req,res){
console.log(req.params.amount);
console.log(AccountAddress[req.params.user]);
if(req.params.user=="Player"){
    sportsFunda.methods.PlayerPayToAdidas().send({from: AccountAddress[req.params.user], gas: 1000000, value:parseInt(req.params.amount)}).then(function(receipt){
        console.log(receipt);
        res.send({response:receipt.transactionHash});
    });
}else{
    sportsFunda.methods.InvestorPayToAdidas().send({from: AccountAddress[req.params.user], gas: 1000000, value:parseInt(req.params.amount)}).then(function(receipt){
        console.log(receipt);
        res.send({response:receipt.transactionHash});
    });
}
    });

    app.post('/api/payToInvestorByAdidas', function(req,res){
        console.log('api/payToInvestorByAdidas');
        console.log(req.body);
            sportsFunda.methods.AdidasPayToInvestor(req.body.investorAddress).send({from:  web3.eth.defaultAccount, gas: 1000000}).then(function(receipt){
                console.log(receipt);
                res.send({response:receipt.transactionHash});
            });
        })

app.get('/api/getAdidasBalance/:role/:name',function(req,res){
    console.log('username is', req.params.name);
    console.log('username is', req.params.role);
    if(req.params.role=="I" || req.params.role=="P"){
        // res.send({response:web3.eth.getBalance("0x20ce4ed62a78952d8f540bceaaf3759ca4e36566")});
        web3.eth.getBalance(AccountAddress[req.params.name], (err, bal) => {
            if (err) {
              console.log(`getBalance error: ${err}`);
            } else {
                res.send({response:bal});
              console.log('Balance is'+bal);
            }
          });
        // sportsFunda.methods.getBalanceAdidas().call({from: AccountAddress[req.params.name], gas: 1000000}).then(function(receipt){
        //     console.log(receipt);
        //     res.send({response:receipt});
        // //     res.send({response:"success",
        // //       txHash:receipt.transactionHash
        // //   });
        // });
    }else{
    sportsFunda.methods.getBalanceAdidas().call({from: web3.eth.defaultAccount, gas: 1000000}).then(function(receipt){
        console.log(receipt);
        res.send({response:receipt});
    //     res.send({response:"success",
    //       txHash:receipt.transactionHash
    //   });
    });
}
})

app.post('/api/createRequest/:name',function(req,res){
    console.log('/api/createRequest');
    console.log(req.body);
        sportsFunda.methods.createRequest(req.body._desc, req.body._rec,req.body._value).send({from: AccountAddress[req.params.name], gas: 1000000})
      .then(function(receipt){
        console.log(receipt);
        res.send({response:"success",
            txHash:receipt.transactionHash
        });
    });
});

app.post('/api/sendVote',function(req,res){
    console.log('/api/sendVote');
    console.log(AccountAddress[req.body.name]);
    console.log(req.body);
        sportsFunda.methods.voteRequest(parseInt(req.body.index)).send({from: AccountAddress[req.body.name], gas: 1000000000})
      .then(function(receipt){
        console.log(receipt);
        res.send({response:"success",
            txHash:receipt.transactionHash
        });
    });
});

app.get('/api/noOfRequest',function(req,res){
    console.log('/api/noOfRequest');
    sportsFunda.methods.noOfRequest().call({from: web3.eth.defaultAccount, gas: 1000000}).then(function(receipt){
        console.log(receipt);
        res.send({response:receipt});
    //     res.send({response:"success",
    //       txHash:receipt.transactionHash
    //   });
    });
});

app.get('/api/eachRequest/:i',function(req,res){
    console.log('/api/eachRequest');
    sportsFunda.methods.viewVoteRequest(parseInt(req.params.i)).call({from: web3.eth.defaultAccount, gas: 1000000}).then(function(receipt){
        console.log(receipt);
        res.send({response:receipt});
    //     res.send({response:"success",
    //       txHash:receipt.transactionHash
    //   });
    });
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



// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://35.200.133.28"));


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// [START hello_world]
// Say hello!
app.get('/', (req, res) => {
  res.status(200).send('Node server is running !!');
});

app.post('/webhook', function(req,res){

  const accounts = fetch();
	let params = req.body.result.parameters;
	res.setHeader('Content-Type', 'application/json');

  let response = ``;

  if(params.personName && params.sendEther)
	  response = `${params.personEther} has been send to ${params.personName}`;
  else if(params.voteCount)
    response = `function for votecount`
  else if(params.voteLead)
    response = `function for votelead`
  else if(params.etherBalance) 
    response = `function for balance`
  else
    response = `Sorry cannot process your request`;
	res.send(JSON.stringify({ "speech": response, "displayText": response})); 


  //console.log(accounts);
  //res.send(accounts);
});
// [END hello_world]

function fetch() {
  const accounts = web3.eth.accounts;
    const assign = [{
        'krishna': accounts[0],
        'pruthvi': accounts[1],
        'pankaja': accounts[2],
        'shashikumar' : accounts[3],
        'suresh': accounts[4],
        'raghavendra': accounts[5],
        'ganesh': accounts[6],
        'vaishakh': accounts[7],
        'rajath': accounts[8],
        'gambler': accounts[9]
    }]
    return(assign); 
}


if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8081, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

module.exports = app;

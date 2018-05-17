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
const solc = require('solc');
const fs = require('fs');

const code = fs.readFileSync('Voting.sol').toString();
const compiledCode = solc.compile(code);

const mycontract = JSON.parse(compiledCode.contracts[':Voting'].interface);
const VotingContract = web3.eth.contract(mycontract);
const byteCode = compiledCode.contracts[':Voting'].bytecode;

const contractInstance = VotingContract.at('0x08141010f35e4905647d136de2c3ee7a662803f9');



app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// [START hello_world]
// Say hello!
app.get('/', (req, res) => {
  res.status(200).send('Node server is running !!');
});

app.post('/webhook', function(req,res){

  let wallet = fetch();
	let params = req.body.result.parameters;
	res.setHeader('Content-Type', 'application/json');

  let response = ``;

  if(params.personName && params.sendEther)
  {

    let send = web3.eth.sendTransaction({from:wallet['krishna'],to:wallet[params.personName], value:web3.toWei(parseInt(params.ether), "ether")});
	  response = `${params.sendEther} has been send to ${params.personName}`;

  }
  else if(params.voteCount)
    response = `${params.voteCount} has ${contractInstance.totalVotesFor.call(params.voteCount)} votes`;
  else if(params.voteLead)
  {
    let winner = chickenWinner();
    response = `${winner} is leading`;
  }
  else if(params.etherBalance) 
    response = `You have ${web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]), 'ether')}`;
  else
    response = `Sorry cannot process your request`;
	res.send(JSON.stringify({ "speech": response, "displayText": response})); 


  //console.log(accounts);
  //res.send(accounts);
});
// [END hello_world]

function chickenWinner() {
    let congress = parseInt(contractInstance.totalVotesFor.call('Congress'));
    let bjp = parseInt(contractInstance.totalVotesFor.call('BJP'));
    let jds = parseInt(contractInstance.totalVotesFor.call('JDS'));
    let votemap = {
      congress : congress,
      bjp : bjp,
      jds : jds
    }
    let max = Math.max(congress,bjp,jds);
    for(i in votemap)
    {
      if(votemap[i] == max)
      {
        return(i);
      }
    }
}



function fetch() {
  const accounts = web3.eth.accounts;
    const assign = {
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
    }
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

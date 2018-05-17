const express = require('express');
const Web3 = require('web3');
const port = 3000 || process.env.PORT;
const app = express();
const web3 = new Web3(new Web3.providers.HttpProvider("http://35.200.133.28"));


app.get('/', (req, res) => {
	let wallet = fetch();
  res.status(200).send(wallet["pruthvi"]);
});

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
app.listen(port, () => {
    console.log('Hello');
});
var Web3 = require('web3');

const ethereumUri = 'http://localhost:8545';
const address = 'your account address';
const address2 = 'other account address';
const pwd = 'your pwd';

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider(ethereumUri));
}

web3.personal.unlockAccount(address, pwd);

var newStr = JSON.stringify(process.argv[2]); 
var transactionObject = {
    from:address,
    to:address2,
    value:100,
    data:web3.toHex(newStr)
};
web3.eth.sendTransaction(transactionObject , function(err, address) {
    if (err) {
        console.log("Transaction err:"+err); // 
    } else {
        console.log("Transaction: "+address); // 	
    }
});
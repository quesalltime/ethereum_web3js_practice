var Web3 = require('web3');

const ethereumUri = 'http://localhost:8545';
const address = 'your account address';
const pwd = 'your pwd';

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider(ethereumUri));
}

watchTX();

function watchTX() {
    setTimeout(function(){
       
        var filterType = "pending";
        var filter = web3.eth.filter(filterType);
        filter.watch(function(error, result){
            if (error) {
                console.log(error);
            } else {
                console.log("");
                console.log("Pending transaction got:"+result.slice(0,10));
                var tx = web3.eth.getTransaction(result);
                var txData = web3.toAscii(tx.input);
                console.log(txData);
            }
        });

    }, 1000);      
}
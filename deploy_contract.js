var fs = require('fs');
var solc = require('solc');
var Web3 = require('web3');

const ethereumUri = 'http://localhost:8545';
const address = 'your account address';
const pwd = 'your pwd';
const contractPath = "./contracts/SimpleContract.sol";

/*
* Connect to ethereum
*/ 
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider(ethereumUri));
}
if (!web3.isConnected()){
    throw new Error('unable to connect to ethereum node at ' + ethereumUri);
} else {
    console.log('connected to ehterum node at ' + ethereumUri);
}


/*
* Compile Contract and Fetch ABI, bytecode
*/ 
var source = fs.readFileSync(contractPath, 'utf8');
console.log('compiling contract...');
var compiledContract = solc.compile(source);
console.log('done');
for (var contractName in compiledContract.contracts) {
    var bytecode = compiledContract.contracts[contractName].bytecode;
    var abi = JSON.parse(compiledContract.contracts[contractName].interface);
}

console.log(JSON.stringify(abi, undefined, 2));


/*
* Deploy contract
*/ 
bytecode = '0x' + bytecode;
web3.personal.unlockAccount(address, pwd);
var gasEstimate = web3.eth.estimateGas({data: bytecode});
console.log('gasEstimate = ' + gasEstimate);

var MyContract = web3.eth.contract(abi);
console.log('deploying contract...');
console.log(MyContract);

var myContractReturned = MyContract.new( {
    from: address,
    data: bytecode,
    gas: gasEstimate
}, function (err, myContract) {
    if (!err) {
        if (!myContract.address) {
            console.log(`myContract.transactionHash = ${myContract.transactionHash}`); 
        } else {
            console.log(`myContract.address = ${myContract.address}`);
            return;
        }
    } else {
        console.log(err);
    }
});

(function wait () {
    setTimeout(wait, 1000);
})();
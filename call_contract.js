var fs = require('fs');
var solc = require('solc');
var Web3 = require('web3');

const ethereumUri = 'http://localhost:8545';
const address = 'your account address';
const pwd = 'your pwd';
const contractPath = "./contracts/SimpleContract.sol";

const myContractAddress = 'your contract address';

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
var compiledContract = solc.compile(source);
for (var contractName in compiledContract.contracts) {
    var bytecode = compiledContract.contracts[contractName].bytecode;
    var abi = JSON.parse(compiledContract.contracts[contractName].interface);
}

web3.personal.unlockAccount(address, pwd);

var myContract = web3.eth.contract(abi).at(myContractAddress);

console.log('\x1b[0m%s\x1b[31m%s\x1b[0m' , "Calling setValue2( " + process.argv[2] + "," , process.argv[3] , ")");
myContract.setValue2(process.argv[2], process.argv[3], {from:address ,gas: 1000}, function(err, address) {
    if (err) {
        console.log("Transaction err:"+err); // 
    } else {
        console.log("Transaction :"+address); 
    }
} );

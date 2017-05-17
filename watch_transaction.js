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
console.log('wait for contract calling... ' + myContractAddress);
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
                var myContract = web3.eth.contract(abi).at(myContractAddress);
                console.log('\x1b[0m%s\x1b[31m%s\x1b[0m',"value fetched: " , myContract.value());
            }
        });
    }, 1000);      
}
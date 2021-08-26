// deploy code will go here
// goddess catch give sheriff eye absurd monkey focus evidence require sleep copy

// infura https://rinkeby.infura.io/v3/69783521bfcc47d6b7b6e48b852eec4b
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'put mnemonics',
    'infura api key'
);

const web3 = new Web3(provider);

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();
    console.log('Available accounts: ', accounts);
    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode, arguments: ['Hi there!']})
      .send({ from: accounts[0], gas: '1000000', gasPrice: '5000000000'});
    
    console.log("Contract has been deployed to: ", result.options.address);
};
deploy();

const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use one of the accounts to deploy
    // the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode, arguments: ['Hi there!']})
      .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox tests', () => {
    it('deploys a contract', () => {
        console.log('address: ' + inbox.options.address);
        assert.ok(inbox.options.address);
    });
    it('is initialized properly', async () => {
        assert.equal(await inbox.methods.message().call(), 'Hi there!');
    });
    it('is setting message ok', async () => {
        await inbox.methods.setMessage('Hi Rafal!').send({ from: accounts[0] });
        assert.equal(await inbox.methods.message().call(), 'Hi Rafal!');
    });
});
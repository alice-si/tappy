const ethers = require('ethers');
const Web3 = require('web3');
const tokenContractJson = require('./build/contracts/Token.json');
const managerContractJson = require('./build/contracts/Manager.json');


function Blockchains() {

  const TOKEN_ADDRESS = {};
  const MANAGER_ADDRESS = {};
  TOKEN_ADDRESS['KOVAN'] = '0xc4375b7de8af5a38a93548eb8453a498222c4ff2';
  TOKEN_ADDRESS['SKALE'] = '0xCe1bEf07c4EB8118daFb829c97100E2d59506B08';
  MANAGER_ADDRESS['SKALE'] = '0x3a2C96aA949Eec6C44D042eb0eC017f2866d0E8B';

  let mnemonic, infuraProject;

  const web3 = new Web3();

  try {
    const secrets = require('./secrets.json');
    mnemonic = secrets.mnemonic;
    infuraProject = secrets.infuraProject;
  } catch (err) {
    console.log('You should have secrets.json file with mnemonic key and infura'
      + 'project id if you want to be able to deploy contracts');
  }

  let prepareHash = function(cardId, cardPass) {
    return web3.utils.soliditySha3(web3.eth.abi.encodeParameters(['string', 'string'],
      [cardId, cardPass]
    ));
  };

  let wallet = ethers.Wallet.fromMnemonic(mnemonic);
  let providers = {};
  let wallets = {};
  let tokens = {};

  providers['KOVAN'] = new ethers.providers.InfuraProvider('kovan', '154fbc552a454311855d44e1e73ea46a');
  wallets['KOVAN'] = wallet.connect(providers['KOVAN']);

  providers['SKALE'] = new ethers.providers.JsonRpcProvider('http://157.230.154.5:8046/');
  wallets['SKALE'] = wallet.connect(providers['SKALE']);

  tokens['KOVAN'] = new ethers.Contract(TOKEN_ADDRESS['KOVAN'], tokenContractJson.abi, wallets['KOVAN']);
  tokens['SKALE'] = new ethers.Contract(TOKEN_ADDRESS['SKALE'], tokenContractJson.abi, wallets['SKALE']);
  let manager = new ethers.Contract(MANAGER_ADDRESS['SKALE'], managerContractJson.abi, wallets['SKALE']);

  this.getToken = function(network) {
    return tokens[network];
  };

  this.printBlockNumber = function(network) {
    providers[network].getBlockNumber().then((blockNumber) => {
      console.log("Current " + network  + " block number: " + blockNumber);
    });
  };

  this.getSupply = function(network) {
    return tokens[network].totalSupply();
  };

  this.getBalance = function(network, address) {
    return tokens[network].balanceOf(address);
  };

  this.mint = function(network, address, value) {
    this.mintRaw(network, address, ethers.utils.parseEther(value));
  };

  this.mintRaw = function(network, address, value) {
    tokens[network].mint(address, value).then((tx) => {
      console.log("Minted " + value + " on " + network + " : " + tx.hash);
    });
  };

  this.addLoader = function(address) {
    return manager.addLoader(address).then((tx) => {
      console.log("Loader " + address + " added: " + tx.hash);
    });
  };

  this.addUnLoader = function(address) {
    return manager.addUnLoader(address).then((tx) => {
      console.log("UnLoader " + address + " added: " + tx.hash);
    });
  };

  this.load = function(cardId, secret, rawValue, loader) {
    let value = ethers.utils.parseEther(rawValue);
    manager.load(prepareHash(cardId, secret), value).then((tx) => {
      console.log("Loaded card:  " + cardId + " with " + rawValue + " : " + tx.hash);
    });
  };

  this.unLoad = function(cardId, secret, unLoader) {
    manager.unLoad(cardId, secret).then((tx) => {
      console.log("Unloaded card:  " + cardId + " : " + tx.hash);
    });
  }

}

module.exports = Blockchains;

const ethers = require('ethers');
const Web3 = require('web3');
const tokenContractJson = require('./build/contracts/Token.json');
const managerContractJson = require('./build/contracts/Manager.json');


function Blockchains() {

  const TOKEN_ADDRESS = {};
  const MANAGER_ADDRESS = {};
  TOKEN_ADDRESS['KOVAN'] = '0xc4375b7de8af5a38a93548eb8453a498222c4ff2';
  TOKEN_ADDRESS['SKALE'] = '0x716A8BC6ECA26cf6E2126E95937F5DbEb7977D8d';
  MANAGER_ADDRESS['SKALE'] = '0x2D26fD0e821fE44F0229411F9449DADd95Aa2497';
  TOKEN_ADDRESS['GANACHE'] = '0xFF390F84C467cf558c083846e4D4757593a010aD';
  MANAGER_ADDRESS['GANACHE'] = '0xFcc657A33c50de2E927dd27d6ccB6a52f599AC97';

  var mnemonic, infuraProject, wallet;

  const web3 = new Web3();

  try {
    const secrets = require('./secrets.json');
    mnemonic = secrets.mnemonic;
    infuraProject = secrets.infuraProject;
    wallet = ethers.Wallet.fromMnemonic(mnemonic);
  } catch (err) {
    console.log('You should have secrets.json file with mnemonic key and infura'
      + 'project id if you want to be able to deploy contracts');
  }

  let prepareHash = function(cardId, cardPass) {
    return web3.utils.soliditySha3(web3.eth.abi.encodeParameters(['string', 'string'],
      [cardId, cardPass]
    ));
  };


  let providers = {};
  let wallets = {};
  let tokens = {};

  providers['KOVAN'] = new ethers.providers.InfuraProvider('kovan', '154fbc552a454311855d44e1e73ea46a');
  wallets['KOVAN'] = wallet.connect(providers['KOVAN']);

  providers['SKALE'] = new ethers.providers.JsonRpcProvider('https://sip2211-1.skalenodes.com:10018');
  wallets['SKALE'] = wallet.connect(providers['SKALE']);

  providers['GANACHE'] = new ethers.providers.JsonRpcProvider('http://ganache.demo.alice.si:80');
  wallets['GANACHE'] = wallet.connect(providers['GANACHE']);

  tokens['KOVAN'] = new ethers.Contract(TOKEN_ADDRESS['KOVAN'], tokenContractJson.abi, wallets['KOVAN']);
  tokens['SKALE'] = new ethers.Contract(TOKEN_ADDRESS['SKALE'], tokenContractJson.abi, wallets['SKALE']);
  tokens['GANACHE'] = new ethers.Contract(TOKEN_ADDRESS['GANACHE'], tokenContractJson.abi, wallets['GANACHE']);
  let manager = new ethers.Contract(MANAGER_ADDRESS['GANACHE'], managerContractJson.abi, wallets['GANACHE']);

  this.getToken = function(network) {
    return tokens[network];
  };

  this.getReceipt = function(network, hash) {
    providers[network].getTransactionReceipt(hash).then((receipt) => {
      console.log(receipt);
    })
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
      this.getReceipt('GANACHE', tx.hash);
    });
  };

  this.testHash = function(cardId, secret) {
    manager.testHash(prepareHash(cardId, secret), cardId, secret).then((result) => {
      console.log("Test hash: " + result);
    });
  };

  this.unLoad = function(cardId, secret, unLoader) {
    console.log("Unloading card: " + cardId + " with secret: " + secret);
    manager.unLoad(cardId, secret).then((tx) => {
      console.log("Unloaded card:  " + cardId + " : " + tx.hash);
      this.getReceipt('GANACHE', tx.hash);
    });
  }

  this.checkAvailableAssets = function() {
    manager.getAvailableAssets().then((val) => {
      console.log(val.toString());
    });
  }

}

module.exports = Blockchains;

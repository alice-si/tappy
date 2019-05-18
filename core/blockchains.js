const ethers = require('ethers');
const tokenContractJson = require('./build/contracts/Token.json');


function Blockchains() {

  const TOKEN_ADDRESS = {};
  TOKEN_ADDRESS['KOVAN'] = '0x9B9e49D6c05AF54c0799D22A7d8DDf326E9b6224';
  TOKEN_ADDRESS['SKALE'] = '0x9B9e49D6c05AF54c0799D22A7d8DDf326E9b6224';

  let mnemonic, infuraProject;

  try {
    const secrets = require('./secrets.json');
    mnemonic = secrets.mnemonic;
    infuraProject = secrets.infuraProject;
  } catch (err) {
    console.log('You should have secrets.json file with mnemonic key and infura'
      + 'project id if you want to be able to deploy contracts');
  }

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

}

module.exports = Blockchains;

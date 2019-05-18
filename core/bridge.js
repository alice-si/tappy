const ethers = require('ethers');
const tokenContractJson = require('./build/contracts/Token.json');
const TOKEN_ADDRESS = '0x9B9e49D6c05AF54c0799D22A7d8DDf326E9b6224';

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
let provider = new ethers.providers.InfuraProvider('kovan', '154fbc552a454311855d44e1e73ea46a');
wallet = wallet.connect(provider);

//Test provider
provider.getBlockNumber().then((blockNumber) => {
  console.log("Current block number: " + blockNumber);
});

console.log(wallet.provider);



function tokenContract() {
    return new ethers.Contract(
    TOKEN_ADDRESS, tokenContractJson.abi, wallet);
}




function mint() {
  // console.log("Minting...");
  //
  // tokenContract().mint('0x55DbDAB581c4D5318901e9e35608444Cc2A3142d', ethers.utils.parseEther('1.0')).then((tx) => {
  //   console.log(tx);
  // });


  tokenContract().totalSupply().then((supply) => {
    console.log("Total supply: " + ethers.utils.formatEther(supply));
  });

  // var sendPromise = tokenContract().mint('0x0', 1);
  //
  // sendPromise.then(function(transaction){
  //   console.log(transaction);
  // });

}


mint();

// const walletProvider = new HDWalletProvider(
//   'turtle enforce elbow glow trap garbage private maximum sail hole wire half',
//   'https://kovan.infura.io/v3/154fbc552a454311855d44e1e73ea46a',
// );






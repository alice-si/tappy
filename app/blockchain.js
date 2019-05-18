import { ethers } from 'ethers';
import { HDWalletProvider} from 'truffle-hdwallet-provider';


function Blockchain() {

  const provider = new HDWalletProvider(
    'turtle enforce elbow glow trap garbage private maximum sail hole wire half',
    'https://kovan.infura.io/v3/154fbc552a454311855d44e1e73ea46a',
  );



  this.hello = function() {
    return 'hello!';
  };

  this.goodbye = function() {
    return 'goodbye!';
  };
}

module.exports = Blockchain;

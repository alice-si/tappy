import { ethers } from 'ethers';
import CryptoJS from 'crypto-js';
import { HDWalletProvider} from 'truffle-hdwallet-provider';


function Blockchain() {

  const provider = new HDWalletProvider(
    'turtle enforce elbow glow trap garbage private maximum sail hole wire half',
    'https://kovan.infura.io/v3/154fbc552a454311855d44e1e73ea46a',
  );

  function getHash(cardId) {
    // TODO alex remove
    return btoa('123' + cardId + '123')

    // TODO alex uncomment
    // return CryptoJS.MD5(cardId + 'kindofsalt').toString();
  }

  this.load = async function(cardId) {
    const hash = getHash(cardId);
    // TODO send load transaction 
  };

  this.unload = async function(cardId) {
    const hash = getHash(cardId);
    // TODO send unload transaction 
  };
}

module.exports = Blockchain;

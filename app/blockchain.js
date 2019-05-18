import { ethers } from 'ethers';
import CryptoJS from 'crypto-js';
import managerContractJson from './contracts/Manager.json';

const MANAGER_CONTRACT_ADDRESS = '0x0';
const DEFAULT_AMOUNT = 10;
const PRIVATE_KEY = '0xA88259AE882B0A60D82FD00F809078512A1F16285D0ED9824F5C2D516C26EFB3';

const provider = new ethers.providers.InfuraProvider('kovan', '154fbc552a454311855d44e1e73ea46a')
const wallet = (new ethers.Wallet(PRIVATE_KEY)).connect(provider);
const signer = provider.getSigner();
const contract = new ethers.Contract(
  MANAGER_CONTRACT_ADDRESS, managerContractJson.abi, signer);

const Blockchain = {

  prepareHash(cardId, cardPass) {
    return CryptoJS.MD5(cardId + cardPass + 'kindofsalt').toString();
  },

  async load(cardId, cardPass) {
    const hash = this.prepareHash(cardId, cardPass)
    await contract.load(hash, DEFAULT_AMOUNT)
    // return hash
  },

  async unload(cardId) {
    const hash = getHash(cardId);
    await contract.unload(hash, DEFAULT_AMOUNT)
  }

};

export default Blockchain;

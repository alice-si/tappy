import 'ethers/dist/shims.js'; // <- it solves problem with String.prototype.normalize
import { ethers } from 'ethers';
import managerContractJson from './contracts/Manager.json';
import Web3 from 'web3';



const MNEMONIC = "turtle enforce elbow glow trap garbage private maximum sail hole wire half";
const MANAGER_CONTRACT_ADDRESS = '0x14ABE122Ba65955a892412bbB89F083D100F2Ce5';
const DEFAULT_AMOUNT = '1.0';

// const ADDRESS = '0xD0e7083A32c61f28CD0d713C47A2611e1c2dadC9'; // <- it is unused
// const PRIVATE_KEY = 'A88259AE882B0A60D82FD00F809078512A1F16285D0ED9824F5C2D516C26EFB3';
// const PRIVATE_KEY = 'A88259AE882B0A60D82FD00F809078512A1F16285D0ED9824F5C2D516C26EFB4'; // <- it is unused


const provider = new ethers.providers.JsonRpcProvider('http://157.230.154.5:8046/');
// const wallet = (new ethers.Wallet(PRIVATE_KEY)).connect(provider);
const wallet = (ethers.Wallet.fromMnemonic(MNEMONIC)).connect(provider)
const contract = new ethers.Contract(
  MANAGER_CONTRACT_ADDRESS, managerContractJson.abi, wallet);
const web3 = new Web3();

function prepareHash(cardId, cardPass) {
  return web3.utils.soliditySha3(web3.eth.abi.encodeParameters(['string', 'string'],
    [cardId, cardPass]
  ));
};

const Blockchain = {

  async load(cardId, cardPass) {
    const value = ethers.utils.parseEther(DEFAULT_AMOUNT);
    const hash = prepareHash(cardId, cardPass)
    const tx = await contract.load(hash, value)

    const receipt = await provider.getTransactionReceipt(tx.hash)

    if (receipt.status === 0) {
      console.log('Transaction failed')
      console.log(receipt)
      throw 'Transaction failed'
    } else {
      console.log('Transaction succeeded')
      console.log(receipt)
      return receipt
    }
  },

  async availableAssets() {
    return await contract.getAvailableAssets();
  },

  async unload(cardId, cardPass) {
    const value = ethers.utils.parseEther(DEFAULT_AMOUNT);
    const hash = prepareHash(cardId, cardPass)
    const tx = await contract.unLoad(cardId, cardPass)

    const receipt = await provider.getTransactionReceipt(tx.hash)

    if (receipt.status === 0) {
      console.log('Transaction failed')
      console.log(receipt)
      throw 'Transaction failed'
    } else {
      console.log('Transaction succeeded')
      console.log(receipt)
      return receipt
    }
  }

};

export default Blockchain;

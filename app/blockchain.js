import { ethers } from 'ethers';
import managerContractJson from './contracts/Manager.json';
import Web3 from 'web3';



const MANAGER_CONTRACT_ADDRESS = '0x3a2C96aA949Eec6C44D042eb0eC017f2866d0E8B';
const DEFAULT_AMOUNT = 10;
const ADDRESS = '0xD0e7083A32c61f28CD0d713C47A2611e1c2dadC9';
const PRIVATE_KEY = 'A88259AE882B0A60D82FD00F809078512A1F16285D0ED9824F5C2D516C26EFB3';


const provider = new ethers.providers.JsonRpcProvider('http://157.230.154.5:8046/');
const wallet = (new ethers.Wallet(PRIVATE_KEY)).connect(provider);
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
    const hash = prepareHash(cardId, cardPass)
    const res = await contract.load(hash, DEFAULT_AMOUNT)
    return res
  },

  async unload(cardId, cardPass) {
    const hash = prepareHash(cardId, cardPass);
    const res = await contract.unload(hash, DEFAULT_AMOUNT)
    return res
  }

};

export default Blockchain;

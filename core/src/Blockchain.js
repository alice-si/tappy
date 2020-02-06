import { ethers } from 'ethers'

import managerContractJson from '../build/contracts/Manager.json'

// TODO set it to actual token adress
//TOKEN: 0x9B9e49D6c05AF54c0799D22A7d8DDf326E9b6224
const MANAGER_CONTRACT_ADDRESS = '0xFcc657A33c50de2E927dd27d6ccB6a52f599AC97';

window.ethereum.enable();

const provider = new ethers.providers.Web3Provider(window.web3.currentProvider);

const signer = provider.getSigner();

export default {
  provider,

  contract() {
    return new ethers.Contract(
      MANAGER_CONTRACT_ADDRESS, managerContractJson.abi, signer);
  },

  account() {
    return new Promise((resolve, reject) => {
      window.web3.eth.getAccounts((err, accounts) => {
        if (err) {
          reject(err);
        } else {
          resolve(accounts[0]);
        }
      });
    });
  },

  async getBalance() {
    const balance = await this.contract().getAvailableAssets();
    console.log("Get Manager Balance: " + Number(balance));
    return  Number(balance)

  },

  resetEventsBlock(fromBlock) {
    provider.resetEventsBlock(fromBlock);
  }
}

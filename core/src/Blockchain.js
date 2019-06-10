import { ethers } from 'ethers'

import managerContractJson from '../build/contracts/Manager.json'

// TODO set it to actual token adress
const MANAGER_CONTRACT_ADDRESS = '0xFd21DE119266Fc442cEFF47119B0dB0f530736d6';

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
    //console.log("Getting balance");
    const from = await this.account()
    const balance = await this.contract().getAvailableAssets({ from })
    console.log("get Balance: " + Number(balance));
    return  Number(balance)

  },

  resetEventsBlock(fromBlock) {
    provider.resetEventsBlock(fromBlock);
  }
}

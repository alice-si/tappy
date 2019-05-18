import { ethers } from 'ethers'

import managerContractJson from '../build/contracts/Manager.json'

// TODO set it to actual token adress
const MANAGER_CONTRACT_ADDRESS = '0x3a2C96aA949Eec6C44D042eb0eC017f2866d0E8B';

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
    const from = await this.account()
    //console.log(`Using address: ${from}`)
    return  Number(await this.contract().getAvailableAssets({ from }))


    // TODO alex remove
    // return await (new Promise(function (resolve) {
    //   setTimeout(() => {
    //     resolve(Date.now() % 10000);
    //   }, 1000)
    // }))
  },

  resetEventsBlock(fromBlock) {
    provider.resetEventsBlock(fromBlock);
  }
}

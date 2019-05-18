import { ethers } from 'ethers'

import tokenContractJson from '../build/contracts/Token.json';

// TODO set it to actual token adress
const TOKEN_ADDRESS = '0x0';

window.ethereum.enable();

const provider = new ethers.providers.Web3Provider(window.web3.currentProvider);

const signer = provider.getSigner();

export default {
  provider,

  // async claimReward(choice) {
  //   if (SPENDING_TYPE[choice] === undefined) {
  //     throw new Error(`Unknown reward "${choice}"`);
  //   }
  //   await this.contract().claimOutcome(
  //     await this.getCurrentPeriod(), SPENDING_TYPE[choice], { gasLimit: 2000000 });
  // },

  // async claimMoveOut() {
  //   await this.contract().cashOut();
  // },

  // async onboard(address) {
  //   await this.contract().onboardTenant(address);
  // },

  // async isTenant(address) {
  //   return await this.contract().isActiveTenant(address);
  // },

  // async getSavings(tenantAddress) {
  //   return Number(await this.contract().getSavings(tenantAddress));
  // },

  // async getCurrentPeriod() {
  //   let creationTime = Number(await this.contract().creationTime()) * 1000;
  //   let now = Number(new Date());
  //   return Math.floor((now - creationTime) / (PERIOD_LENGTH * 1000));
  // },

  // account() {
  //   return new Promise((resolve, reject) => {
  //     window.web3.eth.getAccounts((err, accounts) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(accounts[0]);
  //       }
  //     });
  //   });
  // },


  contract() {
    return new ethers.Contract(
      TOKEN_ADDRESS, tokenContractJson.abi, signer);
  },

  resetEventsBlock(fromBlock) {
    provider.resetEventsBlock(fromBlock);
  }
}

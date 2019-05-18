import { ethers } from 'ethers'

import buildingContractJson from '../build/contracts/Building.json';

const SPENDING_TYPE = {
  cash: 0,
  savings: 1
}

const BUILDING_ADDRESS = '0xAb2835503632FE03567f7daAd3a416e2e45C5c97';
const PERIOD_LENGTH = 172800;  // for demo purposes we use 2 days instead of 1 month

window.ethereum.enable();

const provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
const signer = provider.getSigner();

export default {
  provider,

  async claimReward(choice) {
    if (SPENDING_TYPE[choice] === undefined) {
      throw new Error(`Unknown reward "${choice}"`);
    }
    await this.contract().claimOutcome(
      await this.getCurrentPeriod(), SPENDING_TYPE[choice], { gasLimit: 2000000 });
  },

  async claimMoveOut() {
    await this.contract().cashOut();
  },

  async onboard(address) {
    await this.contract().onboardTenant(address);
  },

  async isTenant(address) {
    return await this.contract().isActiveTenant(address);
  },

  async getSavings(tenantAddress) {
    return Number(await this.contract().getSavings(tenantAddress));
  },

  async getCurrentPeriod() {
    let creationTime = Number(await this.contract().creationTime()) * 1000;
    let now = Number(new Date());
    return Math.floor((now - creationTime) / (PERIOD_LENGTH * 1000));
  },

  contract() {
    return new ethers.Contract(
      BUILDING_ADDRESS, buildingContractJson.abi, signer);
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

  resetEventsBlock(fromBlock) {
    provider.resetEventsBlock(fromBlock);
  }
}

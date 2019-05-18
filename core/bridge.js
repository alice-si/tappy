const ethers = require('ethers');
const Blockchains = require('./blockchains.js');

const SOURCE_ADDRESS = '0x55DbDAB581c4D5318901e9e35608444Cc2A3142d'; // User account

const TARGET_ADDRESS = '0x14ABE122Ba65955a892412bbB89F083D100F2Ce5'; // Manager contract (SKALE)


const blockchains = new Blockchains();


blockchains.printBlockNumber('KOVAN');
blockchains.printBlockNumber('SKALE');


async function sync() {
  let kovanBalance = await blockchains.getBalance('KOVAN', SOURCE_ADDRESS);
  console.log("Balance on source: " + ethers.utils.formatEther(kovanBalance));
  let skaleBalance = await blockchains.getSupply('SKALE');
  console.log("Balance on target: " + ethers.utils.formatEther(skaleBalance));
  if (kovanBalance.gt(skaleBalance)) {
    console.log("Source balance is greater, starting syncing...");
    blockchains.mintRaw('SKALE', TARGET_ADDRESS, kovanBalance.sub(skaleBalance));
  } else {
    console.log("Source and target balance in sync, no need for extra action.");
  }
}


setInterval(function() {
  sync();
}, 3000);

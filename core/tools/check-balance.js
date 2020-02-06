const Blockchains = require('../blockchains.js');
const blockchains = new Blockchains();

blockchains.getBalance('SKALE', '0x3EFb85e98bEe793C403f10cc33B3d8a25809b10d').then(function(val) {
  console.log(val.toString());
});

blockchains.checkAvailableAssets();

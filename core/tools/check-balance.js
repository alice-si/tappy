const Blockchains = require('../blockchains.js');
const blockchains = new Blockchains();

blockchains.getBalance('SKALE', '0xFd21DE119266Fc442cEFF47119B0dB0f530736d6').then(function(val) {
  console.log(val.toString());
});

blockchains.checkAvailableAssets();

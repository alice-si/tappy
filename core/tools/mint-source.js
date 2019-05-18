const Blockchains = require('../blockchains.js');

const SOURCE_ADDRESS = '0x55DbDAB581c4D5318901e9e35608444Cc2A3142d';

const blockchains = new Blockchains();

blockchains.mint('KOVAN', SOURCE_ADDRESS, '1.0');

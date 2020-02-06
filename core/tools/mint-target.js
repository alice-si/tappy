const Blockchains = require('../blockchains.js');

const TARGET_ADDRESS = '0xFcc657A33c50de2E927dd27d6ccB6a52f599AC97';

const blockchains = new Blockchains();

blockchains.mint('GANACHE', TARGET_ADDRESS, '100.0');

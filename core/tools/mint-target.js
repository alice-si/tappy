const Blockchains = require('../blockchains.js');

const TARGET_ADDRESS = '0x3EFb85e98bEe793C403f10cc33B3d8a25809b10d';

const blockchains = new Blockchains();

blockchains.mint('SKALE', TARGET_ADDRESS, '1.0');

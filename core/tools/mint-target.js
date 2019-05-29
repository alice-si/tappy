const Blockchains = require('../blockchains.js');

const TARGET_ADDRESS = '0x14ABE122Ba65955a892412bbB89F083D100F2Ce5';

const blockchains = new Blockchains();

blockchains.mint('SKALE', TARGET_ADDRESS, '1.0');

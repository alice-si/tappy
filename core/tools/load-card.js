const Blockchains = require('../blockchains.js');

const CARD_ID = 'card-id';
const SECRET = 'secret';
const LOADER_ADDRESS = '0x55DbDAB581c4D5318901e9e35608444Cc2A3142d';

const blockchains = new Blockchains();

blockchains.load(CARD_ID, SECRET, '1.0', LOADER_ADDRESS);

const Blockchains = require('../blockchains.js');

const CARD_ID = 'card-id';
const SECRET = 'secret';
const UNLOADER_ADDRESS = '0x55DbDAB581c4D5318901e9e35608444Cc2A3142d';

const blockchains = new Blockchains();

blockchains.unLoad(CARD_ID, SECRET, UNLOADER_ADDRESS);

const Blockchains = require('../blockchains.js');

const CARD_ID = 'card-id';
const SECRET = 'secret';

const blockchains = new Blockchains();


blockchains.testHash(CARD_ID, SECRET);

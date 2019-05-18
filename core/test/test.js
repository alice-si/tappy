const BN = require('bn.js');
const chai = require('chai');
const truffleAssert = require('truffle-assertions');

// TODO this file could be converted and used to test our contracts for card id management

const expect =
  chai
  .use(require('chai-as-promised'))
  .use(require('chai-bn')(BN))
  .expect;

const Manager = artifacts.require('Manager');
const Token = artifacts.require('Token');

contract('Building', ([owner, loader, unLoader]) => {

  let token;
  let manager;

  let CARD_ID = "card-id";
  let CARD_PASS = "doggy";

  let prepareHash = function(cardId, cardPass) {
    return web3.utils.soliditySha3(web3.eth.abi.encodeParameters(['string', 'string'],
      [cardId, cardPass]
    ));
  };

  before(async () => {
    token = await Token.new({from: owner});
    manager = await Manager.new(token.address, {from: owner});
  });

  it('should load manager contract', async () => {
    await token.mint(manager.address, 100);

    let available = await manager.getAvailableAssets();

    expect(available).to.be.a.bignumber.that.equals('100');
  });

  it('should add loader account', async () => {
    let isLoaderBefore = await manager.checkIsLoader(loader);
    expect(isLoaderBefore).to.equal(false);

    await manager.addLoader(loader);

    let isLoaderAfter = await manager.checkIsLoader(loader);
    expect(isLoaderAfter).to.equal(true);
  });

  it('should load a card', async () => {
    await manager.load(prepareHash(CARD_ID, CARD_PASS), 10, {from: loader});

    let available = await manager.getAvailableAssets();
    expect(available).to.be.a.bignumber.that.equals('90');
  });

  it('should add unLoader account', async () => {
    let isUnLoaderBefore = await manager.checkIsUnLoader(unLoader);
    expect(isUnLoaderBefore).to.equal(false);

    await manager.addUnLoader(unLoader);

    let isUnLoaderAfter = await manager.checkIsUnLoader(unLoader);
    expect(isUnLoaderAfter).to.equal(true);
  });

  it('should unLoad a card', async () => {
    let unLoaderBefore = await token.balanceOf(unLoader);
    expect(unLoaderBefore).to.be.a.bignumber.that.equals('0');
    let managerBefore = await token.balanceOf(manager.address);
    expect(managerBefore).to.be.a.bignumber.that.equals('100');

    await manager.unLoad(CARD_ID, CARD_PASS, {from: unLoader});

    let unLoaderAfter = await token.balanceOf(unLoader);
    expect(unLoaderAfter).to.be.a.bignumber.that.equals('10');
    let managerAfter = await token.balanceOf(manager.address);
    expect(managerAfter).to.be.a.bignumber.that.equals('90');
  });

});

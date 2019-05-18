const Building = artifacts.require('Building');
const Token = artifacts.require('Token');

module.exports = async function(deployer, _, [owner]) {
  deployer.then(async () => {
    let token = await Token.deployed();
    // TODO implement minting (maybe on owner account)
    // await token.mint(Building.address, 1000, {from: owner});
  });
}

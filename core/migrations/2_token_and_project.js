const Manager = artifacts.require('Manager');
const Token = artifacts.require('Token');

module.exports = async function(deployer, _, [owner]) {
  await deployer.deploy(Token, {from: owner});
  await deployer.deploy(Manager, Token.address, {from: owner});
};

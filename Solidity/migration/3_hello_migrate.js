const hello = artifacts.require("hello");

module.exports = async function(deployer) {
  await deployer.deploy(hello);
};

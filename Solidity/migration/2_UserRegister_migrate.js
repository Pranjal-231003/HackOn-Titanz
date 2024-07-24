const UserRegister = artifacts.require("UserRegistration");

module.exports = async function(deployer) {
  await deployer.deploy(UserRegister);
};

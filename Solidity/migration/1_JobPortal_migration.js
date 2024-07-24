const JobPortal = artifacts.require("JobPortalMangement");

module.exports = async function(deployer) {
  await deployer.deploy(JobPortal);
};

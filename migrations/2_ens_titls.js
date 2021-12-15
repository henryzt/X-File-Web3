const titles = artifacts.require("EnsTitle");

module.exports = function(deployer) {
  deployer.deploy(titles);
};

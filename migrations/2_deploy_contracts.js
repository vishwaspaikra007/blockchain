const PatientData = artifacts.require("PatientData");

module.exports = function(deployer) {
  deployer.deploy(PatientData);
  // deployer.link(ConvertLib, MetaCoin);
  // deployer.deploy(MetaCoin);
};

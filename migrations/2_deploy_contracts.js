const PatientData = artifacts.require("PatientData");
const SaveData = artifacts.require("SaveData");

module.exports = function(deployer) {
  deployer.deploy(PatientData);
  deployer.deploy(SaveData);
  deployer.link(PatientData, SaveData);
  // deployer.deploy(MetaCoin);
};

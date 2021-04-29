pragma solidity 0.5.0;


contract PatientData {
  uint256 public patientCount = 0;
  address public addr = msg.sender;
  mapping(uint => address) public patients;
  mapping(address => PatientBio) public PatientBioList;
  mapping(address => PatientMedicalData) public PatientMedicalList;

  struct PatientBio {
    address id;
    string name;
    string birthDate;
    string phoneNumber;
    string _address; 
  }

  struct PatientMedicalData {
    address id;
    uint weight;
    uint height;
    string bloodGroup;
    string diseaseName;
    string diseaseDescription;
    string diseaseStartedOn;
  }

  constructor() public {
    PatientBioList[0xb3a44ad28ed743eFBd857B57e97480ffCEaee97c] 
      = PatientBio(0xb3a44ad28ed743eFBd857B57e97480ffCEaee97c, "Vishwas Paikra", "1998-09-21T18:30:00.000Z", "1223344556", "hno564 sai chowk avanti nagar east bhilai cg");
    patients[++patientCount] = 0xb3a44ad28ed743eFBd857B57e97480ffCEaee97c;
  }

  function addUpdatePatientBio(
    string memory patientName, 
    string memory birthDate, 
    string memory phoneNumber, 
    string memory _address
    ) public {
    if(PatientBioList[msg.sender].id == address(0x0))
      patients[++patientCount] = msg.sender;
    PatientBioList[msg.sender] = 
      PatientBio(msg.sender, patientName, birthDate, phoneNumber, _address);
  }

  function addUpdatePatientMedicalData(
    uint weight,
    uint height,
    string memory bloodGroup,
    string memory diseaseName,
    string memory diseaseDescription,
    string memory diseaseStartedOn
    ) public {
    if(PatientBioList[msg.sender].id == address(0x0))
    {
      return;
    }
    PatientMedicalList[msg.sender] = 
      PatientMedicalData(msg.sender, weight, height, bloodGroup, diseaseName, diseaseDescription, diseaseStartedOn);
  }
}

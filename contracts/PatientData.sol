pragma solidity 0.5.0;

contract PatientData {
  uint256 public countMedicalReports = 0;
 
  mapping(address => Sender) public senders;
  mapping(uint => PatientMedicalReportStruct) public medicalReports;

  struct PatientBioStruct {
    string name;
    string birthDate;
    string phoneNumber;
    string _address;
    uint medicalReportNo;
  }

  struct PatientMedicalReportStruct {
    address senderId;
    string medReportId;
    uint weight;
    uint height;
    string bloodGroup;
    string diseaseName;
    string diseaseDescription;
    string diseaseStartedOn;
  }

  struct Sender {
    string name;
    string institutionName;
    string institutionCode;
    uint patientCount;
    mapping(uint => string) patientsArray;
    mapping(string => PatientBioStruct) patients;
  }

  constructor() public {
    // addMedicalReport(
    //   "DJX1234KL", 
    //   "Vishwas Paikra", 
    //   "22 sep 1998", "1234567890", 
    //   "hno535 vishal gaon near central park of bhilai cg", 
    //   "MEDREPIDDFG3456KL", 58, 164, 
    //   "B+", "Hypermyopia", 
    //   "Caused by the continuous exposure to harmful blue light", 
    //   "01 mar 2016");
  }

  function addMedicalReport(
    string memory patientId,
    string memory patientName, 
    string memory birthDate, 
    string memory phoneNumber, 
    string memory _address,
    string memory medReportId,
    uint weight,
    uint height,
    string memory bloodGroup,
    string memory diseaseName,
    string memory diseaseDescription,
    string memory diseaseStartedOn
    ) public {
    // uint _hash = uint(keccak256(abi.encodePacked(msg.sender, patientId, medReportId)));
    bytes memory name = bytes(senders[msg.sender].patients[patientId].name); 
    if( name.length == 0)
    {
      senders[msg.sender].patientsArray[senders[msg.sender].patientCount++] = patientId; 
      senders[msg.sender].patients[patientId] = 
        PatientBioStruct(patientName, birthDate, phoneNumber, _address, countMedicalReports);
    
      medicalReports[countMedicalReports++] = 
        PatientMedicalReportStruct(msg.sender,medReportId,  weight, height, bloodGroup, diseaseName, diseaseDescription, diseaseStartedOn);
  
    } else {
      PatientBioStruct memory patientBio = 
        senders[msg.sender].patients[patientId];
      senders[msg.sender].patients[patientId] = 
        PatientBioStruct(patientName, birthDate, phoneNumber, _address, patientBio.medicalReportNo);
      medicalReports[patientBio.medicalReportNo] = 
        PatientMedicalReportStruct(msg.sender, medReportId, weight, height, bloodGroup, diseaseName, diseaseDescription, diseaseStartedOn);
  
    }
    }
  function getPatientsList(uint index) public view returns (
    string memory,
    string memory, 
    string memory, 
    string memory, 
    uint) {
    PatientBioStruct memory patientBio = 
      senders[msg.sender].patients[senders[msg.sender].patientsArray[index]];
    return (
      patientBio.name,
      patientBio.birthDate,
      patientBio.phoneNumber,
      patientBio._address,
      patientBio.medicalReportNo
    );
  }

  // function getMedicalReports() public view returns (Sender memory) {
  //   return (senders["0x021c485F1ba6B95C01Fac6dCf195E1f6c74abFc0"]);
  // }
}

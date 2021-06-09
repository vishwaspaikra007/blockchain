pragma solidity 0.5.0;

contract PatientData {
  uint256 public countMedicalReports = 0;
 
  mapping(address => Sender) public senders;
  mapping(uint => PatientMedicalReportStruct) public medicalReports;

  mapping(uint => string) hashes;
  uint hashCount = 0;

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
}



  // hashes[0] = "da52b2c2cb1f489f33140c4b75a327bf6c0d6f59";
  // hashes[1] = "a76a824ddfe85416fa340580773e4c0f8a166141";
  // hashes[2] = "89315849195a60c41f8486621ec8573dbeb4b016";
  // hashes[3] = "e15789896d995a86e0cb5460d16b2f7923dcb5de";
  // hashes[4] = "664837b1f44f1d613ff380c4027a9d0668d99be6";
  // hashes[5] = "d356b809e19dad4175e45e3ccd0e47e71513bf1a";
  // hashes[6] = "eea5eedbdda51657d9dd4826eba76ed0b22539c4";
  // hashes[7] = "8b0b0653bf3f33fb5f9d04e9c62cd85cbf3e8fcc";
  // hashes[8] = "5dd054b4f6cf6d98a183c35dc08c73aa1a80447a";
  // hashes[9] = "26ddd4f134ef98f49f22742bc5472d413a93fe03";
  
    // addMedicalReport(
    //   "DJX1234KL",
    //   "Vishwas Paikra", 
    //   "22 sep 1998", "1234567890", 
    //   "hno535 vishal gaon near central park of bhilai cg", 
    //   "MEDREPIDDFG3456KL", 58, 164, 
    //   "B+", "Hypermyopia", 
    //   "Caused by the continuous exposure to harmful blue light", 
    //   "01 mar 2016");
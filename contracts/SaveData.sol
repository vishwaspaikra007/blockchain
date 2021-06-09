pragma solidity 0.5.0;

contract SaveData {
  uint public totalMedicalReports = 0;
  mapping(uint => Data) public data;
  mapping(address => Sender) public senders;

  struct Sender {
    uint totalMedicalReports;
    mapping(uint => uint) data;
  }

  struct Data {
    string hashOfOriginalDataString;
    string secondTimeEncryptedString;
    address sender;
    string medReportId;
  }

  function saveData(
    string memory secondTimeEncryptedString,
    string memory hashOfOriginalDataString,
    string memory medReportId
  ) public {
    data[totalMedicalReports].secondTimeEncryptedString = secondTimeEncryptedString;
    data[totalMedicalReports].hashOfOriginalDataString = hashOfOriginalDataString;
    data[totalMedicalReports].sender = msg.sender;
    data[totalMedicalReports].medReportId = medReportId;

    senders[msg.sender].data[senders[msg.sender].totalMedicalReports++] = totalMedicalReports++;
  }
}

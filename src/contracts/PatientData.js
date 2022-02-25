export const PATIENT_DATA_LIST_ADDRESS = "0x9B32A6f4c5e2f8D7179a9987E66cb6A65Ca207f0"
export const PATIENT_DATA_LIST_ABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "countMedicalReports",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x360d0f29"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "senders",
    "outputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "institutionName",
        "type": "string"
      },
      {
        "name": "institutionCode",
        "type": "string"
      },
      {
        "name": "patientCount",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x982fb9d8"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "medicalReports",
    "outputs": [
      {
        "name": "senderId",
        "type": "address"
      },
      {
        "name": "medReportId",
        "type": "string"
      },
      {
        "name": "weight",
        "type": "uint256"
      },
      {
        "name": "height",
        "type": "uint256"
      },
      {
        "name": "bloodGroup",
        "type": "string"
      },
      {
        "name": "diseaseName",
        "type": "string"
      },
      {
        "name": "diseaseDescription",
        "type": "string"
      },
      {
        "name": "diseaseStartedOn",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xa2df7d0b"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor",
    "signature": "constructor"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "patientId",
        "type": "string"
      },
      {
        "name": "patientName",
        "type": "string"
      },
      {
        "name": "birthDate",
        "type": "string"
      },
      {
        "name": "phoneNumber",
        "type": "string"
      },
      {
        "name": "_address",
        "type": "string"
      },
      {
        "name": "medReportId",
        "type": "string"
      },
      {
        "name": "weight",
        "type": "uint256"
      },
      {
        "name": "height",
        "type": "uint256"
      },
      {
        "name": "bloodGroup",
        "type": "string"
      },
      {
        "name": "diseaseName",
        "type": "string"
      },
      {
        "name": "diseaseDescription",
        "type": "string"
      },
      {
        "name": "diseaseStartedOn",
        "type": "string"
      }
    ],
    "name": "addMedicalReport",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x0060d399"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getPatientsList",
    "outputs": [
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xbeedbba9"
  }
]
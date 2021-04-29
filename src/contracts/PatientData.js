export const PATIENT_DATA_LIST_ADDRESS = "0x5913dC00279Ef98A23243F97d2F30B3197871a53"
export const PATIENT_DATA_LIST_ABI = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "PatientMedicalList",
    "outputs": [
      {
        "name": "id",
        "type": "address"
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
    "signature": "0x07ebb5f4"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "addr",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x767800de"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "patients",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x93119a83"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "patientCount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xa0303c41"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "PatientBioList",
    "outputs": [
      {
        "name": "id",
        "type": "address"
      },
      {
        "name": "name",
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
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xfa28ca2a"
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
      }
    ],
    "name": "addUpdatePatientBio",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xaca2169d"
  },
  {
    "constant": false,
    "inputs": [
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
    "name": "addUpdatePatientMedicalData",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xc113a6bc"
  }
]
import { Box, Card, CardContent, Container, Paper } from '@material-ui/core'
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import style from './App.module.css'
import {
  PATIENT_DATA_LIST_ADDRESS,
  PATIENT_DATA_LIST_ABI,
} from './contracts/PatientData'
import {
  SAVE_DATA_LIST_ADDRESS,
  SAVE_DATA_LIST_ABI
} from './contracts/SaveData'
import Add from './routes/Add'
import AddData from './routes/AddData'
import AddMedicalData from './routes/AddMedicalData'
import ShowData from './routes/ShowData'
import CryptoJS from 'crypto-js'
import sendToServerForSecondEncryption from './server/sendToServerForSecondEncryption'

function App() {
  const [web3, setweb3] = useState()
  const [account, setAccount] = useState('')
  const [patientDataList, setPatientDataList] = useState([])
  const [patientDataContract, setPatientDataContract] = useState([])
  const [saveDataContract, setSaveDataContract] = useState([])
  const [patientBioMedList, setPatientBioMedList] = useState([])
  const [patientMedicalDataList, setPatientMedicalDataList] = useState([])
  const [patientBio, setPatientBio] = useState({
    id: 'PATDHCS2001457',
    name: 'Vishwas Paikra',
    birthDate: '22 sep 1998',
    phoneNumber: '1234565432',
    _address: 'flat 320 anand complex vaishali nagar bhilai cg',
  })
  const [patientMedicalData, setPatientMedicalData] = useState({
    medReportId: 'MEDREP' + Math.ceil(Math.random() * 1000000000),
    weight: '158',
    height: '164',
    bloodGroup: 'B+',
    diseaseName: 'Hyper Myopia',
    diseaseDescription:
      'caused by long exposure to harmful artificial blue light',
    diseaseStartedOn: '1 apr 2016',
  })

  useEffect(async () => {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')
    const network = await web3.eth.net.getNetworkType()
    const accounts = await web3.eth.requestAccounts()
    setAccount(accounts[0])
    console.log(accounts[0])
    const patientDataContractCopy = new web3.eth.Contract(
      PATIENT_DATA_LIST_ABI,
      PATIENT_DATA_LIST_ADDRESS,
    )
    const saveDataContractCopy = new web3.eth.Contract(
      SAVE_DATA_LIST_ABI,
      SAVE_DATA_LIST_ADDRESS,
    )
    // console.log('volla', network, accounts, await patientDataContractCopy.methods.patients(0).call())
    setPatientDataContract(patientDataContractCopy)
    setSaveDataContract(saveDataContractCopy)
    // updateList(patientDataContractCopy, accounts[0])
    decryptEncryptedList(saveDataContractCopy)
    console.log(patientDataContractCopy)
    return () => {}
  }, [])

  const updateList = async (patientDataContract, acc) => {
    const senders = await patientDataContract.methods.senders(acc).call()
    // const medicalReports = await patientDataContract.methods.medicalReports(0).call()
    // let countMedicalReports = await patientDataContract.methods
    //   .countMedicalReports()
    //   .call()
    let countMedicalReports = senders.patientCount

    console.log(countMedicalReports)

    let patientBioMedList = []

    for (let i = 0; i < countMedicalReports; ++i) {
      console.log(await patientDataContract.methods.getPatientsList(i).call())
      let patientBio = await patientDataContract.methods
        .getPatientsList(i)
        .call()
      let patientMedicalReport = await patientDataContract.methods
        .medicalReports(parseInt(parseInt(patientBio[4])))
        .call()

      let patientBioMedObj = {
        name: patientBio[0],
        birthDate: patientBio[1],
        phoneNumber: patientBio[2],
        _address: patientBio[3],
        medicalReportNo: patientBio[4],
        senderId: patientMedicalReport.senderId,
        medReportId: patientMedicalReport.medReportId,
        weight: patientMedicalReport.weight,
        height: patientMedicalReport.height,
        bloodGroup: patientMedicalReport.bloodGroup,
        diseaseName: patientMedicalReport.diseaseName,
        diseaseDescription: patientMedicalReport.diseaseDescription,
        diseaseStartedOn: patientMedicalReport.diseaseStartedOn,
      }
      patientBioMedList.push(patientBioMedObj)
    }
    setPatientBioMedList(patientBioMedList)
    console.log(senders, patientBioMedList)
  }

  const decryptEncryptedList = async (saveDataContract) => {
    let patientBioMedList = []

    const totalMedicalReports = await saveDataContract.methods.totalMedicalReports().call()
    for(let i = 0; i < totalMedicalReports; ++i)
    {
      const {
        hashOfOriginalDataString,
        secondTimeEncryptedString,
        sender,
        medReportId
      } = await saveDataContract.methods.data(i).call()
      let firstCiphertext = sendToServerForSecondEncryption
              .decryptSecondCipherText(secondTimeEncryptedString, sender, medReportId)
      let originalDataObject = JSON.parse(CryptoJS.AES.decrypt(firstCiphertext, hashOfOriginalDataString).toString(CryptoJS.enc.Utf8));
      console.log(originalDataObject)
      let rowData = {...originalDataObject.patientBio, ...originalDataObject.patientMedicalData}
      patientBioMedList.push(rowData)
    }
    console.log(patientBioMedList)
    setPatientBioMedList(patientBioMedList)
  }

  // const addUpdatePatientBio = () => {
  //   patientDataContract.methods
  //     .addUpdatePatientBio(
  //       patientBio.name,
  //       patientBio.birthDate,
  //       patientBio.phoneNumber,
  //       patientBio._address,
  //     )
  //     .send({ from: account })
  //     .once('receipt', (receipt) => {
  //       console.log('saved')
  //       updateList(patientDataContract, account)
  //     })
  // }

  const addUpdatePatientMedicalData = () => {
    console.log(patientBio, patientMedicalData)
    // patientDataContract.methods
    //   .addMedicalReport(
    //     patientBio.id,
    //     patientBio.name,
    //     patientBio.birthDate,
    //     patientBio.phoneNumber,
    //     patientBio._address,
    //     patientMedicalData.medReportId,
    //     parseInt(patientMedicalData.weight),
    //     parseInt(patientMedicalData.height),
    //     patientMedicalData.bloodGroup,
    //     patientMedicalData.diseaseName,
    //     patientMedicalData.diseaseDescription,
    //     patientMedicalData.diseaseStartedOn,
    //   )
    //   .send({ from: account })
    //   .once('receipt', (receipt) => {
    //     console.log('saved', receipt)
    //     updateList(patientDataContract, account)
    //   })
    let JSONStringData = JSON.stringify({patientBio, patientMedicalData})
    let hash = CryptoJS.SHA256(JSONStringData).toString(CryptoJS.enc.Hex)
    console.log(hash)
    let firstCiphertext = CryptoJS.AES.encrypt(JSONStringData, hash).toString();
    console.log(firstCiphertext)
    let secondCiphertext = sendToServerForSecondEncryption.encryptFirstCipherText(firstCiphertext, account, patientMedicalData.medReportId)
    console.log(secondCiphertext)
    saveDataContract.methods
      .saveData(secondCiphertext, hash, patientMedicalData.medReportId).send({ from: account})
      .once('receipt', receipt => {
        console.log('saved', receipt)
        // updateList(patientDataContract, account)
    setPatientMedicalData({...patientMedicalData, medReportId: 'MEDREP' + Math.ceil(Math.random() * 1000000000)})
    decryptEncryptedList(saveDataContract)
      })
  }

  return (
    <Container maxWidth="md" className={style.container}>
      <Add
        patientBio={patientBio}
        setPatientBio={(obj) => setPatientBio(obj)}
        // addUpdatePatientBio={addUpdatePatientBio}
        patientMedicalData={patientMedicalData}
        setPatientMedicalData={(obj) => setPatientMedicalData(obj)}
        addUpdatePatientMedicalData={addUpdatePatientMedicalData}
      />
      <ShowData patientBioMedList={patientBioMedList} />
    </Container>
  )
}

export default App

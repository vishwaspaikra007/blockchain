import { Box, Card, CardContent, Container, Paper } from '@material-ui/core'
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import style from './App.module.css'
import {
  PATIENT_DATA_LIST_ADDRESS,
  PATIENT_DATA_LIST_ABI,
} from './contracts/PatientData'
import Add from './routes/Add'
import AddData from './routes/AddData'
import AddMedicalData from './routes/AddMedicalData'
import ShowData from './routes/ShowData'

function App() {
  const [web3, setweb3] = useState()
  const [account, setAccount] = useState('')
  const [patientDataList, setPatientDataList] = useState([])
  const [patientDataContract, setPatientDataContract] = useState([])
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
    medReportId: 'MEDREP20015638',
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
    // console.log('volla', network, accounts, await patientDataContractCopy.methods.patients(0).call())
    setPatientDataContract(patientDataContractCopy)
    updateList(patientDataContractCopy, accounts[0])
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
    // patientDataContract.methods
    //   .addUpdatePatientMedicalData(
    //     parseInt(patientMedicalData.weight),
    //     parseInt(patientMedicalData.height),
    //     patientMedicalData.bloodGroup,
    //     patientMedicalData.diseaseName,
    //     patientMedicalData.diseaseDescription,
    //     patientMedicalData.diseaseStartedOn
    //   ).send({ from: account })
    //   .once('receipt', (receipt) => {
    //     console.log('saved')
    //     updateList(patientDataContract)
    //   })
    console.log(patientBio, patientMedicalData)
    patientDataContract.methods
      .addMedicalReport(
        patientBio.id,
        patientBio.name,
        patientBio.birthDate,
        patientBio.phoneNumber,
        patientBio._address,
        patientMedicalData.medReportId,
        parseInt(patientMedicalData.weight),
        parseInt(patientMedicalData.height),
        patientMedicalData.bloodGroup,
        patientMedicalData.diseaseName,
        patientMedicalData.diseaseDescription,
        patientMedicalData.diseaseStartedOn,
      )
      .send({ from: account })
      .once('receipt', (receipt) => {
        console.log('saved')
        updateList(patientDataContract, account)
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

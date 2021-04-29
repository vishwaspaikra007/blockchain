import { Box, Card, CardContent, Container, Paper } from '@material-ui/core'
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import style from './App.module.css'
import {
  PATIENT_DATA_LIST_ADDRESS,
  PATIENT_DATA_LIST_ABI,
} from './contracts/PatientData'
import AddData from './routes/AddData'
import AddMedicalData from './routes/AddMedicalData'
import ShowData from './routes/ShowData'

function App() {
  const [web3, setweb3] = useState()
  const [account, setAccount] = useState('')
  const [patientDataList, setPatientDataList] = useState([])
  const [patientDataContract, setPatientDataContract] = useState([])
  const [patientBioList, setPatientBioList] = useState([])
  const [patientBio, setPatientBio] = useState({
    name: '',
    birthDate: Date(),
    phoneNumber: '',
    _address: '',
  })
  const [patientMedicalData, setPatientMedicalData] = useState({
    weight: '',
    height: '',
    bloodGroup: '',
    diseaseName: '',
    diseaseDescription: '',
    diseaseStartedOn: Date(),
  })

  useEffect(async () => {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')
    const network = await web3.eth.net.getNetworkType()
    const accounts = await web3.eth.requestAccounts()
    setAccount(accounts[0])

    const patientDataContractCopy = new web3.eth.Contract(
      PATIENT_DATA_LIST_ABI,
      PATIENT_DATA_LIST_ADDRESS,
    )
    // console.log('volla', network, accounts, await patientDataContractCopy.methods.patients(0).call())
    setPatientDataContract(patientDataContractCopy)
    updateList(patientDataContractCopy)
    return () => {}
  }, [])

  const updateList = async (patientDataContract) => {
    const patientCount = await patientDataContract.methods.patientCount().call()
    const patientBioListCopy = []
    for (let i = 1; i <= patientCount; ++i) {
      let address = await patientDataContract.methods.patients(i).call()
      patientBioListCopy.push(
        await patientDataContract.methods.PatientBioList(address).call(),
      )
    }
    setPatientBioList(patientBioListCopy)
    console.log(patientBioListCopy)
  }

  const addUpdatePatientBio = () => {
    patientDataContract.methods
      .addUpdatePatientBio(
        patientBio.name,
        patientBio.birthDate,
        patientBio.phoneNumber,
        patientBio._address
      ).send({ from: account })
      .once('receipt', (receipt) => {
        console.log('saved')
        updateList(patientDataContract)
      })
  }

  const addUpdatePatientMedicalData = () => {
    patientDataContract.methods
      .addUpdatePatientMedicalData(
        patientBio.weight,
        patientBio.height,
        patientBio.bloodGroup,
        patientBio.diseaseName,
        patientBio.diseaseDescription,
        patientBio.diseaseStartedOn
      ).send({ from: account })
      .once('receipt', (receipt) => {
        console.log('saved')
        updateList(patientDataContract)
      })
  }

  return (
    <Container
      maxWidth="md"
      className={style.container}
    >
      {/* <div className="container">Hello World</div>
      <p>Account No : {account}</p> */}
      <AddData
        patientBio={patientBio}
        setPatientBio={(obj) => setPatientBio(obj)}
        addUpdatePatientBio={addUpdatePatientBio}
      />
      <AddMedicalData
        patientMedicalData={patientMedicalData}
        setPatientMedicalData={(obj) => setPatientMedicalData(obj)}
        addUpdatePatientMedicalData={addUpdatePatientMedicalData}
      />
      <ShowData patientBioList={patientBioList} />
    </Container>
  )
}

export default App

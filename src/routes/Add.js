import React, { useRef, useEffect } from 'react'
import AddData from './AddData'
import AddMedicalData from './AddMedicalData'
import style from './AddData.module.css'
import { Card } from '@material-ui/core'

export default function Add(props) {
    const cardRef = useRef()
  const {
    patientBio,
    setPatientBio,
    addUpdatePatientBio,
    patientMedicalData,
    setPatientMedicalData,
    addUpdatePatientMedicalData,
  } = props

  useEffect(() => {
    if(cardRef.current.scrollLeft > 0)
    window.addEventListener('resize', correctPosition)
    return () => {
      window.removeEventListener('resize', correctPosition)
    }
  }, [])

  const correctPosition = () => {
    cardRef.current.scrollTo(cardRef.current.scrollWidth/2,0)
  }

  const next = () => {
    cardRef.current.scrollBy(1000000,0)
  }
  const handleBack = () => {
    console.log(cardRef.current.scrollWidth)
    cardRef.current.scrollTo(0,0)
}
  return (
    <div>
      <Card className={style.cardsContainer} ref={cardRef}>
      <AddData
        patientBio={patientBio}
        setPatientBio={(obj) => setPatientBio(obj)}
        addUpdatePatientBio={addUpdatePatientBio}
        next={next}
      />
      <AddMedicalData
        patientMedicalData={patientMedicalData}
        setPatientMedicalData={(obj) => setPatientMedicalData(obj)}
        addUpdatePatientMedicalData={addUpdatePatientMedicalData}
        handleBack={handleBack}
      />
      </Card>
    </div>
  )
}

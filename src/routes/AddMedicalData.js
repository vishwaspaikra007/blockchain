import { Box, Button, Card, Container, Grid, InputAdornment, TextField } from '@material-ui/core'
import { KeyboardDatePicker } from '@material-ui/pickers'
import React, { useState } from 'react'
import style from './AddData.module.css'

export default function AddMedicalData(props) {
  const {
    patientMedicalData,
    setPatientMedicalData,
    addUpdatePatientMedicalData,
  } = props

  const handleChange = (e) => {
    if (
      patientMedicalData.weight == '' ||
      patientMedicalData.height == '' ||
      patientMedicalData.bloodGroup == '' ||
      patientMedicalData.diseaseName == '' ||
      patientMedicalData.diseaseDescription == '' ||
      patientMedicalData.diseaseStartedOn == ''
    ) {
      alert('all fields are required')
      return
    }
    if (window.confirm('Are you sure that you want to save this data')) {
      addUpdatePatientMedicalData()
    }
  }

  const as = (e) => {
    console.log(e._d.toString())
    if(e && e._d)
    setPatientMedicalData({ ...patientMedicalData, diseaseStartedOn: e._d.toString() })
  }
  return (
    <div>
      <Card className={style.card}>
        <h2 className={style.h2}>Patient Medical Data</h2>
        <form className={style.form} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Weight"
            variant="outlined"
            value={patientMedicalData.weight}
            InputProps={{
                endAdornment: <InputAdornment position="end">Kilograms</InputAdornment>,
              }}
            onChange={(e) =>
              setPatientMedicalData({ ...patientMedicalData, weight: e.target.value })
            }
          />
          <TextField
            id="outlined-basic"
            label="Height"
            variant="outlined"
            value={patientMedicalData.height}
            InputProps={{
                endAdornment: <InputAdornment position="end">centimeters</InputAdornment>,
              }}
            onChange={(e) =>
              setPatientMedicalData({ ...patientMedicalData, height: e.target.value })
            }
          />
          <TextField
            id="outlined-basic"
            label="Blood Group"
            variant="outlined"
            value={patientMedicalData.bloodGroup}
            onChange={(e) =>
              setPatientMedicalData({ ...patientMedicalData, bloodGroup: e.target.value })
            }
          />
          <TextField
            id="outlined-basic"
            label="Disease Name"
            variant="outlined"
            value={patientMedicalData.diseaseName}
            onChange={(e) =>
              setPatientMedicalData({ ...patientMedicalData, diseaseName: e.target.value })
            }
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Disease Started On"
            format="DD/MM/yyyy"
            value={patientMedicalData.diseaseStartedOn}
            // variant="inline"
            inputVariant="outlined"
            onChange={(e) => as(e)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            value={patientMedicalData.diseaseDescription}
            multiline
            rows={2}
            onChange={(e) =>
              setPatientMedicalData({ ...patientMedicalData, diseaseDescription: e.target.value })
            }
          />
          <Button className={style.btn} onClick={(e) => handleChange()}>
            Save
          </Button>
        </form>
      </Card>
    </div>
  )
}

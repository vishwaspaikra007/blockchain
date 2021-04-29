import { Box, Button, Card, Container, Grid, InputAdornment, TextField } from '@material-ui/core'
import { KeyboardDatePicker } from '@material-ui/pickers'
import React, { useState } from 'react'
import style from './AddData.module.css'

export default function AddData(props) {
  const {
    patientBio,
    setPatientBio,
    patientMedicalInfo,
    setPatientMedicalInfo,
    addUpdatePatientBio,
  } = props

  const handleChange = (e) => {
    if (
      patientBio.name == '' ||
      patientBio.phoneNumber == '' ||
      patientBio._address == '' ||
      patientBio.birthday == ''
    ) {
      alert('all fields are required')
      return
    }
    if (window.confirm('Are you sure that you want to save this data')) {
      addUpdatePatientBio()
    }
  }

  const as = (e) => {
    console.log(e._d.toString())
    if(e && e._d)
    setPatientBio({ ...patientBio, birthDate: e._d.toString() })
  }
  return (
    <div>
      <Card className={style.card}>
        <h2 className={style.h2}>Patient Bio Data</h2>
        <form className={style.form} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={patientBio.name}
            onChange={(e) =>
              setPatientBio({ ...patientBio, name: e.target.value })
            }
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Birth-date"
            format="DD/MM/yyyy"
            value={patientBio.birthDate}
            // variant="inline"
            inputVariant="outlined"
            onChange={(e) => as(e)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <TextField
            id="outlined-basic"
            label="PhoneNumber"
            variant="outlined"
            value={patientBio.phoneNumber}
            InputProps={{
              startAdornment: <InputAdornment position="start">+91</InputAdornment>,
            }}
            onChange={(e) =>
              setPatientBio({ ...patientBio, phoneNumber: e.target.value })
            }
          />
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            value={patientBio._address}
            onChange={(e) =>
              setPatientBio({ ...patientBio, _address: e.target.value })
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

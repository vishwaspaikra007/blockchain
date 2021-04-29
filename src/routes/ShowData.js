import React, { useState } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import style from './AddData.module.css'
import style2 from './ShowData.module.css'
import { Card } from '@material-ui/core'

export default function ShowData(props) {
  const { patientBioList } = props

  const formatDate = (birthDate) => {
    const date = birthDate.getDate()
    const month = birthDate.getMonth()
    const year = birthDate.getFullYear()
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()
    const currentDate = new Date().getDate()
    let age = currentYear - year
    age = currentDate >= date && currentMonth >= month ? age : age - 1

    return `${date}/${month + 1}/${year} ${age}yrs`
  }
  return (
    <div>
      <Card className={style2.card}>
        <h2 className={style.h2}>Patient's Medical Data</h2>
        <TableContainer component={Paper}>
          <Table className={style.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sno.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Birt Date</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patientBioList.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{formatDate(new Date(row.birthDate))}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell>{row._address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  )
}

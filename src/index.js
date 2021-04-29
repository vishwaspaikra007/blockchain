import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import moment from "moment"

ReactDOM.render(
  // <React.StrictMode>
    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
      <App />
    </MuiPickersUtilsProvider>
  // </React.StrictMode>
  ,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

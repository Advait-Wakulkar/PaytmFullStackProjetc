import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter, Routes, Route} from "react-router"
import Signup from './components/Signup.jsx'
import Signin from './components/Signin.jsx'
import SendMoney from './components/SendMoney.jsx'
import Dashboard from './components/Dashboard.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/signin' element={<Signin></Signin>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='/send' element={<SendMoney></SendMoney>}></Route>
      </Routes>
    </BrowserRouter>
    <App />
  </React.StrictMode>,
)

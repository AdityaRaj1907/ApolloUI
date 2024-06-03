import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Login.jsx' 
import LandingPage from './LandingPage.jsx'
import SeriesDescriptionPage from './SeriesDescriptionPage.jsx'
import ScannerListPage from './ScannerListPage.jsx'
import { BrowserRouter,Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <Login />
  //   <LandingPage />
  // </React.StrictMode>,

  
<BrowserRouter>


<Routes>

  <Route path='/' element={<Login></Login>} />
  <Route path='/landing' element={<LandingPage></LandingPage>} />
  <Route path='/series-description' element={<SeriesDescriptionPage></SeriesDescriptionPage>} />
  <Route path='/scanner-list' element={<ScannerListPage></ScannerListPage>} />

  




</Routes>


</BrowserRouter>
)



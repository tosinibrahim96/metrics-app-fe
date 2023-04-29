import {Container} from '@mui/material';
import {CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "@/pages/navbar";
import Dashboard from "@/pages/dashboard";
import CreateMetric from './pages/create-metric';


function App() {

  return (
    <div className='app'>
      <BrowserRouter>
          <CssBaseline />
          <Container>
            <Navbar />
            <Routes>
              <Route 
              path='/' element={<Dashboard/>}/>
              <Route 
              path='/new-metric' element={<CreateMetric/>}/>
            </Routes>
          </Container>
      </BrowserRouter>
      
    </div>
  )
}

export default App

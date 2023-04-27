import {createTheme} from '@mui/material/styles';
import {Container} from '@mui/material';
import {themeSettings} from './theme';
import {useMemo} from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "@/pages/navbar";
import Dashboard from "@/pages/dashboard";
import CreateMetric from './pages/create-metric';


function App() {

  const theme = useMemo(() => createTheme(themeSettings), [])

  return (
    <div className='app'>
      <BrowserRouter>
        {/* <ThemeProvider theme={theme}> */}
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
        {/* </ThemeProvider> */}
      </BrowserRouter>
      
    </div>
  )
}

export default App

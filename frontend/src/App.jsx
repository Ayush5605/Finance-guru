import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import  Signup from './pages/signup.jsx';
import Login from './pages/Login.jsx';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Dashboard from './components/layouts/dashboard.jsx';
import DashboardPage from './pages/dashboardPage';


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>

      <Route path="/dashboard"
      element={
        <Dashboard>
          <DashboardPage/>
        </Dashboard>
      }
      />
      </Routes>
    </BrowserRouter>
   
  )
}

export default App

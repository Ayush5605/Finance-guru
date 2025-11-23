import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import  Signup from './pages/signup.jsx';
import Login from './pages/Login.jsx';
import {BrowserRouter,Routes,Route} from 'react-router-dom';


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
   
  )
}

export default App

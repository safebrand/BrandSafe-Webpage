import { Route, Routes } from 'react-router-dom'
import './index.css'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

function App() {

  return (
    <>
      <Routes>
        <Route   path='/login' element={<Login />} />
        <Route   path='/signup' element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App

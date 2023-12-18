import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import VerifyEmail from './pages/VerifyEmail'

function App() {

  return (
    <>
      <Routes>
        <Route index path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/verify-email/:token' element={<VerifyEmail />} />
      </Routes>
    </>
  )
}

export default App

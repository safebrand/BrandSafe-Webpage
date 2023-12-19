import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import VerifyEmail from './pages/VerifyEmail'
import AfterLoginLayout from './componets/layout/AfterLoginLayout'
import DashBoard from './pages/user/DashBoard'
import AddOrganization from './pages/user/AddOrganization'

function App() {

  return (
    <>
      <Routes>
        <Route index path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/verify-email/:token' element={<VerifyEmail />} />


        <Route path='/addOrganization' element={<AddOrganization />} />
        <Route path='/' element={<AfterLoginLayout />}>
          <Route path='dashboard' element={<DashBoard />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import VerifyEmail from './pages/VerifyEmail'
import AfterLoginLayout from './componets/layout/AfterLoginLayout'
import DashBoard from './pages/user/DashBoard'
import AddOrganization from './pages/user/AddOrganization'
import Profile from './pages/user/Profile'
import PageNotFound from './pages/PageNotFound'
import SimilarDomainDetails from './pages/user/similarDomainDetails'

function App() {

  return (
    <>
      <Routes>
        <Route index path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/verify-email/:token' element={<VerifyEmail />} />
        <Route path='*' element={<PageNotFound />} />


        <Route path='/addOrganization' element={<AddOrganization />} />
        <Route path='/' element={<AfterLoginLayout />}>
          <Route path='dashboard' element={<DashBoard />} />
          <Route path='dashboard/:uuid' element={<SimilarDomainDetails />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

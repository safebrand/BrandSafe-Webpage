import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import VerifyEmail from "./pages/VerifyEmail";
import AfterLoginLayout from "./componets/layout/AfterLoginLayout";
import DashBoard from "./pages/user/DashBoard";
import AddOrganization from "./pages/user/AddOrganization";
import Profile from "./pages/user/Profile";
import PageNotFound from "./pages/PageNotFound";
import SimilarDomainDetails from "./pages/user/SimilarDomainDetails";
import AdminLayout from "./componets/layout/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AfterAdminLoginLayout from "./componets/layout/AfterAdminLoginLayout";
import Organization from "./pages/admin/Organization";
import OrganizationDetails from "./pages/admin/OrganizationDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="*" element={<PageNotFound />} />

        <Route path="/addOrganization" element={<AddOrganization />} />

        <Route path="/" element={<AfterLoginLayout />}>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="dashboard/:uuid" element={<SimilarDomainDetails />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route index path="/admin/auth" element={<AdminLogin />} />
        {/* Assuming you want to nest AfterLoginLayout within AdminLayout for specific routes */}
        <Route path="admin" element={<AfterAdminLoginLayout />}>
          <Route path="dashboard" element={<Organization />} />
          <Route path="organization/:uuid" element={<OrganizationDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

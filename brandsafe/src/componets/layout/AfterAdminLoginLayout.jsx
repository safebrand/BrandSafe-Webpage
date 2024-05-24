import React, { useEffect, useState } from "react";
import AfterLoginNavbar from "../navbar/AfterLoginNavbar";
import User from "../sidebar/User";
import { useSelector } from "react-redux";
import Admin from "../sidebar/Admin";
import { useNavigate } from "react-router-dom";

const AfterAdminLoginLayout = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const user = useSelector((state) => state?.persistedReducer.user);

  useEffect(() => {
    if (!user?.id) {
      navigate("/admin/auth");
    }
  },[user]);

  return (
    <>
      <AfterLoginNavbar open={open} setOpen={setOpen} />
      <Admin open={open} setOpen={setOpen} />
    </>
  );
};

export default AfterAdminLoginLayout;

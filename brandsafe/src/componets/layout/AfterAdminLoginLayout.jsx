import React, { useEffect, useState } from "react";
import AfterLoginNavbar from "../navbar/AfterLoginNavbar";
import User from "../sidebar/User";
import { useSelector } from "react-redux";
import Admin from "../sidebar/Admin";

const AfterAdminLoginLayout = () => {
  const [role, setRole] = useState();
  const [user, setUser] = useState();
  const [open, setOpen] = useState(true);


  return (
    <>
      <AfterLoginNavbar open={open} setOpen={setOpen} />
      <Admin open={open} setOpen={setOpen} />
    </>
  );
};

export default AfterAdminLoginLayout;

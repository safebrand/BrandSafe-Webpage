import React from "react";
import Logo from "../componets/Logo";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const ContactUs = () => {
  return (
    <>
      <div className="container items-center">
        <div>
          <Logo />
        </div>
        <div>
          <h2 className="text-sky-500 text-[68px] font-bold">Contact</h2>
          <p className="text-2xl font-[300]">If any query</p>
          <br />
          <p className="text-gray-400">
            Email:{" "}
            <a
              href="mailto:contact@brandsafe.com"
              className="text-2xl text-sky-500"
            >
              contact@brandsafe.com
            </a>
            <br />
            <br />
            Phone:{" "}
            <a href="tel:+91 0000000000" className="text-2xl text-sky-500">
              +91 0000000000
            </a>
          </p>
          <Link to="/">
            {" "}
            <Button>Back to Home page</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ContactUs;

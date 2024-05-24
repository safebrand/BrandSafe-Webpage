import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import Loading from "../../componets/Loading";
import Logo from "../../componets/Logo";
import { SERVER } from "../../config/api";

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const submitLogin = (data) => {
    setLoading(true);
    axios
      .post(`${SERVER}/user/login`, { ...data, admin: true })
      .then((res) => {
        const user = res.data?.data?.user;
        if (location.pathname?.includes("/admin")) {
          user.isAdmin
            ? navigate("/admin/dashboard")
            : toast.error("Invalid user");
        } else {
          user?.organizationName
            ? navigate("/dashboard")
            : navigate("/addOrganization");
        }
        setLoading(false);
        dispatch(setUser(user));
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };

  if (loading) {
    return <Loading loading={loading} />;
  }

  return (
    <>
      <title>Admin Login| Brand Safe </title>
      <div className="container theme-color">
        <div className="flex flex-col gap-8 items-center justify-center">
          <Logo />
          <p className="text-lg md:text-2xl font-normal md:font-medium flex text-center md:text-left">
            Protecting brands from frauds across the globe
          </p>
        </div>
        <div className="my-8 flex flex-col gap-10 px-4 md:px-80">
          <h2 className="text-4xl font-semibold">Login</h2>
          <form
            onSubmit={handleSubmit(submitLogin)}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-[50%]">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  name="email"
                  sx={{ width: "100%" }}
                  {...register("email", {
                    required: "Email is required.",
                  })}
                  error={!!errors.email?.message}
                  helperText={
                    errors.email?.message ? errors?.email.message : ""
                  }
                />
              </div>
              <div className="relative w-full md:w-[50%]">
                <TextField
                  id="outlined-basic1"
                  label="Password"
                  sx={{ width: "100%" }}
                  variant="outlined"
                  name="password"
                  {...register("password", {
                    required: "Password is required.",
                  })}
                  type={showPassword ? "text" : "password"}
                  error={!!errors.password?.message}
                  helperText={
                    errors.password?.message ? errors?.password.message : ""
                  }
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-4"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </div>
              </div>
            </div>
            <div className="relative">
              <Link to="/forgotPassword">
                <h1 className="absolute -top-4 right-0 text-[#EB3434] text-center hover:underline">
                  Forgot Password?
                </h1>
              </Link>
            </div>
            {/* <Link to="/signup">
              <h1 className="text-black  ">
                New to Brand Safe?{" "}
                <span className="text-blue-800 hover:underline">Signup</span>
              </h1>
            </Link> */}
            <button className="primary-button">Proceed</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;

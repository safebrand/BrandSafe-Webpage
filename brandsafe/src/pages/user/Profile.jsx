import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { SERVER } from "../../config/api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/slices/userSlice";

const Profile = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm({ mode: "all" });
  const [type, setType] = useState("account");
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const user = useSelector((state) => state?.persistedReducer.user);

  const changePassword = (data) => {
    axios
      .post(`${SERVER}/user/change-password/${user.id}`, data)
      .then((res) => {
        toast.success("Password updated successfully");
        setType("account");
        reset();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      });
  };

  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("name", user.organizationName);
    }
  });

  const handleProfile = (data) => {
    if (data.firstName !== user.firstName || data.lastName !== user.lastName) {
      axios
        .put(`${SERVER}/user/${user.id}`, {
          firstName: data.firstName,
          lastName: data.lastName,
        })
        .then((res) => {
          toast.success("User data updated");
          dispatch(
            updateUser({ firstName: data.firstName, lastName: data.lastName })
          );
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } else if (data.name !== user.organizationName) {
      axios
        .put(`${SERVER}/organization/by-uuid/${user.organizationId}`, {
          name: data.name,
        })
        .then((res) => {
          toast.success("Organization name Updated");
          dispatch(updateUser({ name: data.name }));
          setEdit(false);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  };

  return (
    <>
      <title>Profile | Brand Safe </title>
      <div className="flex flex-col gap-4 h-full">
        <div className="mx-10 md:text-2xl">Profile</div>
        <div className="mx-10 mb-10 flex flex-col md:flex-row gap-10">
          <div className="flex flex-col gap-4">
            <div
              onClick={() => setType("account")}
              className={`ring-1 ${
                type === "account"
                  ? "shadow-lg bg-sky-50"
                  : "shadow-md bg-sky-50/30"
              } ring-gray-300 px-4 py-2 rounded-md  cursor-pointer hover:bg-sky-50/80`}
            >
              <h2 className="text-xl font-semibold">Account Setting</h2>
              <p className="text-gray-400 font-[300]">
                Details about your personal information
              </p>
            </div>
            <div
              onClick={() => setType("password")}
              className={`ring-1 ${
                type === "password"
                  ? "shadow-lg bg-sky-50"
                  : "shadow-md bg-sky-50/30"
              } ring-gray-300 px-4 py-2 rounded-md  cursor-pointer hover:bg-sky-50/80`}
            >
              <h2 className="text-xl font-semibold">Password & Security</h2>
              <p className="text-gray-400 font-[300]">Change your password</p>
            </div>
          </div>
          <div className="w-full md:w-[70%] ring-1 ring-gray-300 shadow-lg rounded-md">
            {type === "account" ? (
              <form
                className="p-4 flex flex-col gap-4"
                onSubmit={handleSubmit(handleProfile)}
              >
                <h2 className="text-xl">Personal Information</h2>
                <div className="flex flex-col md:flex-row gap-4">
                  <TextField
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    name="firstName"
                    sx={{ width: "100%" }}
                    {...register("firstName", {
                      required: "firstName is required.",
                    })}
                    disabled={!edit}
                    error={!!errors.firstName?.message}
                    helperText={
                      errors.firstName?.message ? errors?.firstName.message : ""
                    }
                  />
                  <TextField
                    id="outlined-basic1"
                    label="Last Name"
                    variant="outlined"
                    name="lastName"
                    sx={{ width: "100%" }}
                    {...register("lastName", {
                      required: "lastName is required.",
                    })}
                    disabled={!edit}
                    error={!!errors.lastName?.message}
                    helperText={
                      errors.lastName?.message ? errors?.lastName.message : ""
                    }
                  />
                </div>
                <h2 className="text-xl mt-4">Organization Information</h2>
                <TextField
                  id="outlined-basic2"
                  label="Organization Name"
                  variant="outlined"
                  name="orgName"
                  sx={{ width: "100%" }}
                  {...register("name", {
                    required: "Organization Name is required.",
                  })}
                  disabled={!edit}
                  error={!!errors.lastName?.message}
                  helperText={
                    errors.lastName?.message ? errors?.lastName.message : ""
                  }
                />
                {edit ? (
                  <div className="flex gap-4">
                    <button className="primary-button">Update Details</button>{" "}
                    <div
                      className="cancel-button"
                      onClick={() => setEdit(false)}
                    >
                      Cancel
                    </div>
                  </div>
                ) : (
                  <div
                    className="primary-button cursor-pointer text-center"
                    onClick={() => setEdit(true)}
                  >
                    Edit Personal Details
                  </div>
                )}
              </form>
            ) : (
              <div className="p-4 flex flex-col gap-8 md:w-[50%]">
                <h2 className="text-xl">Change password</h2>
                <form
                  action=""
                  className="flex flex-col gap-4"
                  onSubmit={handleSubmit(changePassword)}
                >
                  <TextField
                    label="Current Password"
                    variant="outlined"
                    type={isVisible ? "text" : "password"}
                    {...register("currentPassword", {
                      required: "Current Password is required.",
                    })}
                    error={!!errors.currentPassword}
                    helperText={errors.currentPassword?.message}
                  />
                  <TextField
                    label="New Password"
                    variant="outlined"
                    type={isVisible ? "text" : "password"}
                    {...register("newPassword", {
                      required: "New Password is required.",
                      minLength: {
                        value: 6,
                        message: "New Password Must be above 6 characters.",
                      },
                      maxLength: {
                        value: 16,
                        message:
                          "New Password Must be less than 16 characters.",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})/,
                        message:
                          "Must contain 1 UpperCase, 1 LowerCase, 1 Number ,1 Special char",
                      },
                    })}
                    error={!!errors.newPassword}
                    helperText={errors.newPassword?.message}
                    InputProps={{
                      endAdornment: (
                        <span onClick={() => setIsVisible(!isVisible)}>
                          {errors.password && isVisible ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </span>
                      ),
                    }}
                  />
                  <TextField
                    label="Confirm Password"
                    variant="outlined"
                    type={isVisible ? "text" : "password"}
                    {...register("cPassword", {
                      required: "Confirm password is required.",
                      validate: (value) => {
                        const { newPassword } = getValues();
                        return (
                          newPassword === value || "Passwords should match!"
                        );
                      },
                    })}
                    error={!!errors.cPassword}
                    helperText={errors.cPassword?.message}
                  />
                  <button className="primary-button">Change Password</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

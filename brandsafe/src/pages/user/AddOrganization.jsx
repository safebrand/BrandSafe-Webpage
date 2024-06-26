import React, { useEffect, useState } from "react";
import Logo from "../../componets/Logo";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { SERVER } from "../../config/api";
import { toast } from "react-toastify";
import Domains from "../../componets/Domains";
import AddURL from "../../componets/addModel/AddURL";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/slices/userSlice";

const AddOrganization = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "all" });
  const [apiSuccess, setApiSuccess] = useState(false);
  const [organization, setOrganization] = useState([]);
  const user = useSelector((state) => state?.persistedReducer.user);
  const [open, setOpen] = useState(false);
  const [apiDomainSuccess, setApiDomainSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${SERVER}/organization/user/${user?.id}`)
      .then((res) => {
        if (res.data) {
          const organization = res.data.data;
          console.log("orgs", organization);
          dispatch(
            updateUser({
              organizationName: organization?.name,
              organizationId: organization.uuid,
            })
          );
          setOrganization(organization);
        }
        reset();
      })
      .catch((err) => {
        if (err.response.data.message !== "Organization not found") {
          toast.error(err.response.data.message);
        }
        console.log(err);
      });
  }, [apiSuccess]);

  console.log(organization);

  const addCompany = (data) => {
    axios
      .post(`${SERVER}/organization`, { ...data, ...{ userId: user?.id } })
      .then((res) => {
        setApiSuccess(!apiSuccess);
        toast.success(res.data.message);
        setOrganization(res.data.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <>
      <title>Add organization | Brand Safe </title>
      <div className="container bg-theme-color">
        <div className="md:flex gap-5 px-4 lg:px-20 items-center md:divide-x-2 divide-sky-300">
          <div className="md:w-[40%]">
            <Logo />
            <p className="text-lg md:text-2xl font-normal md:font-medium flex text-center md:text-left">
              Protecting brands from frauds across the globe
            </p>
          </div>
          <div className="md:pl-10 flex flex-col gap-10 md:w-[50%] py-10">
            <h3 className="text-2xl">
              {!organization.id
                ? "Enter your company's details"
                : "Your Company details"}
            </h3>
            {!organization.id ? (
              <form
                action=" "
                className="flex flex-col gap-4 "
                onSubmit={handleSubmit(addCompany)}
              >
                <TextField
                  id="outlined-basic"
                  label="Company name *"
                  variant="outlined"
                  name="email"
                  sx={{ width: "100%" }}
                  {...register("name", {
                    required: "Company name is required.",
                  })}
                  error={!!errors.name?.message}
                  helperText={errors.name?.message ? errors?.name.message : ""}
                />
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-[50%]">
                    <TextField
                      id="outlined-basic1"
                      multiline
                      rows={5}
                      maxRows={5}
                      label="Description"
                      variant="outlined"
                      name="description"
                      sx={{ width: "100%", color: "black" }}
                      {...register("description")}
                    />
                  </div>
                  <div className="flex gap-2 flex-col md:w-[50%]">
                    <TextField
                      id="outlined-basic2"
                      label="Address"
                      multiline
                      rows={2}
                      maxRows={2}
                      variant="outlined"
                      name="address"
                      sx={{ width: "100%" }}
                      {...register("address")}
                    />
                    <TextField
                      id="outlined-basic3"
                      label="Contact *"
                      variant="outlined"
                      name="phone"
                      sx={{ width: "100%" }}
                      {...register("phone", {
                        required: "Contact is required.",
                      })}
                      error={!!errors.phone?.message}
                      helperText={
                        errors.phone?.message ? errors?.phone.message : ""
                      }
                    />
                  </div>
                </div>
                <button className="primary-button">Add organization</button>
              </form>
            ) : (
              <div>
                <div className="flex gap-4 mb-10">
                  <div className="capitalize flex gap-4 text-2xl text-blue-500 font-bold">
                    <p className="text-2xl font-semibold text-gray-600">
                      Company Name:
                    </p>
                    {user?.organizationName}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                  <h3 className="text-2xl py-6">Company website URL's</h3>
                  <button
                    className="secondary-button"
                    onClick={() => setOpen(!open)}
                  >
                    + Add URL
                  </button>
                </div>
                <AddURL
                  open={open}
                  setOpen={setOpen}
                  success={apiDomainSuccess}
                  setSuccess={setApiDomainSuccess}
                  organization={organization}
                />
                {organization?.name !== null && (
                  <Domains
                    success={apiDomainSuccess}
                    organization={organization}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddOrganization;

import { Button, Chip, TextField, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SERVER } from "../../config/api";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import { Add, OpenInNew } from "@mui/icons-material";
import AddURL from "../../componets/addModel/AddURL";
import { useSelector } from "react-redux";

const DashBoard = () => {
  const [domains, setDomains] = useState([]);
  const [domainsCount, setDomainsCount] = useState([]);
  const user = useSelector((state) => state?.persistedReducer.user);
  const [open, setOpen] = useState(false);
  const [apiDomainSuccess, setApiDomainSuccess] = useState(false);
  const [isScanning, setIsScanning] = useState();

  useEffect(() => {
    if (user?.organizationId) {
      axios
        .get(`${SERVER}/organization/${user?.organizationId}/domain`)
        .then((res) => {
          const domains = res.data.data;
          setDomains(domains);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          console.log(err);
        });

      axios
        .get(
          `${SERVER}/organization/${user?.organizationId}/domain/count-of-domains`
        )
        .then((res) => {
          const domains = res.data.data;
          setDomainsCount(domains);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          console.log(err);
        });
    }
  }, [user?.organizationId, apiDomainSuccess]);

  return (
    <>
      <title>Dashboard | Brand Safe </title>
      <div className="flex flex-col gap-3">
        <div className="mx-10 md:text-2xl">Dashboard</div>
        <div className="mx-10 flex flex-col gap-4">
          {/* <div className='w-full md:w-[60%]'>
            <TextField value={sessionStorage.getItem('organizationName')} label="Company Name" readOnly sx={{ width: "100%", color: 'black' }} />
          </div> */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Your domain's</h3>
            <div className="flex gap-3 flex-wrap">
              <Chip
                variant="outlined"
                label={"New domain"}
                icon={<Add />}
                onClick={() => setOpen(true)}
              />
              {domains?.map((domain, index) => {
                return (
                  <Chip
                    label={domain.domainURL}
                    key={index}
                    variant="outlined"
                    sx={{
                      color: "black",
                      backgroundColor: "#E6FFE5",
                      borderBlockColor: "#B4EDFF",
                    }}
                    icon={<Link color="black" />}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-2 my-4">
            <h3 className="font-semibold">Your domain's Report</h3>
            <table className="md:w-[50%] ring-[1px] ring-gray-300 divide-y-[1px] rounded-md">
              <thead>
                <tr className="bg-slate-700 text-white divide-x-[1px] divide-gray-300">
                  <td className="px-4 py-2">Your Domain</td>
                  <td className="px-4 py-2 text-center">
                    No of Similar Domains
                  </td>
                  <td className="px-4 py-2 text-center">Action</td>
                </tr>
              </thead>
              <tbody className="">
                {domainsCount?.map((domain, index) => (
                  <tr
                    key={index}
                    className="divide-x-[1px] divide-gray-300 even:bg-gray-100"
                  >
                    {domain.similarDomainCount > 0 ? (
                      <Link
                        to={{
                          pathname: `domain/${domain?.uuid}`,
                          state: { domain },
                        }}
                      >
                        <td className="px-4 py-2 text-blue-600 hover:underline cursor-pointer flex items-center gap-1 justify-center">
                          {domain.domainURL}
                          <OpenInNew fontSize="34px" />
                        </td>
                      </Link>
                    ) : (
                      <Tooltip title="once similar domain found then you can navigate next page">
                        <td className="px-4 py-2 text-blue-600 flex items-center gap-1 justify-center">
                          {domain.domainURL}
                        </td>
                      </Tooltip>
                    )}
                    <td className="px-4 py-2 text-center">
                      {domain.similarDomainCount}
                    </td>
                    <td className={`px-4 py-1 text-center min-w-[150px]`}>
                      <Link to={"/contact"}>
                        <Button
                          variant="contained"
                          sx={{ width: "100%" }}
                          disabled={isScanning === domain.id}
                        >
                          {isScanning === domain.id ? "Scanning..." : "Scan"}
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <AddURL
          open={open}
          setOpen={setOpen}
          success={apiDomainSuccess}
          setSuccess={setApiDomainSuccess}
          organization={{ organization: { id: user?.organizationId } }}
        />
      </div>
    </>
  );
};

export default DashBoard;

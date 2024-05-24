import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SERVER } from "../../config/api";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { toast } from "react-toastify";
import { ArrowBack, OpenInNew } from "@mui/icons-material";

const SimilarDomainDetails = () => {
  const location = useLocation();
  console.log(location);
  const uuid = location.pathname.split("/")[3];
  const [domains, setDomains] = useState([]);
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [apiSuccess, setApiSuccess] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${SERVER}/domain/by-uuid/${uuid}/similar-domain`)
      .then((res) => {
        const domains = res.data.data;
        setDomains(domains);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      });
  }, [uuid, apiSuccess]);

  const handleReport = () => {
    axios
      .put(`${SERVER}/similar-domain/by-uuid/${selectedDomain.uuid}`, {
        reported: 1,
      })
      .then((res) => {
        toast.success(`${selectedDomain.domainURL} is reported successfully`);
        setIsOpenModel(false);
        setSelectedDomain();
        setApiSuccess(!apiSuccess);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <>
      <title>Dashboard | Brand Safe </title>
      <div className="flex flex-col gap-3">
        <div className="mx-10 md:text-2xl flex gap-2">
          <div className="cursor-pointer" onClick={() => navigate(-1)}>
            <ArrowBack />
          </div>
          <Link to={"/dashboard"} className="hover:underline">
            Dashboard
          </Link>
          {" > "}Similar Domain Details
        </div>
        <div className="mx-10 py-2 md:text-xl">
          {" "}
          {domains?.originalDomain?.originalDomainURL && (
            <span>Domain: {domains?.originalDomain?.originalDomainURL}</span>
          )}
        </div>
        <div className="mx-10 flex flex-col gap-4 overflow-hidden overflow-x-auto">
          <table className="ring-[1px] ring-gray-300 divide-y-[1px] rounded-md p-2">
            <thead>
              <tr className="bg-slate-700  text-white divide-x-[1px] divide-gray-300">
                <td className="px-4 py-2">Similar Domain</td>
                <td className="px-4 py-2 text-center">Status</td>
                <td className="px-4 py-2 text-center">
                  Image Similarity Score
                </td>
                <td className="px-4 py-2 text-center">Text Similarity Score</td>
                <td className="px-4 py-2 text-center">BrandStatus</td>
                <td className="px-4 py-2 text-center">Action</td>
              </tr>
            </thead>
            <tbody className="">
              {domains?.similarDomains?.map((domain, index) => (
                <tr
                  key={index}
                  className="divide-x-[1px] ring-[1px] ring-gray-300 divide-gray-300 even:bg-gray-100"
                >
                  <td className="px-4 py-2 text-blue-600 hover:underline cursor-pointer">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-1 items-center"
                      href={
                        domain.domainURL?.includes("https:")
                          ? domain.domainURL
                          : `https://${domain.domainURL}`
                      }
                    >
                      {domain.domainURL}
                      <OpenInNew fontSize="34px" />
                    </a>
                  </td>
                  <td className="px-4 py-2 text-center flex items-center gap-4 justify-center">
                    <span
                      className={`${
                        domain.status === "LIVE"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {domain.status}
                    </span>
                    <span
                      className={`${
                        domain.status === "LIVE" ? "bg-green-500" : "bg-red-500"
                      } p-1 rounded-full animate-pulse`}
                    ></span>
                  </td>

                  <td className="px-4 py-2 text-center">
                    {domain.imageSimilarityScore?.toFixed(1)}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {domain.textSimilarityScore?.toFixed(1)}
                  </td>
                  <td className="px-4 py-2 text-center flex items-center gap-4 justify-center">
                    <span
                      className={`${
                        domain.brandStatus === "SAFE"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {domain.brandStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    {domain.reported === false ? (
                      <Button
                        variant="contained"
                        onClick={() => {
                          setIsOpenModel(true);
                          setSelectedDomain(domain);
                        }}
                      >
                        Report
                      </Button>
                    ) : (
                      <Button disabled={true} variant="contained">
                        Reported
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Dialog open={isOpenModel} onClose={() => setIsOpenModel(false)}>
          <div className="bg-theme-color">
            <div className="flex items-center gap-4 p-4">
              <img
                src="../Union.svg"
                alt="logo"
                className="w-[15%] md:w-[10%]"
              />
              <h1 className="text-[18px] md:text-[30.47px] font-semibold">
                Brand Safe
              </h1>
            </div>
            <DialogTitle>
              Do you want to report this{" "}
              <b className="text-blue-700">{selectedDomain?.domainURL}</b>{" "}
              domain?
            </DialogTitle>
            <DialogContent>
              <div className="flex gap-4">
                <button
                  className="primary-button w-[100px]"
                  onClick={handleReport}
                >
                  Yes
                </button>
                <button
                  className="cancel-button"
                  onClick={() => {
                    setIsOpenModel(false);
                    setSelectedDomain();
                  }}
                >
                  cancel
                </button>
              </div>
            </DialogContent>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default SimilarDomainDetails;

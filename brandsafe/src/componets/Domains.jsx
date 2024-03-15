import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVER } from "../config/api";
import { Chip } from "@mui/material";
import { Delete, Link } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Domains = ({ success, organization }) => {
  const [domains, setDomains] = useState([]);
  const navigate = useNavigate();
  console.log(organization);

  useEffect(() => {
    if (organization) {
      axios
        .get(
          `${SERVER}/organization/${sessionStorage.getItem(
            "organizationId"
          )}/domain`
        )
        .then((res) => {
          const domains = res.data.data;
          setDomains(domains);
        })
        .catch((err) => {
          !err.response.data.message === "Not Found." &&
            toast.error(err.response.data.message);
          console.log(err);
        });
    }
  }, [success, organization]);

  const handleDelete = () => {};

  return (
    <>
      {domains.length > 0 ? (
        <div>
          <div className="flex gap-3 flex-wrap rounded-md bg-white p-4 ring-1 ring-sky-500">
            {domains?.map((domain, index) => {
              return (
                <Chip
                  label={domain.domainURL}
                  key={index}
                  variant="outlined"
                  sx={{
                    color: "black",
                    backgroundColor: "#B4EDFF",
                    borderBlockColor: "#B4EDFF",
                  }}
                  onDelete={handleDelete}
                  icon={<Link color="black" />}
                />
              );
            })}
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="primary-button my-4"
            disabled={domains?.length === 0}
          >
            Proceed
          </button>
        </div>
      ) : (
        <div className="text-gray-400 text-lg">Please add your domain url.</div>
      )}
    </>
  );
};

export default Domains;

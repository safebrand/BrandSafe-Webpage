import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SERVER } from "../../config/api";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";

const Organization = () => {
  const [organizationData, setOrganizationData] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchOrganizations();
  }, [filter]);

  const fetchOrganizations = () => {
    axios
      .get(`${SERVER}/organization/all`)
      .then((res) => {
        const org = res.data.data;
        if (filter === "active") {
          setOrganizationData(org.filter((o) => !o.disabled));
        } else if (filter === "disabled") {
          setOrganizationData(org.filter((o) => o.disabled));
        } else {
          setOrganizationData(org);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data.message !== "Not Found.") {
          toast.error(err.response.data.message);
        }
        console.log(err);
      });
  };

  const handleCheckboxChange = (org) => {
    const updatedOrg = { ...org, disabled: !org.disabled };
    axios
      .put(`${SERVER}/organization/by-uuid/${org.uuid}`, {
        disabled: updatedOrg.disabled,
      })
      .then((res) => {
        toast.success("Organization updated successfully");
        fetchOrganizations(); // Refresh the data after update
      })
      .catch((err) => {
        toast.error("Failed to update organization");
        console.log(err);
      });
  };

  return (
    <Container className="space-y-2">
      <Typography variant="h6" gutterBottom>
        Organization
      </Typography>
      <FormControl variant="outlined" className="md:w-[25%]" margin="normal">
        <InputLabel id="filter-label">Filter</InputLabel>
        <Select
          labelId="filter-label"
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Filter"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="disabled">Disabled</MenuItem>
        </Select>
      </FormControl>
      <table className="md:w-[50%] ring-[1px] ring-gray-300 divide-y-[1px] rounded-md">
        <thead>
          <tr className="bg-slate-700 text-white divide-x-[1px] divide-gray-300">
            <th className="px-4 py-2 text-center">Name</th>
            <th className="px-4 py-2 text-center">Phone Number</th>
            <th className="px-4 py-2 text-center">User ID</th>
            <th className="px-4 py-2 text-center">Disabled</th>
          </tr>
        </thead>
        <tbody>
          {organizationData.map((org, index) => (
            <tr
              key={index}
              className="divide-x-[1px] divide-gray-300 even:bg-gray-100 "
            >
              <td className="px-4 py-2 text-center hover:underline">
                <Link to={`/admin/organization/${org.uuid}`}>{org.name}</Link>
              </td>
              <td className="px-4 py-2 text-center">{org.phone}</td>
              <td className="px-4 py-2 text-center">{org.userId}</td>
              <td className="px-4 py-2 text-center">
                <Checkbox
                  className="m-0 p-0"
                  checked={org.disabled}
                  onChange={() => handleCheckboxChange(org)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default Organization;

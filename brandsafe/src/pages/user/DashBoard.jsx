import { Chip, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SERVER } from '../../config/api'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Add, OpenInNew } from '@mui/icons-material'
import AddURL from '../../componets/addModel/AddURL'

const DashBoard = () => {
  const [domains, setDomains] = useState([])
  const [domainsCount, setDomainsCount] = useState([])
  const organizationId = sessionStorage.getItem("organizationId")
  const [open, setOpen] = useState(false)
  const [apiDomainSuccess, setApiDomainSuccess] = useState(false)

  useEffect(() => {
    if (organizationId) {
      axios
        .get(`${SERVER}/domain?organizationId=${organizationId}`)
        .then((res) => {
          const domains = res.data.data
          setDomains(domains)
        }).catch((err) => {
          toast.error(err.response.data.message)
          console.log(err)
        })

      axios
        .get(`${SERVER}/domain/count-of-domains/${organizationId}`)
        .then((res) => {
          const domains = res.data.data
          setDomainsCount(domains)
        }).catch((err) => {
          toast.error(err.response.data.message)
          console.log(err)
        })
    }
  }, [organizationId, apiDomainSuccess])


  return (
    <>
      <title>Dashboard | Brand Safe </title>
      <div className='flex flex-col gap-3'>
        <div className='mx-10 md:text-2xl'>
          Dashboard
        </div>
        <div className='mx-10 flex flex-col gap-4'>
          {/* <div className='w-full md:w-[60%]'>
            <TextField value={sessionStorage.getItem('organizationName')} label="Company Name" readOnly sx={{ width: "100%", color: 'black' }} />
          </div> */}
          <div className='flex flex-col gap-2'>
            <h3 className='font-semibold'>Your domain's</h3>
            <div className='flex gap-3 flex-wrap'>
              <Chip variant='outlined' label={"New domain"} icon={(<Add />)} onClick={() => setOpen(true)} />
              {domains?.map((domain, index) => {
                return (
                  <Chip label={domain.domainURL} key={index} variant="outlined" sx={{ color: "black", backgroundColor: "#E6FFE5", borderBlockColor: "#B4EDFF" }} icon={<Link color='black' />} />
                )
              })}
            </div>
          </div>
          <div className='flex flex-col gap-2 my-4'>
            <h3 className='font-semibold'>Your domain's Report</h3>
            <table className='md:w-[50%] ring-[1px] ring-gray-300 divide-y-[1px] rounded-md'>
              <thead>
                <tr className='bg-slate-700 text-white divide-x-[1px] divide-gray-300'>
                  <td className='px-4 py-2'>Your Domain</td>
                  <td className='px-4 py-2 text-center'>No of Similar Domains</td>
                </tr>
              </thead>
              <tbody className=''>
                {domainsCount?.map((domain, index) =>
                  <tr key={index} className='divide-x-[1px] divide-gray-300 even:bg-gray-100'>
                    <Link to={`${domain?.uuid}`}>
                      <td className='px-4 py-2 text-blue-600 hover:underline cursor-pointer flex items-center gap-1'>
                        {domain.domainURL}<OpenInNew fontSize='34px' />
                      </td>
                    </Link>
                    <td className='px-4 py-2 text-center'>{domain.similar_domain_count}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <AddURL open={open} setOpen={setOpen} success={apiDomainSuccess} setSuccess={setApiDomainSuccess} organization={{ organization: { id: organizationId } }} />
      </div >
    </>
  )
}

export default DashBoard
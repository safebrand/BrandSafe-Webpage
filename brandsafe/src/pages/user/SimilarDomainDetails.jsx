import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SERVER } from '../../config/api'


const SimilarDomainDetails = () => {
    const location = useLocation()
    const uuid = (location.pathname).split("/")[2]
    const [domains, setDomains] = useState([])

    useEffect(() => {
        axios
            .get(`${SERVER}/similarDomain/similar-domain-of-original-domain/${uuid}`)
            .then((res) => {
                const domains = res.data.data
                setDomains(domains)
            }).catch((err) => {
                toast.error(err.response.data.message)
                console.log(err)
            })
    }, [uuid])

    return (
        <>
            <title>Dashboard | Brand Safe </title>
            <div className='flex flex-col gap-3'>
                <div className='mx-10 md:text-2xl'>
                    <Link to={'/dashboard'} className='hover:underline'>Dashboard</Link>{" > "}Similar Domain Details
                </div>
                <div className='mx-10 flex flex-col gap-4'>
                    <table className='md:w-[50%] ring-[1px] ring-gray-300 divide-y-[1px] rounded-md'>
                        <thead>
                            <tr className='bg-slate-700 text-white divide-x-[1px] divide-gray-300'>
                                <td className='px-4 py-2'>Similar Domain</td>
                                <td className='px-4 py-2 text-center'>Status</td>
                                <td className='px-4 py-2 text-center'>Similarity Score</td>
                                <td className='px-4 py-2 text-center'>Action</td>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {domains?.similarDomain?.map((domain, index) =>
                                <tr key={index} className='divide-x-[1px] divide-gray-300 even:bg-gray-100'>
                                    <td className='px-4 py-2 text-blue-600 hover:underline cursor-pointer'><a target="_blank" rel="noopener noreferrer" href={domain.domainURL} >{domain.domainURL}</a></td>
                                    <td className='px-4 py-2 text-center flex items-center gap-4 justify-center'><span className={`${domain.status === "LIVE" ?"text-green-500":"text-red-500"}`}>{domain.status}</span><span className={`${domain.status === "LIVE" ?"bg-green-500":"bg-red-500"} p-1 rounded-full animate-pulse`}></span></td>
                                    <td className='px-4 py-2 text-center'>{domain.similarityScore}</td>
                                    <td className='px-4 py-2 text-center'><button className='table-button cursor-pointer'>Report</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default SimilarDomainDetails
import React, { useEffect, useState } from 'react'
import Logo from '../../componets/Logo'
import { TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { SERVER } from '../../config/api'
import { toast } from 'react-toastify'

const AddOrganization = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: 'all' })
    const [apiSuccess, setApiSuccess] = useState(false)


    const addCompany = (data) => {
        axios
            .post(`${SERVER}/organization`, data)
            .then((res) => {
                setApiSuccess(!apiSuccess)
                toast.success(res.data.message)
            }).catch((err) => {
                toast.error(err.response.data.message)
                console.log(err)
            })
    }

    return (
        <>
            <div className='container bg-theme-color'>

                <div className='md:flex gap-5 px-4 lg:px-20 items-center md:divide-x-2 divide-sky-300'>
                    <div className='md:w-[40%]'>
                        <Logo />
                        <p className='text-lg md:text-2xl font-normal md:font-medium flex text-center md:text-left'>Protecting brands from frauds across the globe</p>
                    </div>
                    <div className='md:pl-10 flex flex-col gap-10 md:w-[50%] py-10'>
                        <h3 className='text-2xl'>Enter your company's details</h3>
                        <form action=" " className='flex flex-col gap-4 ' onSubmit={handleSubmit(addCompany)}>
                            <TextField id="outlined-basic" label="Company name *" variant="outlined" name='email' sx={{ width: "100%" }}
                                {...register('name', {
                                    required: 'Company name is required.',
                                })}
                                error={!!errors.name?.message}
                                helperText={errors.name?.message ? errors?.name.message : ""}
                            />
                            <div className='flex flex-col md:flex-row gap-4'>
                                <div className='md:w-[50%]'>

                                    <TextField id="outlined-basic1" multiline rows={5} maxRows={5} label="Description" variant="outlined" name='description' sx={{ width: "100%", color: "black" }}
                                        {...register('description')}
                                    />
                                </div>
                                <div className='flex gap-2 flex-col md:w-[50%]'>
                                    <TextField id="outlined-basic2" label="Address" multiline rows={2} maxRows={2} variant="outlined" name='address' sx={{ width: "100%" }}
                                        {...register('address')}
                                    />
                                    <TextField id="outlined-basic3" label="Contact *" variant="outlined" name='phone' sx={{ width: "100%" }}
                                        {...register('phone', {
                                            required: 'Contact is required.',
                                        })}
                                        error={!!errors.phone?.message}
                                        helperText={errors.phone?.message ? errors?.phone.message : ""}
                                    />
                                </div>
                            </div>
                            <button className='primary-button'>Add organization</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddOrganization
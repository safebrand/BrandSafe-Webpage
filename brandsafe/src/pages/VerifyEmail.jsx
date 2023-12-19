import React, { useEffect, useState } from 'react'
import Logo from '../componets/Logo'
import Loading from '../componets/Loading'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SERVER } from '../config/api'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { TextField } from '@mui/material'

const VerifyEmail = () => {
    const arr = window.location.href.split("/")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({ mode: 'all' });

    const handleEmailVerify = () => {
        axios
            .post(`${SERVER}/user/verify-email/${arr[arr?.length - 1]}`)
            .then((res) => {
                setLoading(false)
                toast.success(res.data.message)
                navigate('/login')
            }).catch((err) => {
                console.log(err)
                setLoading(false)
                toast.error(err.response.data.message)
                if (err.response.data.message === 'Email already verified') {
                    navigate('/login')
                }
            })
    }

    useEffect(() => {
        arr && setValue('token', arr[arr?.length - 1])
    })
    // if (arr[arr?.length - 1]) {
    //     handleEmailVerify()
    // }

    if (loading) {
        return (<Loading loading={loading} />)
    }
    return (
        <>
            <div className='container theme-color'>
                <div className='flex flex-col gap-8 items-center justify-center'>
                    <Logo />
                    <p className='text-lg md:text-2xl font-normal md:font-medium flex text-center md:text-left'>Protecting brands from frauds across the globe</p>
                </div>
                <div className='my-8 flex flex-col gap-10 px-4 md:px-80'>
                    <h2 className='text-2xl md:text-4xl font-semibold md:text-center'>Verify your Email</h2>
                    <form autoComplete='off' className='flex flex-col gap-4 md:w-[50%] md:mx-auto ' onSubmit={handleSubmit(handleEmailVerify)}>
                        <TextField
                            label="Token"
                            variant="outlined"
                            type="text"
                            {...register('token', {
                                required: 'token is required.',
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                        <button className='primary-button'>Verify</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default VerifyEmail
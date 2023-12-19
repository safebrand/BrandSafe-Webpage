import React, { useState } from 'react'
import Logo from '../componets/Logo'
import { TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SERVER, header } from '../config/api';
import { toast } from 'react-toastify';
import Loading from '../componets/Loading';


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'all' })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const submitLogin = (data) => {
        setLoading(true)
        axios
            .post(`${SERVER}/user/login`, data)
            .then((res) => {
                setLoading(false)
                const user = res.data?.data?.user
                console.log(user)
                sessionStorage.setItem('fName', user?.firstName)
                sessionStorage.setItem('lName', user?.lastName)
                sessionStorage.setItem('userId', user?.id)
                sessionStorage.setItem('userUuid', user?.uuid)
                sessionStorage.setItem('organizationName', user?.organizationName)
                sessionStorage.setItem('token', res.data.data.sessionId)
                user?.organizationName ? navigate('/dashboard') : navigate('/addOrganization')
            }).catch((err) => {
                console.log(err)
                toast.error(err.response.data.message);
                setLoading(false)
            })
    }

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
                    <h2 className='text-4xl font-semibold'>Login</h2>
                    <form onSubmit={handleSubmit(submitLogin)} className='flex flex-col gap-6'>
                        <div className='flex flex-col md:flex-row gap-8'>
                            <div className='w-full md:w-[50%]'>
                                <TextField id="outlined-basic" label="Email" variant="outlined" name='email' sx={{ width: "100%" }}
                                    {...register('email', {
                                        required: 'Email is required.',
                                    })}
                                    error={!!errors.name?.message}
                                    helperText={errors.name?.message ? errors?.name.message : ""}
                                />
                            </div>
                            <div className='relative w-full md:w-[50%]'>

                                <TextField id="outlined-basic1" label="Password" sx={{ width: "100%" }} variant="outlined" name='password'
                                    {...register('password', {
                                        required: 'Password is required.',
                                    })}
                                    type={showPassword ? 'text' : 'password'}
                                    error={!!errors.password?.message}
                                    helperText={errors.password?.message ? errors?.password.message : ""}
                                />
                                <div onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-4'>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </div>
                            </div>
                        </div>
                        <div className='relative'>
                            <Link to="/forgotPassword"><h1 className="absolute -top-4 right-0 text-[#EB3434] text-center hover:underline">Forgot Password?</h1></Link>
                        </div>
                        <Link to="/signup">
                            <h1 className="text-black  ">
                                New to Brand Safe? <span className='text-blue-800 hover:underline'>Signup</span>
                            </h1>
                        </Link>
                        <button className='primary-button'>Proceed</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
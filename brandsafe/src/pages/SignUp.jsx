import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Logo from '../componets/Logo';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios'
import { SERVER } from '../config/api';
import { toast } from 'react-toastify';
import Loading from '../componets/Loading';


const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm({ mode: 'all' });
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(false)

    const handleOpenSuccessDialog = (email) => {
        setUserEmail(email);
        setSuccessDialogOpen(true);
    };


    const submitSignUp = (data) => {
        setLoading(true)
        axios.
            post(`${SERVER}/user/signup`, data)
            .then((res) => {
                setLoading(false)
                handleOpenSuccessDialog(data.email)
            }).catch((err) => {
                console.log(err)
                toast.error(err.response.data.message)
                setLoading(false)
            })
    }

    if (loading) {
        return (<Loading loading={loading} />)
    }

    return (
        <>
            <title>SignUp| Brand Safe </title>
            <div className='container theme-color'>
                <div className='flex flex-col gap-8 items-center justify-center'>
                    <Logo />
                    <p className='text-lg md:text-2xl font-normal md:font-medium flex text-center md:text-left'>Protecting brands from frauds across the globe</p>
                </div>
                <div className='my-8 flex flex-col gap-10 px-4 md:px-80'>
                    <h2 className='text-4xl font-semibold md:mx-auto'>Sign Up</h2>
                    <form autoComplete='off' className='flex flex-col gap-4 md:w-[50%] md:mx-auto ' onSubmit={handleSubmit(submitSignUp)}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            type="email"
                            {...register('email', {
                                required: 'Email is required.',
                                pattern: {
                                    value: (/\S+@\S+\.\S+/),
                                    message: 'Email must be valid.',
                                },
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            type={isVisible ? 'text' : 'password'}
                            {...register('password', {
                                required: 'Password is required.',
                                minLength: {
                                    value: 6,
                                    message: 'Password Must be above 6 characters.',
                                },
                                maxLength: {
                                    value: 16,
                                    message: 'Password Must be less than 16 characters.',
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})/,
                                    message: 'Must contain 1 UpperCase, 1 LowerCase, 1 Number ,1 Special char',
                                },
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            InputProps={{
                                endAdornment: (
                                    <span onClick={() => setIsVisible(!isVisible)}>
                                        {errors.password && isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </span>
                                ),
                            }}
                        />
                        <TextField
                            label="Confirm Password"
                            variant="outlined"
                            type={isVisible ? 'text' : 'password'}
                            {...register('cPassword', {
                                required: 'Confirm password is required.',
                                validate: (value) => {
                                    const { password } = getValues();
                                    return password === value || 'Passwords should match!';
                                },
                            })}
                            error={!!errors.cPassword}
                            helperText={errors.cPassword?.message}
                            InputProps={{
                                endAdornment: (
                                    <span onClick={() => setIsVisible(!isVisible)}>
                                        {errors.cPassword && isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </span>
                                ),
                            }}
                        />
                        <button type="" className='primary-button'>Sign Up</button>
                        <Link to="/login">
                            <h1 className="text-black ">
                                Already Registered? <span className='text-blue-800 hover:underline'>Login </span>
                            </h1>
                        </Link>
                    </form>
                    <Dialog open={successDialogOpen} >
                        <div className='bg-theme-color'>
                            <div className='flex items-center gap-4 p-4'>
                                <img src="./Union.svg" alt="logo" className='w-[15%] md:w-[10%]' />
                                <h1 className='text-[18px] md:text-[30.47px] font-semibold'>Brand Safe</h1>
                            </div>
                            <DialogTitle sx={{ color: "green" }}>Email Sent Successfully !!</DialogTitle>
                            <DialogContent>
                                <p>We have sent an email to <b>{userEmail}</b> to verify your account.</p>
                            </DialogContent>
                        </div>
                    </Dialog>
                </div>
            </div>
        </>
    )
}

export default SignUp
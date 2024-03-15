import { Dialog, DialogContent, DialogTitle, TextField } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { SERVER } from '../../config/api'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const AddURL = ({ organization, open, setOpen, success, setSuccess }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: 'all' })
    const user = useSelector((state) => state?.persistedReducer.user);

    const addUrl = (data) => {
        axios.post(`${SERVER}/organization/${user.organizationId}/domain`, data)
            .then((res) => {
                setOpen(!open)
                setSuccess(!success)
                toast.success(res.data.message)
                reset()
            }).catch((err) => {
                toast.error(err.response.data.message)
                console.log(err)
            })
    }

    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth={"sm"} fullWidth>
                <div className=''>
                    <div className='flex justify-between items-center'>
                        <DialogTitle sx={{ fontWeight: "600" }}>Add URL Details</DialogTitle>
                        <div className='flex justify-end items-center gap-2 p-4'>
                            <img src="./Union.svg" alt="logo" className='w-[10%]' />
                            <h1 className='text-[18px]'>Brand Safe</h1>
                        </div>
                    </div>
                    <DialogContent>
                        <form onSubmit={handleSubmit(addUrl)}>
                            <TextField id="outlined-basic3" label="Website URL *" variant="outlined" name='domainURL' sx={{ width: "100%" }}
                                {...register('domainURL', {
                                    required: 'Website URL is required.',
                                })}
                                error={!!errors.domainURL?.message}
                                helperText={errors.domainURL?.message ? errors?.domainURL.message : "Ex:-example.com"}
                            />
                            <button className='primary-button my-5'>Add</button>
                        </form>
                    </DialogContent>

                </div>
            </Dialog>
        </>
    )
}

export default AddURL
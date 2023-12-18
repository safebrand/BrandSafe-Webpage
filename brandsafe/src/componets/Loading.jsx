import { CircularProgress, Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'

const Loading = ({ loading }) => {
    return (
        <>
            <Dialog open={loading} >
                <div className='bg-white'>
                    <div className='flex items-center gap-4 p-4'>
                        <img src="./Union.svg" alt="logo" className='w-[20%]' />
                        <h1 className='text-[14px] md:text-[30.47px] font-semibold'>Brand Safe</h1>
                    </div>
                    {/* <DialogTitle>Loading...</DialogTitle> */}
                    <DialogContent>
                        <div className='flex gap-3 items-center justify-center'>
                            <CircularProgress />
                            <p>Please wait...</p>
                        </div>
                    </DialogContent>
                </div>
            </Dialog>
        </>
    )
}

export default Loading
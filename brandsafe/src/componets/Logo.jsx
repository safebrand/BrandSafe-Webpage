import React from 'react'

const Logo = () => {
    return (
        <>
            <div className='flex gap-4 items-center'>
                <div className='mt-4'>
                    <img src="../Union.svg" alt="logo" />
                </div>
                <div className=''>
                    <h6 className='text-lg md:text-2xl'>welcome to</h6>
                    <h1 className='text-[30px] md:text-[52.47px] font-semibold'>Brand Safe</h1>
                </div>
            </div>
        </>
    )
}

export default Logo
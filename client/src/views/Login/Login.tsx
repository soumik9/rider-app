import CardLayout from '@components/CardLayout'
import { LoadingButton } from '@mui/lab'
import { TextField } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import { AiFillCaretRight } from 'react-icons/ai'

const Login = () => {

    const [input, setInput] = useState({
        email: '', password: ''
    })

    return (
        <CardLayout>

            <div className='lg:w-[80%] w-[90%]'>
                
                <div className="grid lg:grid-cols-2 gap-x-8">
                    <TextField
                        required
                        type='email'
                        label="Email"
                        variant="outlined"
                        className=' !text-indigo-500 !w-full'
                        onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setInput({ ...input, email: e.target.value })}
                    />

                    <TextField
                        required
                        type='password'
                        label="Password"
                        variant="outlined"
                        className=' !text-indigo-500 !w-full'
                        onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setInput({ ...input, password: e.target.value })}
                    />
                </div>

                <div className='mt-10'>
                    <LoadingButton
                        type='submit'
                        variant="contained"
                        size="large"
                        endIcon={<AiFillCaretRight />}
                        className='!bg-indigo-500 !w-full'
                    // onClick={handleSubmit}
                    // loading={loading}
                    // disabled={loading}
                    >
                        <span>Login</span>
                    </LoadingButton>
                </div>


            </div>



        </CardLayout>
    )
}

export default Login
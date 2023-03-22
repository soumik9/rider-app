import CardLayout from '@components/CardLayout'
import { LoadingButton } from '@mui/lab'
import { TextField } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useState } from 'react'
import { toast } from 'react-hot-toast'
import { AiFillCaretRight } from 'react-icons/ai'

const Login = () => {

    // global
    const router = useRouter();

    // states
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({ email: '', password: '' })

    const handleLogin = () => {
        if (input.email === '' || input.password === '') {
            toast.error('Missing Information!');
            return;
        }

        setLoading(true);
        const config = { headers: {} };

        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}login`, input, config)
            .then(res => {
                setLoading(false);
                console.log(res.data)
                if (res.data.success) {
                    localStorage.setItem('accessToken', res.data.data.token);
                    localStorage.setItem('userId', res.data.data.user.userId);

                    if (res.data.data.user.role === 'rider') {
                        router.push('/profile')
                    } else if (res.data.data.user.role === 'learner') {
                        router.push('/packages')
                    } else {
                        router.push('/dashboard')
                    }

                    toast.success(res.data.message);
                } else {
                    toast.error(res.data.message);
                }
            })
    }

    return (
        <CardLayout>

            <div className='lg:w-[80%] w-[90%]'>

                <div className="grid lg:grid-cols-2 gap-x-8 gap-y-8 md:gap-y-0">
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
                        onClick={handleLogin}
                        loading={loading}
                        disabled={loading}
                    >
                        <span>Login</span>
                    </LoadingButton>
                </div>


            </div>



        </CardLayout>
    )
}

export default Login
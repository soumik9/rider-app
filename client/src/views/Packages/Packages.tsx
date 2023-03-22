import CardLayout from '@components/CardLayout'
import { LoadingButton } from '@mui/lab'
import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import { packageItems } from 'src/constants'
import PItem from './PItem'

const Packages = () => {

    // global
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        router.push('/')
    }

    return (
        <CardLayout hFull={true}>
            <div className='w-full p-5 lg:p-20'>
                <div className='grid md:grid-cols-2 gap-5'>

                    {packageItems.map((item, index) => <PItem  key={index} item={item} />)}

                </div>
            </div>

            <div className='absolute top-5 left-3'>
                <button
                    className='text-indigo-500 hover:text-indigo-700 hover:underline trans'
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </CardLayout>
    )
}

export default Packages
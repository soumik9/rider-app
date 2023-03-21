import CardLayout from '@components/CardLayout'
import Image from 'next/image'
import React from 'react'

const Profile = () => {
    return (
        <CardLayout>

            <div className='flex gap-x-5 items-center'>
                <Image src='/av.webp' width={100} height={100} alt='img' className='rounded-full border border-indigo-500 p-1' />

                <div>
                    <p className='text-indigo-700'>Soumik Ahmmed</p>
                    <button className='text-indigo-500 hover:text-indigo-700 hover:underline trans'>Logout</button>
                </div>
            </div>


        </CardLayout>
    )
}

export default Profile
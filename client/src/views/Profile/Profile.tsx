import CardLayout from '@components/CardLayout'
import { useRouter } from 'next/router';
import React from 'react'
import useAuth from 'src/hooks/useAuth';

const Profile = () => {

    // global
    const router = useRouter();

    // hooks
    const { loggedUser, loggedUserLoading } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        router.push('/')
    }

    return (
        <CardLayout>

            {loggedUserLoading ? <p>Loading...</p> : <div className='w-full lg:px-20 px-2 py-20 lg:py-0 grid lg:grid-cols-2'>

                <div>
                    <div className='flex gap-x-5 items-center'>
                        <img src={loggedUser.image ? loggedUser.image : ''} width={100} height={100} alt='img' className='rounded-full border border-indigo-500 p-1' />

                        <div>
                            <p className='text-indigo-700'>{loggedUser?.name}</p>
                            <button
                                className='text-indigo-500 hover:text-indigo-700 hover:underline trans'
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    <div className='mt-10 px-5 space-y-2'>
                        <p className='text-indigo-500 capitalize'>
                            <span className='font-semibold'>Role: </span>
                            {loggedUser?.role}
                        </p>

                        <p className='text-indigo-500 capitalize'>
                            <span className='font-semibold'>Age: </span>
                            {loggedUser?.age}
                        </p>

                        <p className='text-indigo-500 capitalize'>
                            <span className='font-semibold'>Email: </span>
                            {loggedUser?.email}
                        </p>

                        <p className='text-indigo-500 capitalize'>
                            <span className='font-semibold'>Address: </span>
                            {loggedUser?.address}
                        </p>

                        <p className='text-indigo-500 capitalize'>
                            <span className='font-semibold'>Phone: </span>
                            {loggedUser?.phone}
                        </p>

                        <p className='text-indigo-500 capitalize'>
                            <span className='font-semibold'>Car Name: </span>
                            {loggedUser?.carName}
                        </p>

                        <p className='text-indigo-500 capitalize'>
                            <span className='font-semibold'>Car Model: </span>
                            {loggedUser?.carModel}
                        </p>

                        <p className='text-indigo-500 capitalize'>
                            <span className='font-semibold'>Car Name Plate: </span>
                            {loggedUser?.namePlate}
                        </p>

                        <p className='text-indigo-500 capitalize'>
                            <span className='font-semibold'>Vehicle: </span>
                            {loggedUser?.vehicleType}
                        </p>
                    </div>

                </div>

                <div className='flex flex-col items-end space-y-5 mt-10 lg:mt-0'>
                    <img src={loggedUser.nid ? loggedUser.nid : ''} width={300} height={300} alt='img' className='border border-indigo-500 p-1' />
                    <img src={loggedUser.drivingLicence ? loggedUser.drivingLicence : ''} width={300} height={300} alt='img' className='border border-indigo-500 p-1' />
                </div>


            </div>}

        </CardLayout>
    )
}

export default Profile
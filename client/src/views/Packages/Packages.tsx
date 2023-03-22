import CardLayout from '@components/CardLayout'
import { LoadingButton } from '@mui/lab'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { AiFillCaretRight } from 'react-icons/ai'
import { packageItems } from 'src/constants'

const Packages = () => {

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

                    {packageItems.map((item, index) => <div className='bg-indigo-200 p-5 rounded-md shadow flex flex-col items-center' key={index + 'pack'}>
                        <Image src={item.img} width={100} height={100} alt={item.name} className='rounded-full p-1 border border-indigo-500' />
                        <h2 className='text-indigo-500 my-2 text-[24px] font-semibold'>{item.name}</h2>
                        <p className='text-indigo-500 mb-2 font-medium text-[18px]'>{item.price}$</p>

                        <p className='text-center text-indigo-600 leading-7'>{item.desc}</p>

                        <div className='mt-10'>
                            <LoadingButton
                                type='submit'
                                variant="contained"
                                size="large"
                                endIcon={<AiFillCaretRight />}
                                className='!bg-indigo-500 !w-full'
                            // onClick={handleLogin}
                            // loading={loading}
                            // disabled={loading}
                            >
                                Buy Package
                            </LoadingButton>
                        </div>
                    </div>)}

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
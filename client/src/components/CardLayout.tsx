import Link from 'next/link'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const CardLayout = ({ children }: Props) => {
    return (
        <div className='container'>
            <div className="flex items-center justify-center h-screen w-full">
                <div className='bg-indigo-100 h-[90vh] w-full rounded-md shadow flex flex-col items-center justify-center relative'>

                    {children}

                    <div className='absolute top-3 right-3'>
                        <Link href={'/'}>
                            <h1 className='text-[24px] uppercase font-semibold text-indigo-500 hover:text-indigo-700 trans'>Rider App</h1>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CardLayout
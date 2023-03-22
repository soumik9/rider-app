import Link from 'next/link'
import React from 'react'
import { cx } from 'src/hooks/helper';

type Props = {
    children: React.ReactNode;
    hFull?: boolean;
}

const CardLayout = ({ children, hFull }: Props) => {
    return (
        <div className='container'>
            <div className={cx(
                hFull ? 'h-full lg:h-screen' : 'h-screen',
                "flex items-center justify-center w-full"
            )}>
                <div className={cx(
                    hFull ? 'h-full py-20 lg:py-0 lg:h-[90vh]' : 'h-[90vh]',
                    'bg-indigo-100 w-full rounded-md shadow flex flex-col items-center justify-center relative'
                )}>

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
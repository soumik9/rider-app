import CardLayout from '@components/CardLayout'
import RequiredAuth from '@components/RequiredAuth'
import Link from 'next/link'
import React from 'react'
import { BsCheckCircle } from 'react-icons/bs'

const CheckoutSuccess: React.FC = () => {
  return (
    <RequiredAuth>
      <CardLayout>
        <BsCheckCircle className='text-[30px] mb-2 text-indigo-500' />
        <p className='text-[22px] text-indigo-500 font-semibold'>Checkout Success</p>

        <Link href='/packages' className='text-indigo-500 hover:text-indigo-700 trans underline mt-10'>Back</Link>
      </CardLayout>
    </RequiredAuth>
  )
}

export default CheckoutSuccess
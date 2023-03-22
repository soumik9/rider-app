import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { AiFillCaretRight } from 'react-icons/ai';
import useAuth from 'src/hooks/useAuth';

type Props = {
    item: any;
}

const PItem = ({ item }: Props) => {

    // hooks
    const { loggedUser } = useAuth()

    // states
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<any>('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem('accessToken'));
        }
    }, [])

    const handleCheckout = (getData: any) => {

        const config = { headers: {
            'Authorization': `Bearer ${token}`
        } };

        const user = {
            name: loggedUser.name,
            email: loggedUser.email,
            _id: loggedUser._id,
        }

        setLoading(true);

        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}create-checkout-session`, { user, data: getData }, config)
            .then(res => {
                setLoading(false);
                if (res.data.success) {
                    toast.success(res.data.message);
                    window.location.href = res.data.url;
                } else {
                    toast.error(res.data.message);
                }
            }).catch((err) => console.log(err.message))
    }

    return (
        <div className='bg-indigo-200 p-5 rounded-md shadow flex flex-col items-center'>
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
                    onClick={() => handleCheckout(item)}
                    loading={loading}
                    disabled={loading}
                >
                    Buy Package
                </LoadingButton>
            </div>
        </div>
    )
}

export default PItem
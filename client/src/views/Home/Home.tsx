import CardLayout from '@components/CardLayout'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { AiFillCaretRight } from 'react-icons/ai'

const Home = () => {

    const router = useRouter();

    return (
        <CardLayout>
            <div className='flex flex-col gap-y-5'>
                <Button
                    variant="outlined"
                    size="large"
                    endIcon={<AiFillCaretRight />}
                    className='!border-indigo-500 !text-indigo-500'
                    onClick={() => router.push('/join-as-rider')}
                >
                    Join as a rider
                </Button>
                <Button
                    variant="contained"
                    size="large"
                    endIcon={<AiFillCaretRight />}
                    className='!bg-indigo-500'
                    onClick={() => router.push('/join')}
                >
                    Join as a Driving Lesson Learner.
                </Button>
            </div>
        </CardLayout>
    )
}

export default Home
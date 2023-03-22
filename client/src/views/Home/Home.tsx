import CardLayout from '@components/CardLayout'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { AiFillCaretRight } from 'react-icons/ai'
import { asLearner, asRider } from 'src/constants'
import { joinStep } from 'src/jotai/states'
import { useAtom } from 'jotai'
import Link from 'next/link'

const Home = () => {

    const router = useRouter();
    const [step, setStep] = useAtom(joinStep);

    return (
        <CardLayout>
            <div className='flex flex-col gap-y-5 px-5 lg:px-0'>
                <Button
                    variant="outlined"
                    size="large"
                    endIcon={<AiFillCaretRight />}
                    className='!border-indigo-500 !text-indigo-500'
                    onClick={() => {
                        setStep(asRider);
                        router.push('/join');
                    }}
                >
                    Join as a rider
                </Button>
                <Button
                    variant="contained"
                    size="large"
                    endIcon={<AiFillCaretRight />}
                    className='!bg-indigo-500'
                    onClick={() => {
                        setStep(asLearner);
                        router.push('/join');
                    }}
                >
                    Join as a Driving Lesson Learner
                </Button>

                <Link href='/login' className='text-center text-indigo-500 hover:text-indigo-700 trans underline'>Login Here</Link>

            </div>
        </CardLayout>
    )
}

export default Home
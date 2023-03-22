import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import useAuth from 'src/hooks/useAuth';
import Loading from './Loading';

type Props = {
    children: any;
}

const RequiredAuth = ({ children }: Props) => {

    const router = useRouter();
    let userId: string | null = '';

    const { logged, loggedUserLoading } = useAuth();
    if (typeof window !== 'undefined') {
        userId = localStorage.getItem('userId');
    }

    useEffect(() => {
        if (!userId || !logged) {
            router.push('/')
        }
    }, [])

    if(loggedUserLoading) return <Loading />

    return children;
}

export default RequiredAuth
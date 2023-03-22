import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import useAuth from 'src/hooks/useAuth';
import Loading from './Loading';

type Props = {
    children: any;
}

const IsLogged = ({ children }: Props) => {

    const router = useRouter();
    const { logged, loggedUserLoading, loggedUser } = useAuth();

    useEffect(() => {
        if (logged) {
            if (loggedUser.role === 'rider') {
                router.push('/profile')
            } 
            
            if (loggedUser.role === 'learner') {
                router.push('/packages')
            }
        }
    }, [logged, loggedUser.role])

    if (loggedUserLoading) return <Loading />

  return children;
}

export default IsLogged
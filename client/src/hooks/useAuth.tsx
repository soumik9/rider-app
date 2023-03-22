import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const useAuth = () => {

    const router = useRouter();

    let userId: string | null = '';

    const [loggedUser, setLoggedUser] = useState<any>({});
    const [logged, setLogged] = useState(true);
    const [loggedUserLoading, setLoggedUserLoading] = useState(false);

    if (typeof window !== 'undefined') {
        userId = localStorage.getItem('userId');
    }

    useEffect(() => {

        setLoggedUserLoading(true);

        if (userId) {
            fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}profile`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('userId');
                        router.push('/')
                        toast.error('Forbidden/Unauthorized access!');
                    }
                    return res.json();
                })
                .then(data => {
                    setLoggedUserLoading(false);
                    
                    if (data.success === true) {
                        setLoggedUser(data.data);
                        setLogged(true)
                    }

                    if (data.success === false) {
                        setLoggedUser({});
                        setLogged(false)
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('userId');
                        router.push('/')
                    }
                })
        } else {
            setLoggedUser({});
            setLogged(false);
            setLoggedUserLoading(false);
            // router.push('/')
        }
    }, [router, userId])

    return { loggedUser, logged, loggedUserLoading };
}

export default useAuth;
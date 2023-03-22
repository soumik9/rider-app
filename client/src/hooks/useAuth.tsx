import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const useAuth = () => {

    const router = useRouter();

    let userId: string | null = '';

    const [loggedUser, setLoggedUser] = useState({});
    const [logged, setLogged] = useState(true);
    const [loggedUserLoading, setLoggedUserLoading] = useState(true);

    if (typeof window !== 'undefined') {
        userId = localStorage.getItem('userId');
    }

    useEffect(() => {
        if (userId) {
            setLoggedUserLoading(true);

            fetch(`${process.env.REACT_APP_SERVER_URL}profile/${userId}`, {
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
                        toast.error('Forbidden/Unauthorized access!', { duration: 2000 });
                    }
                    return res.json();
                })
                .then(data => {
                    setLoggedUserLoading(false);

                    console.log(data)

                    if (data.success === true) {
                        setLoggedUser(data.user);
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
            setLogged(false)
            router.push('/')
        }
    }, [router, userId])

    return { loggedUser, logged, loggedUserLoading };
}

export default useAuth;
'use client';

// import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { refreshToken } from './utils/auth';

// import for cookies
import Cookies from 'js-cookie';

function header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const loggedIn = Cookies.get('access_token');
        if (loggedIn) {
            axios
                .get('http://127.0.0.1:8000/api/usr/profile', {
                    headers: {
                        Authorization: `Bearer ${loggedIn}`,
                    },
                })
                .then(response => {
                    setUser(response.data);
                })
                .catch(async error => {
                    if (error.response.status === 401) {
                        await refreshToken();
                        const newToken = Cookies.get('access_token');

                        if (newToken) {
                            axios
                                .get('http://127.0.0.1:8000/api/user/profile', {
                                    headers: {
                                        Authorization: `Bearer ${newToken}`,
                                    },
                                })
                                .then(response => {
                                    setUser(response.data);
                                })
                                .catch(err => {
                                    console.error(
                                        'Failed to fetch user data after refresh:',
                                        err,
                                    );
                                });
                        }
                    } else {
                        console.error('Failed to fetch user data:', error);
                    }
                });
        }
        if (loggedIn) {
            // set is logged in true
            setIsLoggedIn(true);
            // successfully checked if the user is logged in
            router.push('/');
        }
    }, []);

    return (
        <div className="w-full h-[100px] flex flex-row">
            <div className="flex flex-row justify-end">
                {isLoggedIn ? (
                    <div>
                        {user ? (
                            <div>
                                <h1>Welcome back, {user.first_name}!</h1>
                                {/* <p>Email: {user.email}</p> */}
                            </div>
                        ) : (
                            <div>no user data...</div>
                        )}
                    </div>
                ) : (
                    <div>
                        Please log in to see this content.
                        <div
                            className="flex flex-row justify-center 
                            w-[200px] h-full rounded-lg bg-purple-700 text-white
                        "
                        >
                            <Link href="/login">Login here</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default header;

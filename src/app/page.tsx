'use client';

// import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// components
import Header from '@/components/header';

// axios
import axios from 'axios';

import { refreshToken } from './api/refresh';

import Googlebutton from '@/components/googlebutton';

// import for cookies
import Cookies from 'js-cookie';

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();

    // use effect to check if the user is logged in
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
        <div className="grid grid-rows-[20px_1fr_20px] min-h-screen gap-16 sm:p-3 font-[family-name:var(--font-geist-sans)]">
            <Header />
            <div className="flex justify-center flex-row w-full">
                <h1 className="">Home Page</h1>
            </div>
        </div>
    );
}



'use client';

// import Image from "next/image";
import Link from 'next/link';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { refreshToken } from '@/app/api/refresh';

import checkUserAuthentication from '@/app/api/authentication';

// lazy component
const Loading = React.lazy(() => import('@/app/loading'));
// hooks
import useAuth from '@/app/api/useAuth';
// my components
import { getGoogleToken } from '@/app/api/google-login';
import { getCookie } from 'cookies-next';

import CookieChecker from '@/components/cookiechecker';

export default function Success() {
    const { user, loggedIn, loading, offline, error } = useAuth();

    const router = useRouter();

    
    useEffect(() => {
        const fetchData = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            if (code) {
                console.log(code);
                try {
                    await getGoogleToken(code);

                    // console.log(data);
                } catch (err) {
                    console.error('Error fetching Google token:', err);
                }
            } else {
                console.log('no need to run');
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const checkAccessToken = async () => {
            if (loggedIn) {
                if (user) {
                    router.push(`/profile/${user.id}`);
                }
            }
        };

        checkAccessToken();
    }, [router]);

    if (user) {
        return <CookieChecker />;
    }

    return (
        <div>
            {loading ? (
                <div>
                    <Loading />
                    <CookieChecker />
                    <p>Please wait while we load your data.</p>
                </div>
            ) : offline ? (
                <div>
                    <h1>Offline</h1>
                    <p>
                        You are currently offline. Please check your internet
                        connection.
                    </p>
                </div>
            ) : loggedIn ? (
                user ? (
                    <div>
                        {/* <h1>Welcome back, {user.username}!</h1>
                        <p>You are logged in.</p>
                        <p>Email: {user.email}</p> */}

                        <Link href={`/profile/${user.id}`}>got to profile</Link>
                    </div>
                ) : (
                    <div>
                        <h1>Welcome back!</h1>
                        <p>
                            You are logged in, but we couldn't retrieve your
                            user information.
                        </p>
                    </div>
                )
            ) : (
                <div>
                    <h1>Hello, Guest!</h1>
                    <p>Please log in to continue.</p>
                </div>
            )}
        </div>
    );
}

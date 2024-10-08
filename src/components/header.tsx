'use client';

// import Image from "next/image";
import Link from 'next/link';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { refreshToken } from '@/app/api/refresh';

import checkUserAuthentication from '@/app/api/authentication';

// import for cookies
import Cookies from 'js-cookie';

// lazy component
const Loading = React.lazy(() => import('@/app/loading'));
// hooks
import useAuth from '@/app/api/useAuth';
// my components
import Headerlinks from './headerlinks';
// import Googlebutton from './googlebutton';

export default function Header() {
    const { user, loggedIn, loading, offline, error } = useAuth();

    const router = useRouter();

    if (loading) {
        return <Loading />; // Display a loading state
    }

    if (offline) {
        <div>
            <Headerlinks />
        </div>;
        console.log('user offline');
    }

    if (error) {
        console.log(`we have an error ${error}`); // Display error if something went wrong
        <div>
            <Headerlinks />
        </div>;
        console.log('Please Log in again');
    }

    if (loggedIn) {
        {
            user ? router.push(`/profile/${user.id}`) : router.push(`/`);
        }
    }
    return (
        <div className="container mx-auto w-full h-[100px] flex flex-row">
            <div className="flex flex-col justify-center">
                {loading ? (
                    <div>Loading...</div>
                ) : offline ? (
                    <div>
                        <Headerlinks />
                    </div>
                ) : loggedIn ? (
                    <div>
                        {user ? (
                            <div className="flex flex-row justify-center">
                                <h1 className="flex flex-col justify-center">
                                    Welcome back, {user.first_name}!
                                </h1>
                                {/* You can include more user details if needed */}
                                {/* <p>Email: {user.email}</p> */}
                                <div
                                    className="flex flex-row justify-center ml-4 mr-4
                            w-[140px] h-[50px] rounded-[40px] text-white hover:bg-slate-900"
                                >
                                    <Link
                                        href="/feedback/1"
                                        className="flex flex-col justify-center"
                                    >
                                        feedback page
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div>No user data...</div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-row justify-start">
                        {/* <div
                            className="flex flex-row justify-center ml-4 mr-4
            w-[130px] h-[50px] rounded-[40px] text-white hover:bg-slate-700"
                        >
                            <Link
                                href="/"
                                className="flex flex-col justify-center"
                            >
                                Home
                            </Link>
                        </div>

                        <div
                            className="flex flex-row justify-center ml-4 mr-4
            w-[130px] h-[50px] rounded-[40px] text-white hover:bg-slate-900"
                        >
                            <Link
                                href="/login"
                                className="flex flex-col justify-center"
                            >
                                Login here
                            </Link>
                        </div> */}
                    </div>
                )}
            </div>
        </div>
    );
}


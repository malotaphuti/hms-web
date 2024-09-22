'use client';

// import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { refreshToken } from '@/app/utils/refresh';

import checkUserAuthentication from '@/app/utils/authentication';
import useAuth from '@/app/hooks/useAuth';

// import for cookies
import Cookies from 'js-cookie';

function header() {
    const { user, loggedIn, loading, error } = useAuth();

    if (loading) {
        return <p>Loading...</p>; // Display a loading state
    }

    if (error) {
        return <p>Error: {error}</p>; // Display error if something went wrong
    }

    return (
        <div className="container mx-auto w-full h-[100px] flex flex-row">
            <div className="flex flex-col justify-center">
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : loggedIn ? (
                    <div>
                        {user ? (
                            <div>
                                <h1>Welcome back, {user.first_name}!</h1>
                                {/* You can include more user details if needed */}
                                {/* <p>Email: {user.email}</p> */}
                            </div>
                        ) : (
                            <div>No user data...</div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-row justify-start">
                        <div
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
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default header;

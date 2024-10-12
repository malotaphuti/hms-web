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
import { Alert } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export default function Success() {
    const { user, loggedIn, loading, offline, error } = useAuth();

    const router = useRouter();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const urlParams = new URLSearchParams(window.location.search);
    //         const code = urlParams.get('code');

    //         if (code) {
    //             console.log(code);
    //             try {
    //                 await getGoogleToken(code);

    //                 // console.log(data);
    //             } catch (err) {
    //                 console.error('Error fetching Google token:', err);
    //             }
    //         } else {
    //             console.log('no need to run');
    //         }
    //     };

    //     fetchData();
    // }, []);

    // useEffect(() => {
    //     const checkAccessToken = async () => {
    //         if (loggedIn) {
    //             if (user) {
    //                 router.push(`/profile/${user.id}`);
    //             }
    //         }
    //     };

    //     checkAccessToken();
    // }, [router]);

    if (user) {
        return <CookieChecker />;
    }

    return (
        <div className="container h-svh">
            <div className="flex flex-row justify-center items-center h-[100px] w-full">
                <div
                    className="flex flex-row justify-center ml-4 mr-4 
            w-[130px] h-[50px] rounded-[40px] text-white hover:bg-slate-700"
                >
                    <Link href="/" className="flex flex-col justify-center">
                        Go back
                    </Link>
                </div>
            </div>
            <div className="flex flex-row justify-center items-center mt-5 w-full ">
                <div className="flex flex-col h-[400px] w-[350px] items-center justify-center rounded-[40px]">
                    <h1>error message or success</h1>
                    <Alert />
                    <Input
                        className="w-[300px] h-[40px] bg-slate-100 rounded-[40px] mt-3 mb-3"
                        placeholder="enter your student number here:"
                    />
                    <Button className="h-[50px] w-[200px] rounded-[50px]">
                        check
                    </Button>
                    <div className="h-auto w-full flex flex-row items-center mt-4 justify-center">
                        <p className="h-[50px] flex flex-col items-center justify-center mx-3">
                            remember me
                        </p>
                        <div className="h-[50px] flex flex-col items-center justify-center">
                            <Checkbox className=" bg-slate-200" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

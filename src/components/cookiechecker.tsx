'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/app/api/useAuth';
import Loading from '@/app/loading';

const CookieChecker = () => {
    const [cookieFound, setCookieFound] = useState(false);
    const { user } = useAuth();
    const router = useRouter();

    const checkForCookie = () => {
        const cookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('access_token'));
        if (cookie) {
            setCookieFound(true); // Cookie is found, stop checking
            // clearInterval(interval); // Clear the interval when cookie is found
            if (user) {
                router.push(`/profile/${user.id}`);
            }
        }
    };

    useEffect(() => {
        // Set up an interval to keep checking for the cookie
        const interval = setInterval(() => {
            checkForCookie();
        }, 2000); // Check every 2 seconds

        // Clean up interval on unmount
        return () => clearInterval(interval);
    }, []);

    if (user) {
        const interval = setInterval(() => {
            checkForCookie();
        }, 2000);
    }

    //   useEffect(() => {
    //     // Redirect to login page if the cookie is not found after some time
    //     if (!cookieFound) {
    //       router.push('/login'); // Redirect to login
    //     }
    //   }, [cookieFound, router]);

    return (
        <div>
            <Loading />
        </div>
    );
};

export default CookieChecker;

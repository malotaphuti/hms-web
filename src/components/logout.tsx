import React from 'react';

// router
import { useRouter } from 'next/navigation';

// cookies
import { getCookie, deleteCookie } from 'cookies-next';

// icons
import { MdOutlineLogout } from 'react-icons/md';

// ui components
import { Button } from './ui/button';

export default function logout() {
    const access_token = getCookie('access_token');
    const refresh_token = getCookie('refresh_token');

    const router = useRouter();

    const handleLogout = () => {
        if (access_token) {
            deleteCookie('access_token');
            router.push('/');
        } else if (refresh_token) {
            deleteCookie('refresh_token');
            router.push('/');
        } else {
            console.log('user not logged in');
        }
    };
    return (
        <div>
            <Button
                className='flex flex-row justify-center ml-4 mr-4 
                            w-[50px] h-[50px] rounded-[50px] text-white hover:bg-slate-700"'
                onClick={handleLogout}
            >
                <MdOutlineLogout />
            </Button>
        </div>
    );
}

'use client';

import useAuth from '@/app/api/useAuth';
import { useRouter } from 'next/navigation';
import React from 'react';

// components
import Logout from '@/components/logout';
import { Label } from '@/components/ui/label';

export default function profile() {
    const { user, loggedIn, loading, offline, error } = useAuth();

    const router = useRouter();

    if(loggedIn){
        return (
            <div>
                <div className='h-[50px] w-[200px] px-4 flex flex-row justify-between'>
                <Label className='flex flex-col items-center h-[50px]'>
                    Logout here:
                </Label>
                <Logout />
                </div>
            </div>
        );
    }
}

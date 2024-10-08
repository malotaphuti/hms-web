'use client';

import useAuth from '@/app/api/useAuth';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function profile() {
    const { user, loggedIn, loading, offline, error } = useAuth();

    const router = useRouter();

    if (offline) {
        //pass
    }
    return <div>welcome</div>;
}

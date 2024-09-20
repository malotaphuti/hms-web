'use client';

// import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

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
            axios.get('http://127.0.0.1:8000/api/usr/profile', {
                headers: {
                    Authorization: `Bearer ${loggedIn}`,
                },
            }).then(response => {
                setUser(response.data);
            }).catch(error => {
                console.error('Failed to fetch user data:', error);
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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="">
        Nah Bro thought he won
      </h1>

      {isLoggedIn ? (
          <div>
            {user ? (
                <div>
                    <h1>Welcome back, {user.first_name}!</h1>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
          </div>
          ) : (
          <div>
            Please log in to see this content.
            <Link href="/login">
              Login here
            </Link>
          </div>
      )}

      
    </div>
  );
}

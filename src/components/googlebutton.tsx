// components/GoogleLoginButton.js
'use client';

import React, { useEffect, useState } from 'react';

import { Input } from './ui/input';
import { Button } from './ui/button';

import { googlelogin } from '@/app/api/google-login';

export default function googlebutton() {
    const [formHtml, setFormHtml] = useState<string | null>(null);
    const [csrf_token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const handleForm = async () => {
            // try {
            //     const parser = new DOMParser();
            //     const doc = parser.parseFromString(
            //         (await googlelogin()).url,
            //         'text/html',
            //     );
            //     // console.log(doc);
            //     // const data_ = (await googlelogin()).token;
            //     // console.log(data_);
            //     // console.log(`still getting:${(await googlelogin()).url}`);
            //     const form = doc.querySelector('form');
            //     if (form) {
            //         setFormHtml(form.outerHTML); // Extract form's HTML
            //         // setToken((await googlelogin()).token);
            //     }
            // } catch (error) {
            //     console.error('Error fetching HTML:', error);
            // }
            // const clientId =
            //     '979126883974-8n6macqjc0uibb9hit6188i8bqs7vjb8.apps.googleusercontent.com';
            // const redirectUri = 'http://localhost:8000/google/callback'; // Replace with your redirect URI
            // const scope = 'profile email'; // Specify the Google scopes you need
            // const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=online`;
            // window.location.href = googleOAuthUrl;
            // const response = await fetch('/api/google-login');
            // const data = await response.json();
            // window.location.href = data.url;
        };

        handleForm();
    }, []);

    const handleRedirect = async () => {
        const clientId =
            '979126883974-8n6macqjc0uibb9hit6188i8bqs7vjb8.apps.googleusercontent.com';
        const redirectUri =
            'http://localhost:8000/accounts/google/login/callback/'; // Replace with your redirect URI
        const scope = 'profile email'; // Specify the Google scopes you need

        const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=online`;

        window.location.href = googleOAuthUrl;

        // const response = await fetch('/api/google-login');
        // const data = await response.json();
        // window.location.href = data.url;
    };

    return (
        <div>
            <div>
                {formHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: formHtml }} />
                ) : (
                    <p>Loading form...</p>
                )}
                {/* <button onClick={handleForm}>Continue with Google</button> */}
            </div>
            <div>
                <h1>Sign In Via Google</h1>

                <form
                    method="post"
                    action="https://accounts.google.com/o/oauth2/v2/auth"
                >
                    {/* {csrf_token && (
                        <Input
                            type="hidden"
                            name="csrfmiddlewaretoken"
                            value={csrf_token}
                        />
                    )} */}

                    <Button type="submit">Continue</Button>
                </form>

                <button onClick={handleRedirect}>Continue with Google</button>
            </div>
        </div>
    );
}

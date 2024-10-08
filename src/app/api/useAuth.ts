import { useEffect, useState } from 'react';
import axios from 'axios';
import { refreshToken } from '@/app/api/refresh';
import { getCookie } from 'cookies-next';

interface User {
    id: number;
    username: string;
    email: string;
    // Add other user fields if needed
}

interface AuthState {
    user: User | null;
    loggedIn: boolean;
    loading: boolean;
    offline: boolean,
    error: string | null;
}

const useAuth = () => {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        loggedIn: false,
        loading: true,
        offline: true,
        error: null,
    });
    const csrfToken = getCookie('csrftoken');
    const access_token = getCookie('access_token');

    const checkUserAuthentication = async () => {
        try {
            // Make request to your API to get the user profile
            const response = await axios.get<User>('http://127.0.0.1:8000/api/usr/profile', {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'X-CSRFToken': csrfToken || '', // Include CSRF token if needed
                },
            });
            // On successful response, update the state with user data
            setAuthState({
                user: response.data,
                loggedIn: true,
                loading: false,
                offline: false,
                error: null,
            });

        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                // Attempt to refresh token if authentication fails
                try {
                    await refreshToken();
                    const newAccessToken = getCookie('access_token');

                    if (newAccessToken) {
                        const retryResponse = await axios.get<User>('http://127.0.0.1:8000/api/usr/profile', {
                            headers: {
                                'Authorization': `Bearer ${newAccessToken}`,
                                'X-CSRFToken': csrfToken || '',
                            },
                        });
                        setAuthState({
                            user: retryResponse.data,
                            loggedIn: true,
                            loading: false,
                            offline: false,
                            error: null,
                        });
                    } else {
                        setAuthState({ user: null, loggedIn: false, loading: false,offline: true, error: 'Token refresh failed' });
                    }
                } catch (refreshError) {
                    setAuthState({ user: null, loggedIn: false, loading: false,offline: true, error: 'Token refresh failed' });
                }
            } else {
                setAuthState({
                    user: null,
                    loggedIn: false,
                    loading: false,
                    offline: true,
                    error: error.message || 'Error fetching user data',
                });
            }
        }
    };

    // Run checkUserAuthentication when the component mounts
    useEffect(() => {
        checkUserAuthentication();
    }, []);

    return authState;
};

export default useAuth;

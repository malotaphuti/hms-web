import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { refreshToken } from '@/app/utils/refresh';

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
    error: string | null;
}

const useAuth = () => {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        loggedIn: false,
        loading: true,
        error: null,
    });

    const checkUserAuthentication = async () => {
        const accessToken = Cookies.get('access_token');
        const csrfToken = Cookies.get('csrftoken');

        try {
            // Make request to your API to get the user profile
            const response = await axios.get<User>('http://127.0.0.1:8000/api/usr/profile', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'X-CSRFToken': csrfToken || '', // Include CSRF token if needed
                },
            });

            // On successful response, update the state with user data
            setAuthState({
                user: response.data,
                loggedIn: true,
                loading: false,
                error: null,
            });
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                // Attempt to refresh token if authentication fails
                try {
                    await refreshToken();
                    const newAccessToken = Cookies.get('access_token');

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
                            error: null,
                        });
                    } else {
                        setAuthState({ user: null, loggedIn: false, loading: false, error: 'Token refresh failed' });
                    }
                } catch (refreshError) {
                    setAuthState({ user: null, loggedIn: false, loading: false, error: 'Token refresh failed' });
                }
            } else {
                setAuthState({
                    user: null,
                    loggedIn: false,
                    loading: false,
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

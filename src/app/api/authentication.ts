import axios from 'axios';
import Cookies from 'js-cookie';
import { refreshToken } from './refresh';

async function checkUserAuthentication() {
    const sessionId = Cookies.get('access_token');
    const csrf = Cookies.get('csrftoken');

    console.log(`access_token: ${sessionId}`);
    Cookies.remove('messages');
    Cookies.remove('sessionid');

    if (!sessionId) {
        console.log('No access token found.');
        return { loggedIn: false, user: null };
    }else{
        try {
            // Attempt to get the user profile with the current access token
            const response = await axios.get('http://127.0.0.1:8000/api/usr/profile', {
                headers: {
                    'Authorization': `Bearer ${sessionId}`,
                },
            });
    
            console.log('API response data:', response.data);  // Check if user data is returned
            return { loggedIn: false, user: response.data};
        } catch (error) {
            console.error('Initial request failed:', error.response ? error.response.data : error);
    
            if (error.response && error.response.status === 401) {
                console.log('Token expired, attempting to refresh...');
                
                await refreshToken();  // Call refresh token logic
    
                const newToken = Cookies.get('access_token');
                if (!newToken) {
                    console.log('Token refresh failed.');
                    return { loggedIn: false, user: null };
                }
    
                // Retry fetching user data with the new token
                try {
                    const response = await axios.get('http://127.0.0.1:8000/api/usr/profile', {
                        headers: {
                            'Authorization': `Bearer ${newToken}`,
                        },
                    });
                    console.log('User data after refresh:', response.data);  // Check if user data is returned
                    return { loggedIn: true, user: response.data };
                } catch (err) {
                    console.error('Failed to fetch user data after refresh:', err);
                    return { loggedIn: false, user: null };
                }
            } else {
                console.error('Failed to fetch user data:', error);
                return { loggedIn: false, user: null };
            }
        }
    }

    
}

export default checkUserAuthentication;

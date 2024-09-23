import axios from "axios";
// import cheerio from 'cheerio';

// interface Url {
//     url: string;
//     // Add other user fields if needed
// }

async function googlelogin() {

    const url = 'http://localhost:8000/accounts/google/login/';

    console.log('from the frontend API request');

    // const response = await axios.get<Url>(url);
    const response = await axios.get(url);

    // console.log(`the OG:${response.data}`);

    // Use cheerio to load the HTML and extract the CSRF token
    // const $ = cheerio.load(response.data);

    // Find the input with the CSRF token
    // const csrfToken = $('input[name="csrfmiddlewaretoken"]').val();

    // console.log(`Extracted CSRF token: ${csrfToken}`);

    // return { token:csrfToken, url: response.data };
    return {url: response.data };

}

export { googlelogin };
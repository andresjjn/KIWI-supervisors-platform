var axios = require("axios").default;

/**
 * getUsers - Get all users accounts from Auth0
 */
export default async function getUsers() {
    var options = {
        method: 'GET',
        url: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users`,
        headers: { authorization: `Bearer ${process.env.REACT_APP_MGMT_API_ACCESS_TOKEN}` }
    };

    try {
        const res = await axios.request(options);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

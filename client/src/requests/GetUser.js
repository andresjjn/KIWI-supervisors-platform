var axios = require("axios").default;

export default async function getUser(user_id) {
    var options = {
        method: 'GET',
        url: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${user_id}`,
        headers: { authorization: `Bearer ${process.env.REACT_APP_MGMT_API_ACCESS_TOKEN}` },
    };

    try {
        const res = await axios.request(options);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

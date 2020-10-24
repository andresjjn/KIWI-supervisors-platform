var axios = require("axios");

export default async function getRole(user_id) {
    var options = {
        method: 'GET',
        url: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${user_id}/roles`,
        headers: { authorization: `Bearer ${process.env.REACT_APP_MGMT_API_ACCESS_TOKEN}` },
        scope: 'read:users read:roles'
    };

    try {
        const res = await axios.request(options)
        return res.data[0].name;
    } catch (error) {
        console.log(error);
        return false;
    }
}

var axios = require("axios");

export default async function editUser(user_id, checked) {
    console.log(user_id);
    const role = (checked) ? "supervisor" : "pending";
    var options = {
        method: 'PATCH',
        url: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${user_id}/`,
        headers: { authorization: `Bearer ${process.env.REACT_APP_MGMT_API_ACCESS_TOKEN}`, 'content-type': 'application/json'},
        scope: 'update:users',
        data: {"user_metadata": {"role": {role}}}
    };
    try {
        const res = await axios.request(options)
        console.log(res.data);
    } catch (error) {
        console.log(error);
        return false;
    }
}


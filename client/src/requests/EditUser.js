var axios = require("axios");

export default async function editUser(user_id, checked) {
    const role = (checked) ? "supervisor" : "pending";
    var options = {
        method: 'PATCH',
        url: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${user_id}`,
        headers: {authorization: `Bearer ${process.env.REACT_APP_MGMT_API_ACCESS_TOKEN}`, "content-type": "application/json"},
        scope: 'update:users update:users_app_metadata',
        data: {user_metadata: {role: role}}
    };

    try {
        await axios.request(options)
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

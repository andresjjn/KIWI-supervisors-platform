var axios = require("axios");

export default async function getSupervisors(users) {
    let arr = [];
    for (let i = 0; i < users.length; i++) {
        var options = {
            method: 'GET',
            url: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${users[i].user_id}/roles`,
            headers: { authorization: `Bearer ${process.env.REACT_APP_MGMT_API_ACCESS_TOKEN}` },
            scope: 'read:users read:roles'
        };

        try {
            const res = await axios.request(options)
            if (res.data[0].name !== 'administrator') {arr.push(users[i])}
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    return arr;
}

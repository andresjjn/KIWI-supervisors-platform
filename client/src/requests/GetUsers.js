import axios from 'axios'

const getUsers = async() => {
    var config = {
        method: "get",
        url: `${process.env.REACT_APP_API_URL}users/`,
        headers: {},
    };

    try {
        const res = await axios(config);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export default getUsers;


import axios from 'axios'

const getUsers = () => {
    var config = {
        method: "get",
        url: `${process.env.REACT_APP_API_URL}users/`,
        headers: {},
    };

    axios(config)
        .then(function (response) {
            console.log(response.data);
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
};

export default getUsers;



var axios = require("axios");

const getDaysRequest = () => {
    var config = {
        method: "get",
        url: "http://localhost:5000/api/v1/days/",
        headers: {},
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
};

export default getDaysRequest;

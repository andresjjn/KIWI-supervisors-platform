var axios = require("axios");

/**
 * postDays - Create Days on Database
 * @param {number[]} daysInfo Day to create
 * @param {number[]} hourInfo Hours to Create
 * @param {number} available Supervisors per Hour
 */
const postDays = async(daysInfo, hourInfo, available) => {
    for (const day of daysInfo) {
        for (const hour of hourInfo) {
            const dataHour = `{\n    "hour": ${hour},\n    "available": ${available}\n}`;
            console.log(dataHour);

            const configHour = {
                method: "post",
                url: `${process.env.REACT_APP_API_URL}days/${day}/hours`,
                headers: {
                    "Content-Type": "application/json",
                },
                data: dataHour,
            };

            await axios(configHour)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
};

export default postDays;

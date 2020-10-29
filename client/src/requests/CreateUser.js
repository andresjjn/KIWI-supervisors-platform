import Swal from "sweetalert2";

var axios = require("axios");

const CreateUser = async () => {
    const { value: formValues } = await Swal.fire({
        title: 'Multiple inputs',
        html:
            '<input id="Nombre" type="text" class="swal2-input">' +
            '<input id="Email" type="text" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById('Nombre').value,
                document.getElementById('Email').value
            ]
        }
    })

    if (formValues[0] !== undefined && formValues[1] !== undefined) {
        console.log(JSON.stringify(formValues))
        // var options = {
        //     method: 'POST',
        //     url: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users`,
        //     headers: { authorization: `Bearer ${process.env.REACT_APP_MGMT_API_ACCESS_TOKEN}`, "content-type": "application/json" },
        //     scope: 'create:users',
        //     data: userdata,
        // };

        // try {
        //     const res = await axios.request(options)
        //     console.log(res);
        //     return true;
        // } catch (error) {
        //     console.log(error);
        //     return false;
        // }

        var options = {
            method: 'POST',
            url: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users`,
            headers: { authorization: `Bearer ${process.env.REACT_APP_MGMT_API_ACCESS_TOKEN}`, 'content-type': 'application/json' },
            data: {
                email: 'jane.doe@example.com',
                user_metadata: { hobby: 'surfing' },
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }


}

export default CreateUser;


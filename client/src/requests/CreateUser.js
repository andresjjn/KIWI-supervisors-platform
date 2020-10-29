import Swal from "sweetalert2";

var axios = require("axios");

const CreateUser = async () => {
    const { value: formValues } = await Swal.fire({
        title: 'Multiple inputs',
        allowOutsideClick: false,
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

    if (formValues !== undefined) {
        console.log(JSON.stringify(formValues))
        // var options = {
        //     method: 'POST',
        //     url: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users`,
        //     headers: { authorization: `Bearer ${process.env.REACT_APP_MGMT_API_ACCESS_TOKEN}`, "content-type": "application/json" },
        //     scope: 'create:users',
        //     data: userdata,
        // };

        var options = {
            method: 'POST',
            url: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users`,
            headers: { 'content-type': 'application/json', authorization: `Bearer ${process.env.REACT_APP_MGMT_API_ACCESS_TOKEN}` },
            scope: "create:users",
            connection: "Initial-Connection",
            data: {
                "connection": "Username-Password-Authentication",
                "email": "andersenpiano@gmail.com",
                "password": "1234",
                "user_metadata": {
                    "role": "supervisor"
                },
                "email_verified": false,
                "verify_email": false,
                "app_metadata": {}
            }
        };

        try {
            const res = await axios.request(options)
            console.log(res);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default CreateUser;


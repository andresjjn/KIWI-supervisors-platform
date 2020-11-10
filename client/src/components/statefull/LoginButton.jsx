import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function LoginButton () {
    // get info from Auth0 authentication
    const { loginWithRedirect } = useAuth0();

    // render login button in Auth0 authentication main view
    return (
        <button onClick={() => loginWithRedirect()}>Iniciar Sesion</button>
    );
};

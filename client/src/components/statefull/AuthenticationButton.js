import React from "react";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

import { useAuth0 } from "@auth0/auth0-react";

const AuthenticationButton = () => {
    // get info of user account in session from Auth0
    const { isAuthenticated } = useAuth0();

    // return Logout or Login depending of user authentication
    return isAuthenticated ? <LogoutButton /> : <LoginButton />;
};

// export component
export default AuthenticationButton;

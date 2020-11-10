import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

/**
 * LogoutButton - Redirect user to Auth0 login authentication
 */
export default function LogoutButton() {
    // get info from Auth0
    const { logout } = useAuth0();

    return (
        <button
            onClick={() =>
                logout({
                    returnTo: window.location.origin,
                })
            }
        >
            Log Out
        </button>
    );
}

import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
    const user = useAuth0();
    return user;
};

export default LogoutButton;

import React from "react";
import "./Logout.css";
import LogoutIcon from "../../../images/logout.svg";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";

export default function LogoutButton() {
    const { logout } = useAuth0();
    return (
        <div className="logout">
            <img
                onClick={() => {
                    Swal.fire({
                        title: "Quieres cerrar sesión?",
                        showDenyButton: true,
                        showConfirmButton: false,
                        showCancelButton: true,
                        denyButtonText: `Salir`,
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isDenied) {
                            logout({
                                returnTo: window.location.origin,
                            });
                        }
                    });
                }}
                className="logout_icon"
                src={LogoutIcon}
                alt=""
            ></img>
        </div>
    );
}

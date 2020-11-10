import React from "react";
import LogoutIcon from "../../../images/logout.svg";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";


/**
 * Function that return the logout button component.
 */
export default function LogoutButton() {
    const { logout } = useAuth0();
    return (
        <div className="logout" onClick={() => {
            Swal.fire({
                title: "Quieres cerrar sesión?",
                heightAuto: false,
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
        }}>
            <img className="logout_icon"
                src={LogoutIcon}
                alt=""
            ></img>
            <div className={"text_logout"}>
                <p>Salir</p>
            </div>
        </div>
    );
}

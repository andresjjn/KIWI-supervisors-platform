import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
require("dotenv").config();

/**
 * Render single view app, using Auth0 for authentication
 */
ReactDOM.render(
    <React.StrictMode>
        <Auth0ProviderWithHistory>
            <App />
        </Auth0ProviderWithHistory>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

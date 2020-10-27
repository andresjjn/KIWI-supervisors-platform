import React from "react";
import "./App.css";
import Navbar from "./components/statefull/NavBar";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import InfoBar from "./components/statefull/info_bar/InfoBar";
import MainTable from "./components/statefull/main_table/MainTable";
import { Provider } from 'react-redux';
import store from './Store'

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Navbar />
                <div className="main_section">
                    <InfoBar />
                    <MainTable />
                </div>
            </div>
        </Provider>
    );
}

export default withAuthenticationRequired(App);

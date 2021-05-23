import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useCookies } from "react-cookie";

function Logout() {
    // eslint-disable-next-line
    const [ _, __, removeCookie ] = useCookies(["token"]);
    useEffect(() => {
        removeCookie("token");
        window.location.href = "/";
    }, [removeCookie]);
    return (
        <>
            <Helmet>
                <title>Zwitter | Logout</title>
            </Helmet>
            <h1>Loading...</h1>
        </>
    );
};

export default Logout;
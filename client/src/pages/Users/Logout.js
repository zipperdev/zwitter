import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

function Signup() {
    // eslint-disable-next-line
    const [ _, __, removeCookie ] = useCookies(["token"]);
    useEffect(() => {
        removeCookie("token");
        window.location.href = "/";
    }, []);
    return (
        <h1>Loading...</h1>
    );
};

export default Signup;
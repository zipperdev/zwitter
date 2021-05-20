import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useCookies } from "react-cookie";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

function Login() {
    const [ user, setUser ] = useState({
        email: "", 
        password: ""
    });
    // eslint-disable-next-line
    const [ cookies, setCookie ] = useCookies(["token"]);
    const login = () => {
        axios({
                url: "http://localhost:5000/login", 
                method: "POST", 
                data: user
            })
            .then(result => {
                if (result.data.success) {
                    setCookie("token", result.data.token, {
                        maxAge: 1209600000, 
                        path: "/"
                    });
                    window.location.href = "/";
                } else {
                    alert("Fail to login and save some cookies.");
                }
            });
    };
    return (
        <>
            <Helmet>
                <title>Zwitter | Login</title>
            </Helmet>
            <h1>Login</h1>
            <form noValidate autoComplete="off">
                <TextField type="email" className="outlined-basic" label="Email" variant="outlined" value={user.email} required onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                }} />
                <TextField type="password" className="outlined-basic" label="Password" variant="outlined" value={user.password} required onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                }} />
                <Button variant="contained" onClick={login}>
                    Login
                </Button>
            </form>
        </>
    );
};

export default Login;
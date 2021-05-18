import React, { useState } from "react";
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
        axios.post("http://localhost:5000/login", user)
            .then(result => {
                if (result.data.success) {
                    setCookie("token", result.data.token, {
                        maxAge: 1209600000
                    });
                    window.location.href = "/";
                } else {
                    alert("Fail to login and save some cookies.");
                }
            });
    };
    return (
        <>
            <h1>Login</h1>
            <form noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Email" variant="outlined" value={user.email} required onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                }} />
                <TextField id="outlined-basic" label="Password" variant="outlined" value={user.password} required onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                }} />
                <Button variant="contained" color="primary" onClick={login}>
                    Login
                </Button>
            </form>
        </>
    );
};

export default Login;
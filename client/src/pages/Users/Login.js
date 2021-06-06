import React, { useRef, useState } from "react";
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
    const emailInputEl = useRef("");
    const passwordInputEl = useRef("");
    // eslint-disable-next-line
    const [ cookies, setCookie ] = useCookies(["token"]);
    const login = () => {
        axios({
                url: "http://localhost:5000/login", 
                method: "POST", 
                data: user
            })
            .then(result => {
                setCookie("token", result.data.token, {
                    maxAge: 1209600000, 
                    path: "/"
                });
                window.location.href = "/";
            })
            .catch((error) => {
                if (JSON.stringify(error).match(/404/g)) {
                    alert("Not existing user");
                } else if (JSON.stringify(error).match(/403/g)) {
                    alert("Password not match");
                };
            });
    };
    return (
        <>
            <Helmet>
                <title>Zwitter | Login</title>
            </Helmet>
            <h1>Login</h1>
            <form onSubmit={e => e.preventDefault()} noValidate autoComplete="off">
                <TextField ref={emailInputEl} error={user.email.trim() === "" || !user.email.match(/(?<=@).{1,}(?=\..)/g)} helperText={user.email.trim() === "" ? "This field is required." : !user.email.match(/(?<=@).{1,}(?=\..)/g) ? "Please write your email correctly." : " "} type="email" className="outlined-basic" label="Email" variant="outlined" value={user.email} onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                }} />
                <TextField ref={passwordInputEl} error={user.password.trim() === ""} helperText={user.password.trim() === "" ? "This field is required." : " "} type="password" className="outlined-basic" label="Password" variant="outlined" value={user.password} onChange={(e) => {
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
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useCookies } from "react-cookie";
import TextField from "../components/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

function Login() {
    const [ user, setUser ] = useState({
        email: "", 
        password: ""
    });
    const [ emailInputSets, setEmailInputSets ] = useState({
        errorType: "email", 
        errorObj: {}
    });
    const [ passwordInputSets, setPasswordInputSets ] = useState({
        errorType: "required", 
        errorObj: {}
    });
    // eslint-disable-next-line
    const [ cookies, setCookie ] = useCookies(["token"]);
    const login = () => {
        if (Object.values(user).every(value => value) && user.email.match(/(?<=@).{1,}(?=\..)/g)) {
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
                .catch(error => {
                    if (JSON.stringify(error).match(/404/g)) {
                        setEmailInputSets({
                            errorType: "", 
                            errorObj: {
                                error: true, 
                                message: "Can't find user has this email."
                            }
                        });
                    } else if (JSON.stringify(error).match(/403/g)) {
                        setPasswordInputSets({
                            errorType: "", 
                            errorObj: {
                                error: true, 
                                message: "Password doesn't match."
                            }
                        });
                    };
                });
        };
    };
    return (
        <>
            <Helmet>
                <title>Zwitter | Login</title>
            </Helmet>
            <h1>Login</h1>
            <form onSubmit={e => e.preventDefault()} noValidate autoComplete="off">
                <TextField type="email" errorType={emailInputSets.errorType} errorObj={emailInputSets.errorObj} label="Email" value={user.email} onChange={(e) => {
                    setEmailInputSets({
                        errorType: "email", 
                        errorObj: {}
                    });
                    setUser({ ...user, email: e.target.value });
                }} />
                <TextField type="password" errorType={passwordInputSets.errorType} errorObj={passwordInputSets.errorObj} label="Password" value={user.password} onChange={(e) => {
                    setPasswordInputSets({
                        errorType: "required", 
                        errorObj: {}
                    });
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
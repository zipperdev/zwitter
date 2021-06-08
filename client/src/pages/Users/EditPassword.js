import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useCookies } from "react-cookie";
import TextField from "../components/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import jwt from "jsonwebtoken";

function EditPassword({ match }) {
    const [ cookies, setCookie, removeCookie ] = useCookies(["token"]);
    const [ passwords, setPasswords ] = useState({
        password: "", 
        confirmPassword: ""
    });
    const [ key, setKey ] = useState("");
    const [ keyInputSets, setKeyInputSets ] = useState({
        errorType: "required", 
        errorObj: {}
    });
    useEffect(() => {
        if (jwt.decode(cookies.token)) {
            if (jwt.decode(cookies.token).user._id !== match.params.id) {
                window.location.href = "/";
            };
        } else {
            window.location.href = "/";
        };
    }, [cookies.token, match.params.id]);
    const editPassword = () => {
        if (Object.values(passwords).every(value => value) && key.trim() && passwords.password.trim().length >= 8 && passwords.password.trim().match(/[!@#$%^&*()\-_=+[\]{}\\|;:'"<>,./?`~]/g)) {
            axios({
                    url:  `http://localhost:5000/users/${match.params.id}/edit/password`, 
                    method: "PUT", 
                    data: passwords, 
                    headers: {
                        token: cookies.token, 
                        key
                    }
                })
                .then(result => {
                    removeCookie("token", {
                        path: "/"
                    });
                    setCookie("token", result.data.token, {
                        maxAge: 1209600000, 
                        path: "/"
                    });
                    window.location.href = `/users/${match.params.id}`;
                })
                .catch(error => {
                    setKeyInputSets({
                        errorType: "", 
                        errorObj: {
                            error: true, 
                            message: "Old Password doesn't match."
                        }
                    });
                });
        };
    };
    return (
        <>
            <Helmet>
                <title>Zwitter | Edit Password</title>
            </Helmet>
            <h1>Edit Password</h1>
            <form onSubmit={e => e.preventDefault()} noValidate autoComplete="off">
                <TextField type="password" errorType="password" label="New Password" value={passwords.password} onChange={(e) => {
                    setPasswords({ ...passwords, password: e.target.value});
                }} />
                <TextField type="password" errorType="comfrimPassword" label="New Password Confrim" value={passwords.confirmPassword} subValue={passwords.password} onChange={(e) => {
                    setPasswords({ ...passwords, confirmPassword: e.target.value});
                }} />
                <TextField type="password" errorType={keyInputSets.errorType} errorObj={keyInputSets.errorObj} label="Old Password For Register" value={key} onChange={(e) => {
                    setKeyInputSets({
                        errorType: "required", 
                        errorObj: {}
                    });
                    setKey(e.target.value);
                }} />
                <Button variant="contained" onClick={editPassword}>
                    Edit Password
                </Button>
            </form>
        </>
    );
};

export default EditPassword;
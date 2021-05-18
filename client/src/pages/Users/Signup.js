import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

function Signup() {
    const [ user, setUser ] = useState({
        email: "", 
        name: "", 
        username: "", 
        password: "", 
        confrimPassoword: "", 
        location: ""
    });
    const signup = () => {
        if (user.password !== user.confrimPassoword) {
            alert("Password confriment doesn't match.");
        } else {
            axios.post("http://localhost:5000/signup", user)
                .then((user) => {
                    window.location.href = "/login";
                });
        };
    };
    return (
        <>
            <h1>Sign Up</h1>
            <form noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Name" variant="outlined" value={user.name} required onChange={(e) => {
                    setUser({ ...user, name: e.target.value });
                }} />
                <TextField id="outlined-basic" label="Useraname" variant="outlined" value={user.username} required onChange={(e) => {
                    setUser({ ...user, username: e.target.value });
                }} />
                <TextField id="outlined-basic" label="Email" variant="outlined" value={user.email} required onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                }} />
                <TextField id="outlined-basic" label="Password" variant="outlined" value={user.password} required onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                }} />
                <TextField id="outlined-basic" label="Password Confrim" variant="outlined" value={user.confrimPassoword} required onChange={(e) => {
                    setUser({ ...user, confrimPassoword: e.target.value });
                }} />
                <TextField id="outlined-basic" label="Location" variant="outlined" value={user.location} required onChange={(e) => {
                    setUser({ ...user, location: e.target.value });
                }} />
                <Button variant="contained" color="primary" onClick={signup}>
                    Sign Up
                </Button>
            </form>
        </>
    );
};

export default Signup;
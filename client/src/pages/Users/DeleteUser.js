import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useCookies } from "react-cookie";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import jwt from "jsonwebtoken";

function DeleteUser({ match }) {
    // eslint-disable-next-line
    const [ cookies, _, __ ] = useCookies(["token"]);
    const [ done, setDone ] = useState(false);
    useEffect(() => {
        if (jwt.decode(cookies.token).user._id !== match.params.id) {
            window.location.href = "/";
        } else {
            setDone(true);
        };
    }, [cookies.token, match.params.id]);
    const [ deleteJson, setDeleteJson ] = useState({
        key: ""
    });
    const deleteUser = () => {
        axios({
                url: `http://localhost:5000/users/${match.params.id}/delete`, 
                method: "DELETE",
                headers: {
                    token: cookies.token, 
                    key: deleteJson.key
                }
            })
            .then(result => {
                window.location.href = "/logout";
            });
    };
    return (
        <>
            <Helmet>
                <title>Zwitter | Delete User</title>
            </Helmet>
            {done ? (
                <form noValidate autoComplete="off">
                    <TextField type="password" className="outlined-basic" label="Password" variant="outlined" value={deleteJson.key} required onChange={(e) => {
                        setDeleteJson({ ...deleteJson, key: e.target.value });
                    }} />
                    <Button variant="contained" onClick={deleteUser}>
                        Delete User
                    </Button>
                </form>
            ) : (
                <></>
            )}
        </>
    );
};

export default DeleteUser;
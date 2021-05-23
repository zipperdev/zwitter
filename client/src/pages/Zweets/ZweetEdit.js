import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useCookies } from "react-cookie";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import jwt from "jsonwebtoken";

function ZweetCreate({ match }) {
    const [ cookies ] = useCookies(["token"]);
    const decodedToken = jwt.decode(cookies.token);
    const [ zweet, setZweet ] = useState({
        title: "", 
        description: "", 
        hashtags: ""
    });
    useEffect(() => {
        axios({
                url: `http://localhost:5000/zweets/${match.params.id}`, 
                method: "GET"
            })
            .then((zweetData) => {
                if (zweetData.data.owner._id == decodedToken.user._id) {
                    setZweet({ ...zweetData.data, hashtags: zweetData.data.hashtags.join(",") });
                } else {
                    window.location.href = `/zweets/${match.params.id}`;
                };
            });
    }, [match.params.id]);
    const updateZweet = () => {
        axios({
                url: `http://localhost:5000/zweets/${match.params.id}/edit`, 
                method: "POST", 
                headers: {
                    token: cookies.token
                }, 
                data: zweet
            })
            .then((zweet) => {
                window.location.href = `/zweets/${zweet.data._id}`;
            });
    };
    return (
        <>
            <Helmet>
                <title>Zwitter | Edit {zweet.title ? zweet.title : "Zweet"}</title>
            </Helmet>
            <h1>Update Zweet</h1>
            <form noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Title" variant="outlined" defaultValue="Write Title" value={zweet.title} required onChange={(e) => {
                    e.target.value = e.target.value.slice(0, 100);
                    setZweet({ ...zweet, title: e.target.value });
                }} />
                <TextField id="outlined-basic" maxLength="1000" label="Description" multiline variant="outlined" rows={10} defaultValue="Write Description" value={zweet.description} required onChange={(e) => {
                    e.target.value = e.target.value.slice(0, 1000);
                    setZweet({ ...zweet, description: e.target.value });
                }} />
                <TextField id="outlined-basic" label="Hashtags (Seperated by comma)" variant="outlined" value={zweet.hashtags} required onChange={(e) => {
                    setZweet({ ...zweet, hashtags: e.target.value });
                }} />
                <Button variant="contained" onClick={updateZweet}>
                    Update Zweet
                </Button>
            </form>
        </>
    );
};

export default ZweetCreate;
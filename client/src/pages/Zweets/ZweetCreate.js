import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useCookies } from "react-cookie";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

function ZweetCreate() {
    const [ cookies ] = useCookies(["token"]);
    const [ zweet, setZweet ] = useState({
        title: "", 
        description: "", 
        hashtags: ""
    });
    const createZweet = () => {
        axios({
                url: "http://localhost:5000/zweets/create", 
                method: "POST", 
                headers: {
                    token: cookies.token, 
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
                <title>Zwitter | Zweet</title>
            </Helmet>
            <h1>Zweet</h1>
            <form noValidate autoComplete="off">
                <TextField id="outlined-basic" label="What's going on?" variant="outlined" value={zweet.title} onChange={(e) => {
                    e.target.value = e.target.value.slice(0, 100);
                    setZweet({ ...zweet, title: e.target.value });
                }} />
                <TextField id="outlined-basic" maxLength="1000" label="Tell us more" multiline variant="outlined" rows={10} value={zweet.description} onChange={(e) => {
                    e.target.value = e.target.value.slice(0, 1000);
                    setZweet({ ...zweet, description: e.target.value });
                }} />
                <TextField id="outlined-basic" label="Hashtags for find (Seperated by comma)" variant="outlined" value={zweet.hashtags} onChange={(e) => {
                    setZweet({ ...zweet, hashtags: e.target.value });
                }} />
                <Button variant="contained" onClick={createZweet}>
                    Zweet
                </Button>
            </form>
        </>
    );
};

export default ZweetCreate;
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useCookies } from "react-cookie";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

function ZweetCreate({ match }) {
    const [ cookies ] = useCookies(["token"]);
    const [ Zweet, setZweet ] = useState({
        title: "", 
        description: "", 
        hashtags: ""
    });
    useEffect(() => {
        axios({
                url: `http://localhost:5000/zweets/${match.params.id}`, 
                method: "GET"
            })
            .then((ZweetData) => {
                setZweet({ ...ZweetData.data, hashtags: ZweetData.data.hashtags.join(",") })
            });
    }, [match.params.id]);
    const updateZweet = () => {
        axios({
                url: `http://localhost:5000/zweets/${match.params.id}/edit`, 
                method: "POST", 
                headers: {
                    token: cookies.token
                }, 
                data: Zweet
            })
            .then((Zweet) => {
                window.location.href = `/zweets/${Zweet.data._id}`;
            });
    };
    return (
        <>
            <Helmet>
                <title>Zwitter | Edit {Zweet.title ? Zweet.title : "Zweet"}</title>
            </Helmet>
            <h1>Update Zweet</h1>
            <form noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Title" variant="outlined" defaultValue="Write Title" value={Zweet.title} required onChange={(e) => {
                    e.target.value = e.target.value.slice(0, 100);
                    setZweet({ ...Zweet, title: e.target.value });
                }} />
                <TextField id="outlined-basic" maxLength="1000" label="Description" multiline variant="outlined" rows={10} defaultValue="Write Description" value={Zweet.description} required onChange={(e) => {
                    e.target.value = e.target.value.slice(0, 1000);
                    setZweet({ ...Zweet, description: e.target.value });
                }} />
                <TextField id="outlined-basic" label="Hashtags (Seperated by comma)" variant="outlined" value={Zweet.hashtags} required onChange={(e) => {
                    setZweet({ ...Zweet, hashtags: e.target.value });
                }} />
                <Button variant="contained" onClick={updateZweet}>
                    Update Zweet
                </Button>
            </form>
        </>
    );
};

export default ZweetCreate;
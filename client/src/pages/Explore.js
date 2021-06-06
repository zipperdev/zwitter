import axios from "axios";
import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchRounded from "@material-ui/icons/SearchRounded";
import RenderZweets from "./components/RenderZweets";

function Explore({ location }) {
    const [ zweetsList, setzweetsList ] = useState([]);
    const [ keyword, setKeyword ] = useState("");
    useEffect(() => {
        if (Boolean(location.search.match(/(keyword)=([^&]+)/g))) {
            axios({
                    url: `http://localhost:5000/zweets/search?keyword=${location.search.match(/(keyword)=([^&]+)/g)[0].split("=")[1]}`, 
                    method: "GET"
                })
                .then((zweets) => {
                    setzweetsList(zweets.data);
                });
        } else {
            axios({
                    url: "http://localhost:5000/zweets", 
                    method: "GET"
                })
                .then((zweets) => {
                    setzweetsList(zweets.data);
                });
        };
    }, [location.search]);
    return (
        <>
            <Helmet>
                <title>Zwitter | Explore</title>
            </Helmet>
            <form onSubmit={e => e.preventDefault()} noValidate autoComplete="off">
                <TextField name="keyword" type="text" className="outlined-basic" label="Explore About" variant="outlined" onChange={(e) => {
                    setKeyword(e.target.value);
                }} />
                <Button onClick={() => {
                    if (keyword.trim()) {
                        window.location.href = `/explore?keyword=${keyword}`;
                    } else {
                        window.location.href = "/explore";
                    };
                }} variant="contained" type="submit">
                    <SearchRounded />
                </Button>
            </form>
            {zweetsList ? (
                <RenderZweets zweetsList={zweetsList} />
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    );
};

export default Explore;
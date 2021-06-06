import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useCookies } from "react-cookie";
import axios from "axios";
import jwt from "jsonwebtoken";
import WriteZweet from "./components/WriteZweet";
import RenderZweets from "./components/RenderZweets";

function Zweets() {
    const [ zweetsList, setZweetsList ] = useState([]);
    const [ cookies ] = useCookies(["token"]);
    useEffect(() => {
        if (cookies.token) {
            axios({
                    url: `http://localhost:5000/users/${jwt.decode(cookies.token).user._id}`, 
                    method: "GET"
                })
                .then((zweets) => {
                    setZweetsList(zweets.data.zweets);
                });
        } else {
            axios({
                    url: "http://localhost:5000/zweets", 
                    method: "GET"
                })
                .then((zweets) => {
                    setZweetsList(zweets.data);
                });
        };
    }, [cookies.token]);
    return (
        <>
            <Helmet>
                <title>Zwitter | Home</title>
            </Helmet>
            {zweetsList ? (
                <>
                    {cookies.token ? (
                        <WriteZweet />
                    ) : (
                        <></>
                    )}
                    <h1>{cookies.token ? "My Zweets" : "Zweets"}</h1>
                    <RenderZweets zweetsList={zweetsList} />
                </>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    );
};

export default Zweets;
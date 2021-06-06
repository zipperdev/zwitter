import React from "react";
import { Helmet } from "react-helmet";
import WriteZweet from "../components/WriteZweet";

function ZweetCreate() {
    return (
        <>
            <Helmet>
                <title>Zwitter | Zweet</title>
            </Helmet>
            <h1>Zweet</h1>
            <WriteZweet />
        </>
    );
};

export default ZweetCreate;
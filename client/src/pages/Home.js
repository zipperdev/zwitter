import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Zweets() {
    const [ zweetsList, setzweetsList ] = useState([]);
    useEffect(() => {
        axios({
            url: "http://localhost:5000/zweets", 
            method: "GET"
        })
        .then((zweets) => {
            setzweetsList(zweets.data);
        });
    }, []);
    return (
        <>
            <Helmet>
                <title>Zwitter | Home</title>
            </Helmet>
            {zweetsList ? (
                <>
                    <h1>Zweets</h1>
                    <div>
                        {
                            JSON.stringify(zweetsList) !== "[]" ? 
                            zweetsList.map((zweet, key) => (
                                <Link key={key} to={`/zweets/${zweet._id}`}>
                                        <h2>{zweet.title}</h2>
                                        <p>{zweet.description.slice(0, 45)}{zweet.description.length >= 45 ? "..." : ""}</p>
                                        <small>{zweet.createdAt}</small>
                                        <br />
                                        <small>{zweet.views} views</small>
                                    </Link>
                                )) : (
                                    <p>Sorry, there's no zweets</p>
                                    )
                                }
                    </div>
                </>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    );
};

export default Zweets;
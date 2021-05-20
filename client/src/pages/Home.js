import axios from "axios";
import { Helmet } from "react-helmet";
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
                    <h1>zweets</h1>
                    <div>
                        {
                            JSON.stringify(zweetsList) !== "[]" ? 
                                zweetsList.map((Zweet, key) => (
                                    <a key={key} href={`/zweets/${Zweet._id}`}>
                                        <h2>{Zweet.title}</h2>
                                        <p>{Zweet.description.slice(0, 45)}{Zweet.description.length >= 45 ? "..." : ""}</p>
                                        <small>{Zweet.createdAt}</small>
                                    </a>
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
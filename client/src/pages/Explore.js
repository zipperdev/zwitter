import axios from "axios";
import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchRounded from "@material-ui/icons/SearchRounded"

function Explore({ location }) {
    const [ zweetsList, setzweetsList ] = useState([]);
    useEffect(() => {
        if (location.search) {
            axios({
                    url: `http://localhost:5000/zweets/search?keyword=${location.search.match(/(keyword)=([^&]+)/g)[0].split("=")[1]}`, 
                    method: "GET"
                })
                .then((zweets) => {
                    setzweetsList(zweets.data);
                });
        } else {
            axios({
                url: `http://localhost:5000/zweets`, 
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
            <form noValidate autoComplete="off">
                <TextField name="keyword" type="text" className="outlined-basic" label="Explore About" variant="outlined" required />
                <Button variant="contained" type="submit">
                    <SearchRounded />
                </Button>
            </form>
            {zweetsList ? (
                <>
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

export default Explore;
import axios from "axios";
import { Helmet } from "react-helmet";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchRounded from "@material-ui/icons/SearchRounded"

function Explore() {
    const [ zweetsList, setzweetsList ] = useState([]);
    const [ exploreKeyword, setExploreKeyword ] = useState([]);
    const exploreAbout = () => {
        axios({
                url: `http://localhost:5000/zweets/search?keyword=${exploreKeyword}`, 
                method: "GET"
            })
            .then((zweets) => {
                setzweetsList(zweets.data);
            });
    };
    return (
        <>
            <Helmet>
                <title>Zwitter | Explore</title>
            </Helmet>
            <form noValidate autoComplete="off">
                <TextField type="text" className="outlined-basic" label="Explore About" variant="outlined" required onChange={(e) => {
                    setExploreKeyword(e.target.value);
                }} />
                <Button variant="contained" onClick={exploreAbout}>
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
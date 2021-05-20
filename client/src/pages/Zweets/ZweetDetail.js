import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

function ZweetDetail({ match }) {
    const [ Zweet, setZweet ] = useState([]);
    useEffect(() => {
        axios({
                url: `http://localhost:5000/zweets/${match.params.id}`, 
                method: "GET"
            })
            .then((Zweet) => {
                setZweet(Zweet.data);
            });
    }, [match.params.id]);
    return (
        <>
            <Helmet>
                <title>Zwitter | {Zweet.title ? Zweet.title : "Zweet"}</title>
            </Helmet>
            {Zweet.owner ? (
                <>
                    <h4>Made By {Zweet.owner.username}</h4>
                    <h2>{Zweet.title}</h2>
                    <small>{Zweet.createdAt}</small>
                    <pre>{Zweet.description}</pre>
                    <a href={`/zweets/${match.params.id}/delete`}>Delete Zweet</a>
                    <a href={`/zweets/${match.params.id}/edit`}>Edit Zweet</a>
                </>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    );
};

export default ZweetDetail;
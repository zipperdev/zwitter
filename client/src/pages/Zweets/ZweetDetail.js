import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Helmet } from "react-helmet";
import axios from "axios";

function ZweetDetail({ match }) {
    const [ Zweet, setZweet ] = useState([]);
    const [ cookies ] = useCookies(["token"]);
    useEffect(() => {
        axios({
                url: `http://localhost:5000/zweets/${match.params.id}`, 
                method: "GET"
            })
            .then((zweet) => {
                setZweet(zweet.data);
            });
    }, [match.params.id]);
    const reaction = () => {
        axios({
                url: `http://localhost:5000/zweets/${match.params.id}/reaction`, 
                method: "POST", 
                headers: {
                    token: cookies.token
                }
            })
            .then((zweet) => {
                setZweet(zweet.data);
            });
    }
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
                    <button onClick={reaction}>Like or Dislike it!!!</button>
                </>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    );
};

export default ZweetDetail;
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import FavoriteRounded from "@material-ui/icons/FavoriteRounded";
import FavoriteBorderRounded from "@material-ui/icons/FavoriteBorderRounded";
import axios from "axios";
import jwt from "jsonwebtoken";

function ZweetDetail({ match }) {
    const [ zweet, setZweet ] = useState();
    const [ fail, setFail ] = useState(false);
    const [ encodedToken, setEncodedToken ] = useState();
    const [ done, setDone ] = useState(false);
    const [ cookies ] = useCookies(["token"]);
    useEffect(() => {
        axios({
                url: `http://localhost:5000/zweets/${match.params.id}`, 
                method: "GET"
            })
            .then((zweetData) => {
                setZweet(zweetData.data);
                setEncodedToken(jwt.decode(cookies.token));
                setDone(true);
            })
            .catch((err) => {
                setFail(true);
            });
    }, [match.params.id, cookies.token]);
    const reaction = () => {
        axios({
                url: `http://localhost:5000/zweets/${match.params.id}/reaction`, 
                method: "POST", 
                headers: {
                    token: cookies.token
                }
            })
            .then((reactionData) => {
                setZweet(reactionData.data);
            });
    }
    return (
        <>
            <Helmet>
                <title>Zwitter | {zweet ? zweet.title : "Zweet"}</title>
            </Helmet>
            {fail ? (
                <h1>There's no existing zweet that has {match.params.id} id {":("}</h1>
            ) : done ? (
                <>
                    <Link to={`/users/${zweet.owner._id}`}>Made By {zweet.owner.username}</Link>
                    <img src={`http://localhost:5000${zweet.image}`} alt={zweet.title} />
                    <h2>{zweet.title}</h2>
                    <small>{zweet.createdAt}</small>
                    <pre>{zweet.description}</pre>
                    <Link to={`/zweets/${match.params.id}/delete`}>Delete Zweet</Link>
                    <Link to={`/zweets/${match.params.id}/edit`}>Edit Zweet</Link>
                    {cookies.token ? (
                        <>
                            <div onClick={reaction}>{zweet.like.includes(encodedToken.user._id) ? (
                                    <FavoriteRounded />
                                ) : (
                                    <FavoriteBorderRounded />
                                )}
                            </div>
                            <span>{zweet.like.length}</span>
                        </>
                    ) : (
                        <></>
                    )}
                </>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    );
};

export default ZweetDetail;
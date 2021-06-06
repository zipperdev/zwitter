import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FavoriteRounded from "@material-ui/icons/FavoriteRounded";
import FavoriteBorderRounded from "@material-ui/icons/FavoriteBorderRounded";
import axios from "axios";
import jwt from "jsonwebtoken";

function ZweetDetail({ match }) {
    const [ zweet, setZweet ] = useState("");
    const [ comment, setComment ] = useState("");
    const [ fail, setFail ] = useState(false);
    const [ encodedToken, setEncodedToken ] = useState("");
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
    const postComment = () => {
        axios({
                url: `http://localhost:5000/zweets/${match.params.id}/comment`, 
                method: "POST", 
                headers: {
                    token: cookies.token
                }, 
                data: {
                    content: comment
                }
            })
            .then(() => {
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
            });
    };
    const deleteComment = comment => () => {
        axios({
                url: `http://localhost:5000/zweets/${match.params.id}/comment`, 
                method: "POST", 
                headers: {
                    token: cookies.token
                }, 
                data: {
                    commentId: comment._id
                }
            })
            .then(() => {
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
            });
    };
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
    };
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
                    <div>
                        <form onSubmit={e => e.preventDefault()} noValidate autoComplete="off">
                            <TextField id="outlined-basic" label="Comment here!" variant="outlined" value={comment} onChange={(e) => {
                                e.target.value = e.target.value.slice(0, 300);
                                setComment(e.target.value);
                            }} />
                            <Button variant="contained" onClick={postComment}>
                                Comment
                            </Button>
                        </form>
                        <h1>Comments</h1>
                        <div>
                            {
                                JSON.stringify(zweet.comments) !== "[]" ? 
                                    zweet.comments.sort((firstEl, secondEl) => firstEl.createdAt < secondEl.createdAt ? 1 : firstEl.createdAt > secondEl.createdAt ? -1 : 0).map((comment, key) => (
                                        <div key={key}>
                                            <Link to={`/users/${comment.owner._id}`}>{comment.owner.username}</Link>
                                            <h4>{comment.content}</h4>
                                            <small>{comment.createdAt}</small>
                                            <span onClick={deleteComment(comment)}>Delete Comment</span>
                                        </div>
                                    )) : (
                                        <p>Sorry, there's no comments</p>
                                    )
                            }
                        </div>
                    </div>
                </>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    );
};

export default ZweetDetail;
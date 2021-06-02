import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import jwt from "jsonwebtoken";

function UserDetail({ match }) {
    const [ user, setUser ] = useState();
    const [ fail, setFail ] = useState();
    const [ done, setDone ] = useState(false);
    const [ cookies ] = useCookies(["token"]);
    const me = jwt.decode(cookies.token);
    useEffect(() => {
        axios({
                url: `http://localhost:5000/users/${match.params.id}`, 
                method: "GET"
            })
            .then(result => {
                setUser(result.data);
                setDone(true);
            })
            .catch((err) => {
                setFail(true);
            });;
    }, [match.params.id]);
    const follow = () => {
        axios({
                url: `http://localhost:5000/users/${match.params.id}/follow`, 
                method: "POST", 
                headers: {
                    token: cookies.token
                }
            })
            .then(result => {
                axios({
                        url: `http://localhost:5000/users/${match.params.id}`, 
                        method: "GET"
                    })
                    .then(result => {
                        setUser(result.data);
                    });
            });
    };
    return (
        <>
            <Helmet>
                <title>Zwitter | {user ? user.username : "User"}'s Profile</title>
            </Helmet>
            {fail ? (
                <h1>There's no existing user that has {match.params.id} id {":("}</h1>
            ) : done ? (
                <>
                    <h1>{user.username}</h1>
                    <h3>{user.name}</h3>
                    <small>{user.location}</small>
                    {user._id === me.user._id ? (
                        <>
                        </>
                    ) : (
                        <button onClick={follow}>{user.followers.includes(me.user._id) ? "Unfollow" : "Follow"}</button>
                    )}
                    <div>
                        {
                            JSON.stringify(user.zweets) !== "[]" ? 
                                user.zweets.map((zweet, key) => (
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

export default UserDetail;
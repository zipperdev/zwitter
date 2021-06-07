import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import RenderZweets from "../components/RenderZweets";
import axios from "axios";
import jwt from "jsonwebtoken";

function UserDetail({ match }) {
    const [ user, setUser ] = useState("");
    const [ fail, setFail ] = useState(false);
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
            });
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
                    <img src={`http://localhost:5000${user.avatar}`} alt={user.username} />
                    <h1>{user.username}</h1>
                    <h3>{user.name}</h3>
                    <small>{user.location}</small>
                    <pre>{user.info}</pre>
                    {user._id === me.user._id ? (
                        <>
                            <Link to={`/users/${user._id}/edit`}>
                                Edit My User
                            </Link>
                            <Link to={`/users/${user._id}/delete`}>
                                Delete My User
                            </Link>
                        </>
                    ) : (
                        <button onClick={follow}>{user.followers.includes(me.user._id) ? "Unfollow" : "Follow"}</button>
                    )}
                    <RenderZweets zweetsList={user.zweets} />
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default UserDetail;
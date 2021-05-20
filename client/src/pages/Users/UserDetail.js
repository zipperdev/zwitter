import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

function UserDetail({ match }) {
    const [ user, setUser ] = useState();
    const [ done, setDone ] = useState(false);
    useEffect(() => {
        axios({
                url: `http://localhost:5000/users/${match.params.id}`, 
                method: "GET"
            })
            .then(result => {
                setUser(result.data);
                setDone(true);
            });
    }, [match.params.id]);
    return (
        <>
            <Helmet>
                <title>Zwitter | {user ? user.username : "User"}'s Profile</title>
            </Helmet>
            {done ? (
                <>
                    <h1>{user.username}</h1>
                    <h3>{user.name}</h3>
                    <small>{user.location}</small>
                    <div>
                        {
                            JSON.stringify(user.zweets) !== "[]" ? 
                                user.zweets.map((Zweet, key) => (
                                    <a key={key} href={`/zweets/${Zweet._id}`}>
                                        <h2>{Zweet.title}</h2>
                                        <p>{Zweet.description.slice(0, 45)}{Zweet.description.length >= 45 ? "..." : ""}</p>
                                        <small>{Zweet.createdAt}</small>
                                    </a>
                                )) : (
                                    <p>Sorry, there's no zweets that {user.username} made.</p>
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
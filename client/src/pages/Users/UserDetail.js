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
                            JSON.stringify(user.stories) !== "[]" ? 
                                user.stories.map((story, key) => (
                                    <a key={key} href={`/stories/${story._id}`}>
                                        <h2>{story.title}</h2>
                                        <p>{story.description.slice(0, 45)}{story.description.length >= 45 ? "..." : ""}</p>
                                        <small>{story.createdAt}</small>
                                    </a>
                                )) : (
                                    <p>Sorry, there's no stories that {user.username} made.</p>
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
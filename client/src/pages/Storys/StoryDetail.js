import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

function StoryDetail({ match }) {
    const [ story, setStory ] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:5000/storys/${match.params.id}`)
            .then((story) => {
                setStory(story.data);
            });
    }, [match.params.id]);
    return (
        <>
            <Helmet>
                <title>Zwitter | {story.title ? story.title : "Story"}</title>
            </Helmet>
            {story.owner ? (
                <>
                    <h4>Made By {story.owner.username}</h4>
                    <h2>{story.title}</h2>
                    <small>{story.createdAt}</small>
                    <p>{story.description}</p>
                    <a href={`/storys/${match.params.id}/delete`}>Delete Story</a>
                    <a href={`/storys/${match.params.id}/edit`}>Edit Story</a>
                </>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    );
};

export default StoryDetail;
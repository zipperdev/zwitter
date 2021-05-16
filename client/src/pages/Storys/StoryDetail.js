import axios from "axios";
import React, { useEffect, useState } from "react";

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
            <h2>{story.title}</h2>
            <small>{story.createdAt}</small>
            <p>{story.description}</p>
            <a href={`/storys/${match.params.id}/delete`}>Delete Story</a>
            <a href={`/storys/${match.params.id}/edit`}>Edit Story</a>
        </>
    );
};

export default StoryDetail;
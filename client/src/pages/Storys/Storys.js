import axios from "axios";
import React, { useEffect, useState } from "react";

function Storys() {
    const [ storysList, setStorysList ] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/storys")
            .then((storys) => {
                setStorysList(storys.data);
            });
    }, []);
    return (
        <>
            <h1>Storys</h1>
            <div>
                {
                    JSON.stringify(storysList) !== "[]" ? 
                        storysList.map((story, key) => (
                            <a key={key} href={`/storys/${story._id}`}>
                                <h2>{story.title}</h2>
                                <p>{story.description.slice(0, 45)}{story.description.length >= 45 ? "..." : ""}</p>
                                <small>{story.createdAt}</small>
                            </a>
                        )) : (
                            <p>Sorry, there's no storys</p>
                        )
                }
            </div>
        </>
    );
};

export default Storys;

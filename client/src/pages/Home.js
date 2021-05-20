import axios from "axios";
import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react";

function Stories() {
    const [ storiesList, setstoriesList ] = useState([]);
    useEffect(() => {
        axios({
                url: "http://localhost:5000/stories", 
                method: "GET"
            })
            .then((stories) => {
                setstoriesList(stories.data);
            });
    }, []);
    return (
        <>
            <Helmet>
                <title>Zwitter | Home</title>
            </Helmet>
            {storiesList ? (
                <>
                    <h1>Stories</h1>
                    <div>
                        {
                            JSON.stringify(storiesList) !== "[]" ? 
                                storiesList.map((story, key) => (
                                    <a key={key} href={`/stories/${story._id}`}>
                                        <h2>{story.title}</h2>
                                        <p>{story.description.slice(0, 45)}{story.description.length >= 45 ? "..." : ""}</p>
                                        <small>{story.createdAt}</small>
                                    </a>
                                )) : (
                                    <p>Sorry, there's no stories</p>
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

export default Stories;

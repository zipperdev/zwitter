import React from "react";
import { Link } from "react-router-dom";

function RenderZweets({ zweetsList }) {
    return (
        <div>
            {
                JSON.stringify(zweetsList) !== "[]" ? 
                zweetsList.map((zweet, key) => (
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
    );
};

export default RenderZweets;
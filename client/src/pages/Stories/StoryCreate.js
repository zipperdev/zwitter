import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useCookies } from "react-cookie";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

function StoryCreate({ match }) {
    const [ cookies ] = useCookies(["token"]);
    const [ story, setStory ] = useState({
        title: "", 
        description: "", 
        hashtags: ""
    });
    const createStory = () => {
        axios({
                url: "http://localhost:5000/stories/create", 
                method: "POST", 
                headers: {
                    token: cookies.token, 
                }, 
                data: story
            })
            .then((story) => {
                window.location.href = `/stories/${story.data._id}`;
            });
    };
    return (
        <>
            <Helmet>
                <title>Zwitter | Create Story</title>
            </Helmet>
            <h1>Create Story</h1>
            <form noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Title" variant="outlined" value={story.title} required onChange={(e) => {
                    e.target.value = e.target.value.slice(0, 100);
                    setStory({ ...story, title: e.target.value });
                }} />
                <TextField id="outlined-basic" maxLength="1000" label="Description" multiline variant="outlined" rows={10} value={story.description} required onChange={(e) => {
                    e.target.value = e.target.value.slice(0, 1000);
                    setStory({ ...story, description: e.target.value });
                }} />
                <TextField id="outlined-basic" label="Hashtags (Seperated by comma)" variant="outlined" value={story.hashtags} required onChange={(e) => {
                    setStory({ ...story, hashtags: e.target.value });
                }} />
                <Button variant="contained" color="primary" onClick={createStory}>
                    Create Story
                </Button>
            </form>
        </>
    );
};

export default StoryCreate;
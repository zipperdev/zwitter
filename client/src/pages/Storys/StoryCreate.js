import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

function StoryCreate({ match }) {
    const [ story, setStory ] = useState({
        title: "", 
        description: "", 
        hashtags: ""
    });
    const createStory = () => {
        console.log(story);
        axios.post("http://localhost:5000/storys/create", story)
            .then((story) => {
                window.location.href = `/storys/${story.data._id}`;
            });
    };
    return (
        <>
            <h1>Create Student</h1>
            <form noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Title" variant="outlined" value={story.title} required onChange={(e) => {
                    setStory({ ...story, title: e.target.value });
                }} />
                <TextField id="outlined-basic" label="Description" variant="outlined" value={story.description} required onChange={(e) => {
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
import React, { useEffect, useState } from "react";
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
    useEffect(() => {
        axios.get(`http://localhost:5000/storys/${match.params.id}`)
            .then((storyData) => {
                setStory({ ...storyData.data, hashtags: storyData.data.hashtags.join(",") })
            });
    }, [match.params.id]);
    const updateStory = () => {
        axios.post(`http://localhost:5000/storys/${match.params.id}/edit`, {
            story, 
            token: cookies.token
        })
            .then((story) => {
                window.location.href = `/storys/${story.data._id}`;
            });
    };
    return (
        <>
            <h1>Update Student</h1>
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
                <Button variant="contained" color="primary" onClick={updateStory}>
                    Update Story
                </Button>
            </form>
        </>
    );
};

export default StoryCreate;
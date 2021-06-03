import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useCookies } from "react-cookie";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import noImage from "../../images/noImage.png";
import axios from "axios";

function ZweetCreate() {
    const [ cookies ] = useCookies(["token"]);
    const [ imagePreview, setImagePreview ] = useState(noImage);
    const [ zweet, setZweet ] = useState({
        title: "", 
        description: "", 
        hashtags: "", 
        image: ""
    });
    const createZweet = () => {
        const zweetData = new FormData();
        zweetData.append("title", zweet.title);
        zweetData.append("description", zweet.description);
        zweetData.append("hashtags", zweet.hashtags);
        zweetData.append("image", zweet.image);
        axios({
                url: "http://localhost:5000/zweets/create", 
                method: "POST", 
                headers: {
                    token: cookies.token, 
                    "content-type": "multipart/form-data"
                }, 
                data: zweetData
            })
            .then((zweet) => {
                window.location.href = `/zweets/${zweet.data._id}`;
            });
    };
    return (
        <>
            <Helmet>
                <title>Zwitter | Zweet</title>
            </Helmet>
            <h1>Zweet</h1>
            <form className="zweet-form" encType="multipart/form-data" noValidate autoComplete="off">
                <div className="img-container">
                    <img src={imagePreview} alt="Preview" />
                </div>
                <Button variant="outlined" component="label">
                    <span>Upload File</span>
                    <input type="file" accept=".png, .jpg, .jepg" required hidden onChange={(e) => {
                        setZweet({ ...zweet, image: e.target.files[0] });
                        const reader = new FileReader();
                        reader.readAsDataURL(e.target.files[0]);
                        reader.onloadend = (finalEvent) => {
                            const { currentTarget: { result } } = finalEvent;
                            setImagePreview(result);
                        };
                    }} />
                </Button>
                <TextField id="outlined-basic" label="What's going on?" variant="outlined" value={zweet.title} onChange={(e) => {
                    e.target.value = e.target.value.slice(0, 100);
                    setZweet({ ...zweet, title: e.target.value });
                }} />
                <TextField id="outlined-basic" maxLength="1000" label="Tell us more" multiline variant="outlined" rows={14} value={zweet.description} onChange={(e) => {
                    e.target.value = e.target.value.slice(0, 1000);
                    setZweet({ ...zweet, description: e.target.value });
                }} />
                <TextField id="outlined-basic" label="Hashtags for find (Seperated by comma)" variant="outlined" value={zweet.hashtags} onChange={(e) => {
                    setZweet({ ...zweet, hashtags: e.target.value });
                }} />
                <Button variant="contained" onClick={createZweet}>
                    Zweet
                </Button>
            </form>
        </>
    );
};

export default ZweetCreate;
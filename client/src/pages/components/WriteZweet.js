import React, { useState } from "react";
import { useCookies } from "react-cookie";
import TextField from "../components/TextField";
import Button from "@material-ui/core/Button";
import noImage from "../../images/noImage.png";
import axios from "axios";

function WriteZweet() {
    const [ cookies ] = useCookies(["token"]);
    const [ imagePreview, setImagePreview ] = useState(noImage);
    const [ zweet, setZweet ] = useState({
        title: "", 
        description: "", 
        hashtags: "", 
        image: ""
    });
    const createZweet = () => {
        if (Object.values(zweet).every(value => value)) {
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
    };
    return (
        <form onSubmit={e => e.preventDefault()} className="zweet-form" encType="multipart/form-data" noValidate autoComplete="off">
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
            {zweet.image ? (
                <></>
            ) : (
                <span>This field is required.</span>
            )}
            <TextField errorType="required" label="What's going on?" value={zweet.title} onChange={(e) => {
                e.target.value = e.target.value.slice(0, 100);
                setZweet({ ...zweet, title: e.target.value });
            }} />
            <TextField errorType="required" maxLength="1000" label="Tell us more" direction="column" value={zweet.description} onChange={(e) => {
                e.target.value = e.target.value.slice(0, 1000);
                setZweet({ ...zweet, description: e.target.value });
            }} />
            <TextField errorType="required" label="Hashtags for find (Seperated by comma)" value={zweet.hashtags} onChange={(e) => {
                e.target.value = e.target.value.slice(0, 300);
                setZweet({ ...zweet, hashtags: e.target.value });
            }} />
            <Button variant="contained" onClick={createZweet}>
                Zweet
            </Button>
        </form>
    );
};

export default WriteZweet;
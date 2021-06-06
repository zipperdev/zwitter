import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useCookies } from "react-cookie";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import noImage from "../../images/noImage.png";
import axios from "axios";
import jwt from "jsonwebtoken";

function ZweetCreate({ match }) {
    const [ cookies ] = useCookies(["token"]);
    const [ zweet, setZweet ] = useState({
        image: "", 
        title: "", 
        description: "", 
        hashtags: ""
    });
    const [ imagePreview, setImagePreview ] = useState(noImage);
    const [ done, setDone ] = useState(false);
    useEffect(() => {
        axios({
                url: `http://localhost:5000/zweets/${match.params.id}`, 
                method: "GET"
            })
            .then((zweetData) => {
                // eslint-disable-next-line
                if (zweetData.data.owner._id == jwt.decode(cookies.token).user._id) {
                    setZweet({ ...zweetData.data, hashtags: zweetData.data.hashtags.join(",") });
                    setDone(true);
                    setImagePreview(`http://localhost:5000${zweetData.data.image}`);
                } else {
                    window.location.href = `/zweets/${match.params.id}`;
                };
            });
    }, [match.params.id, cookies.token]);
    const updateZweet = () => {
        const zweetData = new FormData();
        zweetData.append("title", zweet.title);
        zweetData.append("description", zweet.description);
        zweetData.append("hashtags", zweet.hashtags);
        zweetData.append("image", zweet.image);
        axios({
                url: `http://localhost:5000/zweets/${match.params.id}/edit`, 
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
                <title>Zwitter | Edit {zweet.title ? zweet.title : "Zweet"}</title>
            </Helmet>
            {done ? (
                <>
                    <h1>Update Zweet</h1>
                    <form onSubmit={e => e.preventDefault()} className="zweet-form" encType="multipart/form-data" noValidate autoComplete="off">
                        <div className="img-container">
                            <img src={imagePreview === noImage ? noImage : imagePreview} alt="Preview" />
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
                        <TextField id="outlined-basic" label="Title" variant="outlined" value={zweet.title} onChange={(e) => {
                            e.target.value = e.target.value.slice(0, 100);
                            setZweet({ ...zweet, title: e.target.value });
                        }} />
                        <TextField id="outlined-basic" maxLength="1000" label="Description" multiline variant="outlined" rows={10} value={zweet.description} onChange={(e) => {
                            e.target.value = e.target.value.slice(0, 1000);
                            setZweet({ ...zweet, description: e.target.value });
                        }} />
                        <TextField id="outlined-basic" label="Hashtags (Seperated by comma)" variant="outlined" value={zweet.hashtags} onChange={(e) => {
                            setZweet({ ...zweet, hashtags: e.target.value });
                        }} />
                        <Button variant="contained" onClick={updateZweet}>
                            Update Zweet
                        </Button>
                    </form>
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default ZweetCreate;
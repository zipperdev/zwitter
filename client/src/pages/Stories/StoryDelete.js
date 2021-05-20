import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useCookies } from "react-cookie";
import axios from "axios";


function StoryDelete({ match }) {
    const [ cookies ] = useCookies(["token"]);
    useEffect(() => {
        axios({
                url: `http://localhost:5000/stories/${match.params.id}/delete`, 
                method: "POST", 
                headers: {
                    token: cookies.token
                }
            })
            .then((success) => {
                if (success.data.success) {
                    window.location.href = `/`;
                } else {
                    window.location.href = `/stories/${match.params.id}`;
                }
            });
    }, [match.params.id, cookies.token]);
    return (
        <>
            <Helmet>
                <title>Zwitter | Delete Story</title>
            </Helmet>
            <h1>Loading...</h1>
        </>
    );
};

export default StoryDelete;
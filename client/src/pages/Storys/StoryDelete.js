import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useCookies } from "react-cookie";
import axios from "axios";


function StoryDelete({ match }) {
    const [ cookies ] = useCookies(["token"]);
    useEffect(() => {
        axios.post(`http://localhost:5000/storys/${match.params.id}/delete`, {
            token: cookies.token
        })
            .then((success) => {
                if (success.data.success) {
                    window.location.href = `/`;
                } else {
                    window.location.href = `/storys/${match.params.id}`;
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
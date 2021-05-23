import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useCookies } from "react-cookie";
import axios from "axios";
import jwt from "jsonwebtoken";


function ZweetDelete({ match }) {
    const [ cookies ] = useCookies(["token"]);
    const decodedToken = jwt.decode(cookies.token);
    useEffect(() => {
        axios({
                url: `http://localhost:5000/zweets/${match.params.id}`, 
                method: "GET"
            })
            .then((zweet) => {
                console.log(zweet.data.owner._id == decodedToken.user._id)
                if (zweet.data.owner._id == decodedToken.user._id) {
                    axios({
                            url: `http://localhost:5000/zweets/${match.params.id}/delete`, 
                            method: "POST", 
                            headers: {
                                token: cookies.token
                            }
                        })
                        .then((success) => {
                            if (success.data.success) {
                                window.location.href = `/`;
                            } else {
                                window.location.href = `/zweets/${match.params.id}`;
                            }
                        });
                } else {
                    window.location.href = `/zweets/${match.params.id}`;
                }
            });
    }, [match.params.id, cookies.token]);
    return (
        <>
            <Helmet>
                <title>Zwitter | Delete Zweet</title>
            </Helmet>
            <h1>Loading...</h1>
        </>
    );
};

export default ZweetDelete;
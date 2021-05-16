import React, { useEffect } from "react";
import axios from "axios";


function StoryDelete({ match }) {
    useEffect(() => {
        axios.delete(`http://localhost:5000/storys/${match.params.id}/delete`)
            .then((success) => {
                if (success.data.success) {
                    window.location.href = `/`;
                } else {
                    window.location.href = `/storys/${match.params.id}`;
                }
            });
    }, [match.params.id]);
    return (
        <>
            <h1>Loading...</h1>
        </>
    );
};

export default StoryDelete;
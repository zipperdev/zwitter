import React from "react";
import TextFieldInput from "@material-ui/core/TextField";

function TextField({ label, value, subValue, direction, onChange, errorType, type, errorObj, maxLength }) {
    let error;
    let errorMessage;
    switch (errorType) {
        case "required":
            error = value.trim() === "";
            errorMessage = error ? "This field is required." : "";
            break;
        case "email":
            error = value.trim() === "" || !value.match(/(?<=@).{1,}(?=\..)/g);
            errorMessage = value.trim() === "" ? "This field is required." : !value.match(/(?<=@).{1,}(?=\..)/g) ? "Please write your email correctly." : "";
            break;
        case "password":
            error = value.trim() === "" || value.trim().length < 8 || !value.trim().match(/[!@#$%^&*()\-_=+[\]{}\\|;:'"<>,./?`~]/g);
            errorMessage = value.trim() === "" ? "This field is required." : value.trim().length < 8 ? "Please enter a password of at least 8 characters." : !value.trim().match(/[!@#$%^&*()\-_=+[\]{}\\|;:'"<>,./?`~]/g) ? "Please add at least one special character." : "";
            break;
        case "comfrimPassword":
            error = value.trim() === "" || value !== subValue;
            errorMessage = value.trim() === "" ? "This field is required." : value !== subValue ? "Password and password confirmation doesn't match." : "";
            break;
        default:
            error = errorObj.error;
            errorMessage = errorObj.message;
            break;
    };
    return <TextFieldInput 
        type={type ? type : "text"} 
        error={error} 
        helperText={errorMessage} 
        className="outlined-basic" 
        label={label} 
        variant="outlined" 
        value={value} 
        onChange={onChange} 
        maxLength={maxLength}
        multiline={direction === "column" ? true : false} 
        rows={14} />;
};

export default TextField;
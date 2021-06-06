import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import noImage from "../../images/noImage.png";
import axios from "axios";

function Signup() {
    const [ imagePreview, setImagePreview ] = useState(noImage);
    const [ user, setUser ] = useState({
        email: "", 
        name: "", 
        username: "", 
        info: "", 
        password: "", 
        confrimPassoword: "", 
        location: "", 
        avatar: ""
    });
    const locationList = [ "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas (the)", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia (Plurinational State of)", "Bonaire, Sint Eustatius and Saba", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory (the)", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Cayman Islands (the)", "Central African Republic (the)", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands (the)", "Colombia", "Comoros (the)", "Congo (the Democratic Republic of the)", "Congo (the)", "Cook Islands (the)", "Costa Rica", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czechia", "Côte d'Ivoire", "Denmark", "Djibouti", "Dominica", "Dominican Republic (the)", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Falkland Islands (the) [Malvinas]", "Faroe Islands (the)", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories (the)", "Gabon", "Gambia (the)", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See (the)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea (the Democratic People's Republic of)", "Korea (the Republic of)", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic (the)", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands (the)", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia (Federated States of)", "Moldova (the Republic of)", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands (the)", "New Caledonia", "New Zealand", "Nicaragua", "Niger (the)", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands (the)", "Norway", "Oman", "Pakistan", "Palau", "Palestine, State of", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines (the)", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Republic of North Macedonia", "Romania", "Russian Federation (the)", "Rwanda", "Réunion", "Saint Barthélemy", "Saint Helena, Ascension and Tristan da Cunha", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin (French part)", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (Dutch part)", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan (the)", "Suriname", "Svalbard and Jan Mayen", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands (the)", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates (the)", "United Kingdom of Great Britain and Northern Ireland (the)", "United States Minor Outlying Islands (the)", "United States of America (the)", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela (Bolivarian Republic of)", "Viet Nam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe", "Åland Islands"];
    const signup = () => {
        if (Object.values(user).every(value => value)) {
            if (user.password === user.confrimPassoword && user.email.match(/(?<=@).{1,}(?=\..)/g) && user.password.trim().length >= 8) {
                const userData = new FormData();
                userData.append("email", user.email);
                userData.append("name", user.name);
                userData.append("username", user.username);
                userData.append("info", user.info);
                userData.append("password", user.password);
                userData.append("confrimPassword", user.confrimPassoword);
                userData.append("location", user.location);
                userData.append("avatar", user.avatar);
                axios({
                        url: "http://localhost:5000/signup", 
                        method: "POST", 
                        headers: {
                            "content-type": "multipart/form-data"
                        }, 
                        data: userData
                    })
                    .then(() => {
                        window.location.href = "/login";
                    });
            };
        };
    };
    return (
        <>
            <Helmet>
                <title>Zwitter | Sign Up</title>
            </Helmet>
            <h1>Sign Up</h1>
            <form onSubmit={e => e.preventDefault()} className="zweet-form" encType="multipart/form-data" noValidate autoComplete="off">
                <div className="img-container">
                    <img src={imagePreview} alt="Preview" />
                </div>
                <Button variant="outlined" component="label">
                    <span>Upload File</span>
                    <input type="file" accept=".png, .jpg, .jepg" required hidden onChange={(e) => {
                        setUser({ ...user, avatar: e.target.files[0] });
                        const reader = new FileReader();
                        reader.readAsDataURL(e.target.files[0]);
                        reader.onloadend = (finalEvent) => {
                            const { currentTarget: { result } } = finalEvent;
                            setImagePreview(result);
                        };
                    }} />
                </Button>
                <TextField error={user.name.trim() === ""} helperText={user.name.trim() === "" ? "This field is required." : " "} className="outlined-basic" label="Name" variant="outlined" value={user.name} onChange={(e) => {
                    e.target.value = e.target.value.slice(0, 80);
                    setUser({ ...user, name: e.target.value });
                }} />
                <TextField error={user.username.trim() === ""} helperText={user.username.trim() === "" ? "This field is required." : " "} className="outlined-basic" label="Useraname" variant="outlined" value={user.username} onChange={(e) => {
                    e.target.value = e.target.value.slice(0, 80);
                    setUser({ ...user, username: e.target.value });
                }} />
                <TextField error={user.info.trim() === ""} helperText={user.info.trim() === "" ? "This field is required." : " "} id="outlined-basic" maxLength="200" label="Tell us you more" multiline variant="outlined" rows={14} value={user.info} onChange={(e) => {
                    e.target.value = e.target.value.slice(0, 200);
                    setUser({ ...user, info: e.target.value });
                }} />
                <TextField error={user.email.trim() === "" || !user.email.match(/(?<=@).{1,}(?=\..)/g)} helperText={user.email.trim() === "" ? "This field is required." : !user.email.match(/(?<=@).{1,}(?=\..)/g) ? "Please write your email correctly." : " "} type="email" className="outlined-basic" label="Email" variant="outlined" value={user.email} onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                }} />
                <TextField error={user.password.trim() === "" || user.password.trim().length < 8} helperText={user.password.trim() === "" ? "This field is required." : user.password.trim().length < 8 ? "Please enter a password of at least 8 characters." : " "} type="password" className="outlined-basic" label="Password" variant="outlined" value={user.password} onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                }} />
                <TextField error={user.confrimPassoword.trim() === "" || user.confrimPassoword !== user.password} helperText={user.confrimPassoword.trim() === "" ? "This field is required." :user.confrimPassoword !== user.password ? "Password and password confirmation doesn't match." : " "} type="password" className="outlined-basic" label="Password Confrim" variant="outlined" value={user.confrimPassoword} onChange={(e) => {
                    setUser({ ...user, confrimPassoword: e.target.value });
                }} />
                <FormControl error={user.location.trim() === ""} variant="outlined">
                    <InputLabel className="demo-simple-select-outlined-label">Location</InputLabel>
                    <Select labelId="demo-simple-select-outlined-label" className="demo-simple-select-outlined" value={user.location} onChange={(e) => {
                        setUser({ ...user, location: e.target.value });
                    }} label="Location">
                        {locationList.map((location, key) => (
                            <MenuItem value={location} key={key}>{location}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button variant="contained" onClick={signup}>
                    Sign Up
                </Button>
            </form>
        </>
    );
};

export default Signup;
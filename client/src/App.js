import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { CookiesProvider, useCookies } from "react-cookie";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import HomeRounded from "@material-ui/icons/HomeRounded";
import AddCircleOutlineRounded from "@material-ui/icons/AddCircleOutlineRounded";
import AccountCircleOutlined from "@material-ui/icons/AccountCircleOutlined";
import PersonAddRounded from "@material-ui/icons/PersonAddRounded";
import LockRounded from "@material-ui/icons/LockRounded";
import LockOpenRounded from "@material-ui/icons/LockOpenRounded";
import LogoImage from "./images/logo.svg";
import jwt from "jsonwebtoken";
import Home from "./pages/Home";
import StoryDetail from "./pages/Stories/StoryDetail";
import StoryCreate from "./pages/Stories/StoryCreate";
import StoryEdit from "./pages/Stories/StoryEdit";
import StoryDelete from "./pages/Stories/StoryDelete";
import Signup from "./pages/Users/Signup";
import Login from "./pages/Users/Login";
import Logout from "./pages/Users/Logout";
import UserDetail from "./pages/Users/UserDetail";
import "./styles/main.css";

function App() {
    const [ cookies ] = useCookies(["token"]);
    const [ encodedToken, setEncodedToken ] = useState();
    const [ done, setDone ] = useState(false);
    useEffect(() => {
        setEncodedToken(jwt.decode(cookies.token));
        setDone(true);
    }, [cookies.token]);
    return (
        <CookiesProvider>
            <Helmet>
                <title>Zwitter</title>
            </Helmet>
            <header>
                <a href="/">
                    <img src={LogoImage} alt="Zwitter" />
                </a>
                <nav>
                    <a href="/">
                        <HomeRounded color="primary" />
                    </a>
                    {cookies.token ? (
                        <>
                            <a href="/stories/create">
                                <AddCircleOutlineRounded color="primary" />
                            </a>
                            <a href={done ? `/users/${encodedToken.user._id}` : "/users/null"}>
                                <AccountCircleOutlined color="primary" />
                            </a>
                            <a href="/logout">
                                <LockRounded color="primary" />
                            </a>
                        </>
                    ) : (
                        <>
                            <a href="/signup">
                                <PersonAddRounded color="primary" />
                            </a>
                            <a href="/login">
                                <LockOpenRounded color="primary" />
                            </a>
                        </>
                    )}
                </nav>
            </header>
            <main>
                <Router>
                    <Switch>
                        <Route path="/" component={Home} exact />
                        <Route path="/signup" exact>
                            {!cookies.token ? <Signup /> : <Redirect to="/" />}
                        </Route>
                        <Route path="/login" exact>
                            {!cookies.token ? <Login /> : <Redirect to="/" />}
                        </Route>
                        <Route path="/logout" exact>
                            {cookies.token ? <Logout /> : <Redirect to="/" />}
                        </Route>
                        <Route path="/users/:id" component={UserDetail} exeact />
                        <Route path="/stories/create" exact>
                            {cookies.token ? <StoryCreate /> : <Redirect to="/login" />}
                        </Route>
                        <Route path="/stories/:id" component={StoryDetail} exact />
                        <Route path="/stories/:id/edit" exact>
                            {cookies.token ? <Route path="/stories/:id/edit" component={StoryEdit} /> : <Redirect to="/login" />}
                        </Route>
                        <Route path="/stories/:id/delete" exact>
                            {cookies.token ? <Route path="/stories/:id/delete" component={StoryDelete} /> : <Redirect to="/login" />}
                        </Route>
                    </Switch>
                </Router>
            </main>
        </CookiesProvider>
    );
}

export default App;
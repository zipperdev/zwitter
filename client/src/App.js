import React, { useState, useEffect } from "react";
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
import StoryDetail from "./pages/Storys/StoryDetail";
import StoryCreate from "./pages/Storys/StoryCreate";
import StoryEdit from "./pages/Storys/StoryEdit";
import StoryDelete from "./pages/Storys/StoryDelete";
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
            {done ? (
                <>
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
                                    <a href="/storys/create">
                                        <AddCircleOutlineRounded color="primary" />
                                    </a>
                                    <a href={`/users/${encodedToken.user._id}`}>
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
                                <Route path="/storys/create" exact>
                                    {cookies.token ? <StoryCreate /> : <Redirect to="/login" />}
                                </Route>
                                <Route path="/storys/:id" component={StoryDetail} exact />
                                <Route path="/storys/:id/edit" exact>
                                    {cookies.token ? <Route path="/storys/:id/edit" component={StoryEdit} /> : <Redirect to="/login" />}
                                </Route>
                                <Route path="/storys/:id/delete" exact>
                                    {cookies.token ? <Route path="/storys/:id/delete" component={StoryDelete} /> : <Redirect to="/login" />}
                                </Route>
                            </Switch>
                        </Router>
                    </main>
                </>
            ) : (
                <h1>Loading...</h1>
            )}
        </CookiesProvider>
    );
}

export default App;
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { CookiesProvider, useCookies } from "react-cookie";
import { Route, BrowserRouter as Router, Switch, Redirect, Link, useRouteMatch } from "react-router-dom";
import HomeRounded from "@material-ui/icons/HomeRounded";
import MapRounded from "@material-ui/icons/MapRounded";
import PersonRounded from "@material-ui/icons/PersonRounded";
import PersonAddRounded from "@material-ui/icons/PersonAddRounded";
import LockRounded from "@material-ui/icons/LockRounded";
import LockOpenRounded from "@material-ui/icons/LockOpenRounded";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import LogoImage from "./images/logo.svg";
import jwt from "jsonwebtoken";
import Home from "./pages/Home";
import ZweetDetail from "./pages/Zweets/ZweetDetail";
import ZweetCreate from "./pages/Zweets/CreateZweet";
import ZweetEdit from "./pages/Zweets/EditZweet";
import ZweetDelete from "./pages/Zweets/DeleteZweet";
import Signup from "./pages/Users/Signup";
import Login from "./pages/Users/Login";
import Logout from "./pages/Users/Logout";
import UserDetail from "./pages/Users/UserDetail";
import NotFound from "./pages/Errors/NotFound";
import Explore from "./pages/Explore";
import "./scss/styles.scss";

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
            <Router>
                <header>
                    <RouterLink id="header__logo" exact={true} to="/" html={(
                        <img src={LogoImage} alt="Zwitter" />
                    )} />
                    <RouterLink exact={true} to="/" html={(
                        <>
                            <HomeRounded />
                            <span>Home</span>
                        </>
                    )} />
                    <RouterLink exact={true} to="/explore" html={(
                        <>
                            <MapRounded />
                            <span>Explore</span>
                        </>
                    )} />
                    {cookies.token ? (
                        <>
                            <RouterLink exact={true} to={done ? `/users/${encodedToken.user._id}` : "/users/null"} html={(
                                <>
                                    <PersonRounded />
                                    <span>Profile</span>
                                </>
                            )} />
                            <RouterLink exact={true} to="/logout" html={(
                                <>
                                    <LockRounded />
                                    <span>Logout</span>
                                </>
                            )} />
                            <RouterLink className="write-zweet" exact={true} to="/zweets/create" html={(
                                <>
                                    <span>Zweet</span>
                                    <CreateRoundedIcon className="write-icon" />
                                </>
                            )} />
                        </>
                    ) : (
                        <>
                            <RouterLink exact={true} to="/signup" html={(
                                <>
                                    <PersonAddRounded />
                                    <span>Sign Up</span>
                                </>
                            )} />
                            <RouterLink exact={true} to="/login" html={(
                                <>
                                    <LockOpenRounded />
                                    <span>Login</span>
                                </>
                            )} />
                        </>
                    )}
                </header>
                <main>
                    <Switch>
                        <Route path={`/`} component={Home} exact={true} />
                        <Route path={`/explore`} component={Explore} exact={true} />
                        <Route path={`/signup`} exact={true}>
                            {!cookies.token ? <Signup /> : <Redirect to="/" exact={true} />}
                        </Route>
                        <Route path={`/login`} exact={true}>
                            {!cookies.token ? <Login /> : <Redirect to="/" exact={true} />}
                        </Route>
                        <Route path={`/logout`} exact={true}>
                            {cookies.token ? <Logout /> : <Redirect to="/" exact={true} />}
                        </Route>
                        <Route path={`/users/:id([0-9a-f]{24})`} component={UserDetail} exeact />
                        <Route path={`/zweets/create`}  exact={true}>
                            {cookies.token ? <ZweetCreate /> : <Redirect to="/login" exact={true} />}
                        </Route>
                        <Route path={`/zweets/:id([0-9a-f]{24})`} component={ZweetDetail} exact={true} />
                        <Route path={`/zweets/:id([0-9a-f]{24})/edit`} exact={true}>
                            {cookies.token ? <Route path="/zweets/:id/edit" component={ZweetEdit} exact={true} /> : <Redirect to="/login" exact={true} />}
                        </Route>
                        <Route path={`/zweets/:id/delete`} exact={true}>
                            {cookies.token ? <Route path="/zweets/:id/delete" component={ZweetDelete} exact={true} /> : <Redirect to="/login" exact={true} />}
                        </Route>
                        <Route path={`*`} component={NotFound} />
                    </Switch>
                </main>
            </Router>
        </CookiesProvider>
    );
};

function RouterLink({ html, id, className, to, exact }) {
    let match = useRouteMatch({
        path: to, 
        exact
    });
    return (
        <Link id={id ? id : ""} className={match || className ? `current-location ${className}` : match ? "current-location" : ""} to={to}>{html}</Link>
    );
};

export default App;
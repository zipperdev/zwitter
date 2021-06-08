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
import CreateZweet from "./pages/Zweets/CreateZweet";
import EditZweet from "./pages/Zweets/EditZweet";
import DeleteZweet from "./pages/Zweets/DeleteZweet";
import Signup from "./pages/Users/Signup";
import Login from "./pages/Users/Login";
import Logout from "./pages/Users/Logout";
import UserDetail from "./pages/Users/UserDetail";
import EditUser from "./pages/Users/EditUser";
import DeleteUser from "./pages/Users/DeleteUser";
import NotFound from "./pages/Errors/NotFound";
import Explore from "./pages/Explore";
import EditPassword from "./pages/Users/EditPassword";
import ScrollReset from "./ScrollReset";
import "./scss/styles.scss";

function App() {
    const [ cookies ] = useCookies(["token"]);
    const [ encodedToken, setEncodedToken ] = useState("");
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
                <ScrollReset>
                    <header>
                        <RouterLink id="header__logo" exact to="/" html={(
                            <img src={LogoImage} alt="Zwitter" />
                        )} />
                        <RouterLink exact to="/" html={(
                            <>
                                <HomeRounded />
                                <span>Home</span>
                            </>
                        )} />
                        <RouterLink exact to="/explore" html={(
                            <>
                                <MapRounded />
                                <span>Explore</span>
                            </>
                        )} />
                        {cookies.token ? (
                            <>
                                <RouterLink exact to={done ? `/users/${encodedToken.user._id}` : "/users/null"} html={(
                                    <>
                                        <PersonRounded />
                                        <span>Profile</span>
                                    </>
                                )} />
                                <RouterLink exact to="/logout" html={(
                                    <>
                                        <LockRounded />
                                        <span>Logout</span>
                                    </>
                                )} />
                                <RouterLink className="write-zweet" exact to="/zweets/create" html={(
                                    <>
                                        <span>Zweet</span>
                                        <CreateRoundedIcon className="write-icon" />
                                    </>
                                )} />
                            </>
                        ) : (
                            <>
                                <RouterLink exact to="/signup" html={(
                                    <>
                                        <PersonAddRounded />
                                        <span>Sign Up</span>
                                    </>
                                )} />
                                <RouterLink exact to="/login" html={(
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
                            <Route path={`/`} component={Home} exact />
                            <Route path={`/explore`} component={Explore} exact />
                            <Route path={`/signup`} exact>
                                {!cookies.token ? <Signup /> : <Redirect to="/" exact />}
                            </Route>
                            <Route path={`/login`} exact>
                                {!cookies.token ? <Login /> : <Redirect to="/" exact />}
                            </Route>
                            <Route path={`/logout`} exact>
                                {cookies.token ? <Logout /> : <Redirect to="/" exact />}
                            </Route>
                            <Route path={`/users/:id([0-9a-f]{24})`} component={UserDetail} exact />
                            <Route path={`/users/:id([0-9a-f]{24})/edit`} exact>
                                {cookies.token ? <Route path="/users/:id([0-9a-f]{24})/edit" component={EditUser} exact /> : <Redirect to="/login" exact />}
                            </Route>
                            <Route path={`/users/:id([0-9a-f]{24})/edit/password`} exact>
                                {cookies.token ? <Route path="/users/:id([0-9a-f]{24})/edit/password" component={EditPassword} exact /> : <Redirect to="/login" exact />}
                            </Route>
                            <Route path={`/users/:id([0-9a-f]{24})/delete`} exact>
                                {cookies.token ? <Route path="/users/:id([0-9a-f]{24})/delete" component={DeleteUser} exact /> : <Redirect to="/login" exact />}
                            </Route>
                            <Route path={`/zweets/create`}  exact>
                                {cookies.token ? <CreateZweet /> : <Redirect to="/login" exact />}
                            </Route>
                            <Route path={`/zweets/:id([0-9a-f]{24})`} component={ZweetDetail} exact />
                            <Route path={`/zweets/:id([0-9a-f]{24})/edit`} exact>
                                {cookies.token ? <Route path="/zweets/:id([0-9a-f]{24})/edit" component={EditZweet} exact /> : <Redirect to="/login" exact />}
                            </Route>
                            <Route path={`/zweets/:id/delete`} exact>
                                {cookies.token ? <Route path="/zweets/:id([0-9a-f]{24})/delete" component={DeleteZweet} exact /> : <Redirect to="/login" exact />}
                            </Route>
                            <Route path={`*`} component={NotFound} />
                        </Switch>
                    </main>
                </ScrollReset>
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
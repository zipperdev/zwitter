import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { CookiesProvider, useCookies } from "react-cookie";
import { Route, BrowserRouter as Router, Switch, Redirect, Link, useRouteMatch } from "react-router-dom";
import HomeRounded from "@material-ui/icons/HomeRounded";
import MapRounded from "@material-ui/icons/MapRounded";
import AccountCircleRounded from "@material-ui/icons/AccountCircleRounded";
import PersonAddRounded from "@material-ui/icons/PersonAddRounded";
import LockRounded from "@material-ui/icons/LockRounded";
import LockOpenRounded from "@material-ui/icons/LockOpenRounded";
import LogoImage from "./images/logo.svg";
import jwt from "jsonwebtoken";
import Home from "./pages/Home";
import ZweetDetail from "./pages/Zweets/ZweetDetail";
import ZweetCreate from "./pages/Zweets/ZweetCreate";
import ZweetEdit from "./pages/Zweets/ZweetEdit";
import ZweetDelete from "./pages/Zweets/ZweetDelete";
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
                                    
                                    <AccountCircleRounded />
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
                                <span>Zweet</span>
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
                        <Route path={`/`} component={Home} exact />
                        <Route path={`/explore`} component={Explore} exact />
                        <Route path={`/signup`} exact>
                            {!cookies.token ? <Signup /> : <Redirect to="/" />}
                        </Route>
                        <Route path={`/login`} exact>
                            {!cookies.token ? <Login /> : <Redirect to="/" />}
                        </Route>
                        <Route path={`/logout`} exact>
                            {cookies.token ? <Logout /> : <Redirect to="/" />}
                        </Route>
                        <Route path={`/users/:id`} component={UserDetail} exeact />
                        <Route path={`/zweets/create`} exact>
                            {cookies.token ? <ZweetCreate /> : <Redirect to="/login" />}
                        </Route>
                        <Route path={`/zweets/:id`} component={ZweetDetail} exact />
                        <Route path={`/zweets/:id/edit`} exact>
                            {cookies.token ? <Route path="/zweets/:id/edit" component={ZweetEdit} /> : <Redirect to="/login" />}
                        </Route>
                        <Route path={`/zweets/:id/delete`} exact>
                            {cookies.token ? <Route path="/zweets/:id/delete" component={ZweetDelete} /> : <Redirect to="/login" />}
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
        <Link id={id ? id : ""} className={match, className ? `current-location ${className}` : match ? "current-location" : ""} to={to}>{html}</Link>
    );
};

export default App;
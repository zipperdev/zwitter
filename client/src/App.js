import React from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import HomeRounded from "@material-ui/icons/HomeRounded";
import AddCircleOutlineRounded from "@material-ui/icons/AddCircleOutlineRounded";
import Storys from "./pages/Storys/Storys";
import StoryDetail from "./pages/Storys/StoryDetail";
import StoryCreate from "./pages/Storys/StoryCreate";
import StoryEdit from "./pages/Storys/StoryEdit";
import StoryDelete from "./pages/Storys/StoryDelete";
import Signup from "./pages/Users/Signup";
import Login from "./pages/Users/Login";
import Logout from "./pages/Users/Logout";

function App() {
    const [ cookies ] = useCookies(["token"]);
    return (
        <CookiesProvider>
            <header>
                <nav>
                    <a href="/">
                        <HomeRounded color="primary" />
                    </a>
                    <a href="/storys/create">
                        <AddCircleOutlineRounded color="primary" />
                    </a>
                </nav>
            </header>
            <main>
                <Router>
                    <Switch>
                        <Route path="/" component={Storys} exact />
                        <Route path="/signup" exact>
                            {!cookies.token ? <Signup /> : <Redirect to="/" />}
                        </Route>
                        <Route path="/login" exact>
                            {!cookies.token ? <Login /> : <Redirect to="/" />}
                        </Route>
                        <Route path="/logout" exact>
                            {cookies.token ? <Logout /> : <Redirect to="/" />}
                        </Route>
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
        </CookiesProvider>
    );
}

export default App;

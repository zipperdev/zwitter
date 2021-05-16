import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import HomeRounded from "@material-ui/icons/HomeRounded";
import AddCircleOutlineRounded from "@material-ui/icons/AddCircleOutlineRounded";
import Storys from "./pages/Storys/Storys";
import StoryDetail from "./pages/Storys/StoryDetail";
import StoryCreate from "./pages/Storys/StoryCreate";
import StoryEdit from "./pages/Storys/StoryEdit";
import StoryDelete from "./pages/Storys/StoryDelete";

function App() {
    return (
        <>
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
                        <Route path="/storys/create" component={StoryCreate} exact />
                        <Route path="/storys/:id" component={StoryDetail} exact />
                        <Route path="/storys/:id/edit" component={StoryEdit} exact />
                        <Route path="/storys/:id/delete" component={StoryDelete} exact />
                    </Switch>
                </Router>
            </main>
        </>
    );
}

export default App;

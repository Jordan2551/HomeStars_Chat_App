import {Router, Route, Switch, Redirect} from "react-router-dom";
import Channels from "./Channels/Channels";
import Welcome from "./Pages/Welcome";
import _404 from "./Pages/_404";
import React from "react";
import Channel from "./Channel/Channel";
import UserMessages from "./Messages/UserMessages";
import history from "../helpers/history";
import { Container, CssBaseline } from "@mui/material";

// FONTS
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Header from "./Header/Header";
import withAuth from "./User/withAuth";
import Login from "./User/Login";

const App = ({isLoggedin, login, logout, user}) => {
    return(
        <>
            <Router history={history}>
                <CssBaseline>
                    <Header 
                        isLoggedin={isLoggedin}
                        logout={logout}
                        user={user}
                    />
                    <Container>
                        <Switch>
                            <Route exact path="/channels">
                                <Channels/>
                            </Route>
                            <Route exact path="/channel/:id">
                                <Channel/>
                            </Route>
                            <Route exact path="/users/messages">
                                <UserMessages/>
                            </Route>
                            <Route exact path="/login">
                                <Login login={login}/>
                            </Route>
                            <Route exact path="/">
                                <Welcome/>
                            </Route>
                            <Route exact path="/404" component={_404}/>
                            {/* If route is not found then redirect to 404 */}
                            <Route>
                                <Redirect from="*" to ="/404"/>
                            </Route>
                        </Switch>
                    </Container>
                </CssBaseline>
            </Router>
        </>
    )
}

export default withAuth(App);
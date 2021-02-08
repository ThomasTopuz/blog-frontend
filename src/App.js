import './App.scss';
import React, {useState} from 'react';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/app/Dashboard";
import "./App.scss"
//components
import NavBar from './components/appBar';
import LoginPage from "./components/auth/loginPage";
import SignUpPage from "./components/auth/signUp";
import MyPosts from "./components/app/MyPosts";
import LikedPosts from "./components/app/LikedPosts";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#39ba55',
            main: '#91fc93',
            dark: '#65d74b',
            contrastText: '#000',
        },
    },
});


function App() {
    let [username, setUsername] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).username : "");

    function gotUsername(usr) {
        setUsername(usr);
    }
    return (
        <ThemeProvider theme={theme}>

            <Router>
                <NavBar username ={username}/>
                <Switch>
                    <Route path={"/login"}>
                        <LoginPage getUsername={gotUsername}/>
                    </Route>
                    <Route path={"/signup"}>
                        <SignUpPage/>
                    </Route>
                    <Route path={"/dashboard"} exact>
                        <Dashboard/>
                    </Route>
                    <Route path={"/myposts"} exact>
                        <MyPosts/>
                    </Route>
                    <Route path={"/likedposts"} exact>
                        <LikedPosts/>
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>

    )
}

export default App;

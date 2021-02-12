import './App.scss';
import React, {useState, useMemo, useEffect} from 'react';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route, useHistory, Redirect} from "react-router-dom";
import "./App.scss"
import {UserContext} from './context/UserContext';

//components
import NavBar from './components/appBar';
import Login from "./components/auth/login";
import SignUpPage from "./components/auth/signUp";
import MyPosts from "./components/app/MyPosts";
import LikedPosts from "./components/app/LikedPosts";
import Dashboard from "./components/app/Dashboard";
import axios from "axios";

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
            main: '#68ba69',
            dark: '#65d74b',
            contrastText: '#000',
        },
        third: {
            light: '#ff5858',
            main: '#e23a3a',
            dark: '#8d1c1c',
            contrastText: '#000',
        }
    },
});


function App() {
    const [user, setUser] = useState(undefined);
    const userProviderValue = useMemo(() => ({user, setUser}), [user, setUser]);
    let history = useHistory();

    useEffect(() => {
        if (!user) {
            localStorage.getItem("jwtToken")
            axios.get("http://localhost:5000/api/v1/users/me", {headers: {'x-auth-token': localStorage.getItem('jwtToken')}})
                .then(res => {
                    setUser(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [history, user]);

    return (
        <ThemeProvider theme={theme}>

            <Router>
                <UserContext.Provider value={userProviderValue}>
                    <NavBar username={"admin"}/>
                    <Switch>
                        <Route path={"/login"}>
                            <Login/>
                        </Route>
                        <Route path={"/signup"}>
                            <SignUpPage/>
                        </Route>
                        <Route path={"/dashboard"} exact>
                            <Dashboard/>
                        </Route>
                        <Route path={"/myposts"} exact>
                            {!user ? <Redirect to="/dashboard"/> : <MyPosts/>}
                        </Route>
                        <Route path={"/likedposts"} exact>
                            {!user ? <Redirect to="/dashboard"/> : <LikedPosts/>}
                        </Route>

                    </Switch>

                </UserContext.Provider>
            </Router>
        </ThemeProvider>

    )
}

export default App;

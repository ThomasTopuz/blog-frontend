import './App.scss';
import React, {useState, useMemo, useEffect} from 'react';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route, useHistory, Redirect} from "react-router-dom";
import "./App.scss"
import {UserContext} from './context/UserContext';

//components
import NavBar from './components/appBar';
import Login from "./container/login";
import SignUpPage from "./container/signUp";
import MyPosts from "./container/MyPosts";
import LikedPosts from "./container/LikedPosts";
import Feed from "./container/Feed";
import axios from "axios";
import AdminPanel from "./container/AdminPanel";
import BASE_URL from "./BaseUrl";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#39ba77',
            main: '#68ba89',
            dark: '#4bd78f',
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
        if (!user && localStorage.getItem("jwtToken")) {
            axios.get(BASE_URL + "/users/me", {headers: {'x-auth-token': localStorage.getItem('jwtToken')}})
                .then(res => {
                    setUser(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setUser(null); //not logged
        }
    }, []);

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
                        <Route path={"/feed"} exact>
                            <Feed/>
                        </Route>
                        <Route path={"/myposts"} exact>
                            {!user ? <Redirect to="/feed"/> : <MyPosts/>}
                        </Route>
                        <Route path={"/likedposts"} exact>
                            {!user ? <Redirect to="/feed"/> : <LikedPosts/>}
                        </Route>
                        <Route path={"/admin"} exact>
                            <AdminPanel/>
                        </Route>
                        <Redirect from="/" to="/feed"/>
                    </Switch>

                </UserContext.Provider>
            </Router>
        </ThemeProvider>

    )
}

export default App;

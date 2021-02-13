import React, {useContext} from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import {UserContext} from "../context/UserContext";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {IconButton} from "@material-ui/core";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function NavBar() {
    const {user, setUser} = useContext(UserContext);
    const logout = () => {
        setUser(undefined);
        localStorage.removeItem('jwtToken');
    }
    return (
        <div className={useStyles.root}>
            <AppBar position="static">
                <Toolbar className={"float-right"}>
                    <div className={"d-flex justify-content-between w-100"}>
                        <div className={"d-flex align-items-center"}>
                            <Link to={"/feed"}>
                                <IconButton aria-label="feed" style={{'color': 'white'}}>
                                    <HomeIcon/>
                                </IconButton>
                            </Link>
                            {user &&
                            <div className={"m-0 p-0 float-right"}>
                                <Link to={"/myposts"}
                                      style={{textDecoration: 'none', color: "white"}}>
                                    <Button color="inherit">My Posts</Button>
                                </Link>

                                <Link to={"/likedposts"}
                                      style={{textDecoration: 'none', color: "white"}}>

                                    <Button color="inherit">Liked Posts</Button>
                                </Link>
                            </div>}

                        </div>
                        <div className={"d-flex align-items-center"}>

                            {user ? (<div>
                                    <Button color="inherit">{user?.username}</Button>

                                    {user.isAdmin &&
                                    <Link to={"/admin"} style={{
                                        textDecoration: 'none',
                                        color: "white"
                                    }}>
                                        <Button className={"mr-2"} color={"secondary"} variant={"contained"}
                                                endIcon={<SupervisorAccountIcon/>}>
                                            Admin
                                        </Button>
                                    </Link>}

                                    <Link to={"/login"} onClick={logout}>
                                        <IconButton aria-label="delete" style={{'color': 'white'}}>
                                            <ExitToAppIcon/>
                                        </IconButton>
                                    </Link>

                                </div>)
                                :
                                <Link to={"/login"} style={{
                                    textDecoration: 'none',
                                    color: "white"
                                }}>
                                    <Button variant="contained" color="secondary">Login</Button>
                                </Link>
                            }
                        </div>
                    </div>


                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;

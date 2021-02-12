import React, {useContext} from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import {UserContext} from "../context/UserContext";

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
    return (
        <div className={useStyles.root}>
            <AppBar position="static">
                <Toolbar className={"float-right"}>
                    <div className={"d-flex justify-content-between w-100"}>
                        <div>
                            <Button className={""} color="inherit" startIcon={<HomeIcon/>}>
                                <Link to={"/dashboard"}
                                      style={{textDecoration: 'none', color: "white"}}
                                >Home</Link>
                            </Button>
                            {user &&
                            <div className={"m-0 p-0 float-right"}>
                                <Button color="inherit"> <Link to={"/myposts"}
                                                               style={{textDecoration: 'none', color: "white"}}
                                >My Posts</Link></Button>
                                <Button color="inherit"> <Link to={"/likedposts"}
                                                               style={{textDecoration: 'none', color: "white"}}
                                >Liked Posts</Link></Button>
                            </div>}

                        </div>
                        <div>

                            {user ? (<div>
                                    <Button color="inherit">{user?.username} </Button>
                                    <Button variant="contained" color="default"
                                            onClick={() => setUser(null)}>Logout</Button>
                                </div>)
                                :
                                <Button variant="contained" color="secondary"> <Link to={"/login"} style={{
                                    textDecoration: 'none',
                                    color: "white"
                                }}
                                >Login</Link></Button>
                            }
                        </div>
                    </div>


                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;

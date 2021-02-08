import React, {useState} from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';

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
    let username = localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")).username : "username";
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
                            <Button color="inherit"> <Link to={"/myposts"}style={{textDecoration: 'none', color: "white"}}
                            >My Posts</Link></Button>
                            <Button color="inherit"> <Link to={"/likedposts"}style={{textDecoration: 'none', color: "white"}}
                            >Liked Posts</Link></Button>
                        </div>
                        <div>
                            <Button color="inherit">{username}</Button>
                        </div>
                    </div>


                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;

import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";

export default function MobileNavbar({ user, logout }) {
  let [isOpen, setIsOpen] = useState(false);
  const hideDrawer = () => setIsOpen(false);
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar className={"float-right"}>
          <div className={"d-flex justify-content-between w-100"}>
            <div className={"d-flex align-items-center"}>
              {user ? (
                <IconButton
                  aria-label="feed"
                  style={{ color: "white" }}
                  onClick={() => setIsOpen(true)}
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <Link to={"/feed"}>
                  <IconButton aria-label="feed" style={{ color: "white" }}>
                    <HomeIcon />
                  </IconButton>
                </Link>
              )}
            </div>
            <div className={"d-flex align-items-center"}>
              {user ? (
                <div>
                  <Button color="inherit">{user?.username}</Button>

                  <Link to={"/login"} onClick={logout}>
                    <IconButton aria-label="delete" style={{ color: "white" }}>
                      <ExitToAppIcon />
                    </IconButton>
                  </Link>
                </div>
              ) : (
                <Link
                  to={"/login"}
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  <Button variant="contained" color="secondary">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer anchor={"left"} open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="d-flex flex-column m-3">
          <Link to={"/feed"} style={{ textDecoration: "none", color: "black" }}>
            <Button
              className="w-100 p-2 m-1"
              color={"primary"}
              variant={"contained"}
              onClick={hideDrawer}
            >
              Feed
            </Button>
          </Link>
          {user && (
            <div className="d-flex flex-column">
              <Link
                to={"/myposts"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Button
                  className="w-100 p-2 m-1"
                  color={"primary"}
                  variant={"contained"}
                  onClick={hideDrawer}
                >
                  My Posts
                </Button>
              </Link>

              <Link
                to={"/likedposts"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Button
                  className="w-100 p-2 m-1"
                  color={"primary"}
                  variant={"contained"}
                  onClick={hideDrawer}
                >
                  Liked Posts
                </Button>
              </Link>
            </div>
          )}
          {user?.isAdmin && (
            <Link
              to={"/admin"}
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              <Button
                className="w-100 p-2 m-1"
                color={"secondary"}
                variant={"contained"}
                endIcon={<SupervisorAccountIcon />}
                onClick={hideDrawer}
              >
                Admin
              </Button>
            </Link>
          )}
        </div>
      </Drawer>
    </div>
  );
}

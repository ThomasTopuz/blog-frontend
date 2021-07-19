import React, {useContext} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {UserContext} from "../../context/UserContext";
import {useMediaQuery} from "react-responsive";
import MobileNavbar from "./MobileNavbar";
import DesktopBar from "./DesktopBar";

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

function Navbar() {
    const {user, setUser} = useContext(UserContext);
    const isTabletOrMobile = useMediaQuery({
        query: "(max-device-width: 1224px)",
    });

    const logout = () => {
        setUser(undefined);
        localStorage.removeItem("jwtToken");
    };
    return (
        <>
            {isTabletOrMobile ? (
                <MobileNavbar user={user} logout={logout}/>
            ) : (
                <DesktopBar user={user} logout={logout}/>
            )}
        </>
    );
}

export default Navbar;

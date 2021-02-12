import React from 'react';
import {Route} from "react-router-dom";
import * as PropTypes from "prop-types";

class Redirect extends React.Component {
    render() {
        return null;
    }
}

Redirect.propTypes = {to: PropTypes.string};

function ProtectedRoute({component: Component, ...rest}) {
    return (
        <Route {...rest} render={(props) => (
            localStorage.getItem('jwtToken') ? <Component {...props} /> : <Redirect to='/login'/>
        )}/>
    );
}

export default ProtectedRoute;

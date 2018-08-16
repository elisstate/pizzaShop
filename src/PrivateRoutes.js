import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import * as loginState from "./lib/loginState.js"

class PrivateRoutes extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (loginState.getLoginStatus() === true) {
            return this.props.children
        } else {
            return <Redirect to={{ pathname: "/home" }} />
        }
    }
}

export default PrivateRoutes;
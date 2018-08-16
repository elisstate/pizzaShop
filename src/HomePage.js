import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { RaisedButton } from 'material-ui';
import Header from "./Header";
import Login from "./Login";
import PizzaMenu from "./PizzaMenu";
import ShoppingCart from "./ShoppingCart";
import PrivateRoutes from "./PrivateRoutes";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './css/style.css';
import * as loginState from "./lib/loginState.js";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <BrowserRouter>
                        <div>
                            <Header />
                            <Switch>
                                <Route exact path="/login"
                                    component={Login}
                                />
                                <Route exact path="/home"
                                    component={PizzaMenu}
                                />
                                <PrivateRoutes>
                                    <Route exact path="/shoppingCart"
                                        component={ShoppingCart}
                                    />
                                </PrivateRoutes>
                            </Switch>
                            <Redirect from="/" to="/home" />
                        </div>
                    </BrowserRouter>
                </MuiThemeProvider>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.logHandle
}

export default connect(
    mapStateToProps,
    null
)(HomePage)

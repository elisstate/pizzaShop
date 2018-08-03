import React, { Component } from 'react';

import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RaisedButton } from 'material-ui';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import CartIcon from 'material-ui/svg-icons/action/shopping-basket';
import LogoutIcon from 'material-ui/svg-icons/action/exit-to-app'
import LoginIcon from 'material-ui/svg-icons/action/account-circle'
import * as loginState from "./lib/loginState.js"
import * as loginActions from "./actions/loginActions.js"
import * as pizzaOrderActions from "./actions/pizzaOrderAction.js"

class Header extends Component {
    constructor(props) {
        super(props);
        this.handleLog = this.handleLog.bind(this);
    }

    handleLog() {
        this.props.actions.loginActions.logout("");
        this.props.actions.pizzaOrderActions.cleanCart();
    }
    render() {
        return (
            <Toolbar className="HeaderComp">
                <Link to="/home">
                    <ToolbarGroup>

                        <img src={require('./css/logo2.png')}
                            style={{ width: '200px', height: '200px' }} />
                    </ToolbarGroup>
                </Link>
                {
                    this.props.loggedIn ?
                        (
                            <ToolbarGroup>
                                <Link to="/shoppingCart">
                                    <RaisedButton
                                        labelColor="#96450f"
                                        backgroundColor="#edb138"
                                        icon={<CartIcon color="#96450f" />}
                                    />
                                </Link>

                                <Link to="/home">
                                    <RaisedButton
                                        icon={<LogoutIcon color="#96450f" />}
                                        labelColor="#96450f"
                                        backgroundColor="#edb138"
                                        onClick={this.handleLog} />

                                </Link>
                            </ToolbarGroup>


                        ) : (
                            <ToolbarGroup>
                                <Link to="/login" >
                                    <RaisedButton className="loginButton"
                                        label="Login"
                                        labelColor="#96450f"
                                        backgroundColor="#edb138"
                                        icon={<LoginIcon color="#96450f" />}
                                    />
                                </Link>
                            </ToolbarGroup>
                        )
                }
            </Toolbar>
        );
    }
}

function mapStateToProps(state) {
    return state.logHandle;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loginActions: bindActionCreators(loginActions, dispatch),
            pizzaOrderActions: bindActionCreators(pizzaOrderActions, dispatch)
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
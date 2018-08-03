import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Header from "./Header";
import Login from "./Login";
import PizzaMenu from "./PizzaMenu";
import ShoppingCart from "./ShoppingCart";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './css/style.css';
import * as loginState from "./lib/loginState.js"

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <MuiThemeProvider >
                    <BrowserRouter>
                        <div>
                            <Header />
                            {
                                this.props.loggedIn === true &&
                                this.props.username !== "admin" &&
                                <h3 style={{ textAlign: "right" }}>
                                    You are logged in as {this.props.username}
                                </h3>
                            }
                            <Switch>
                                <Route exact path="/login" render={() =>
                                    <Login handleLog={this.handleLog} />} />
                                <Route exact path="/home" render={() =>
                                    <PizzaMenu />} />


                                <Route exact path="/shoppingCart" render={() =>
                                    loginState.getLoginStatus() === true ?
                                        (<ShoppingCart />) : (
                                            <Redirect to={{ pathname: "/home" }}/>
                                        )
                                }
                                />
                                <Redirect from="/" to="/home" />
                            </Switch>
                        </div>
                    </BrowserRouter>
                </MuiThemeProvider >
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.logHandle;
}

export default connect(
    mapStateToProps,
    null
)(HomePage);

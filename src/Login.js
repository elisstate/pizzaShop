import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Card from 'material-ui/Card';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginIcon from 'material-ui/svg-icons/action/account-circle'
import * as loginState from "./lib/loginState.js"
import * as loginActions from "./actions/loginActions.js"


class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        }

        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleChangeUsername(event) {
        this.setState({
            username: event.target.value
        });
    }

    handleChangePass(event) {
        this.setState({
            password: event.target.value
        });
    }

    handleLogin(event) {
        this.props.loginActions.login(this.state.username, this.state.password)
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    render() {

        return (
            <div>
                <Card className="loginBox" >
                    <br />
                        <h2 className="loginContent">
                            Member Login
                        </h2> 

                    <FormGroup controlId="user" className="loginInput">

                        <TextField label="username"
                            placeholder="E-mail" name="user"
                            autoFocus type="textarea"
                            value={this.state.username}
                            onChange={this.handleChangeUsername}
                            className="loginContent" 
                        />
                    </FormGroup>
                    <br />
                    <FormGroup controlId="password"  >

                        <TextField placeholder="Password"
                            name="password" autoFocus type="password"
                            value={this.state.password}
                            onChange={this.handleChangePass}
                            className="loginContent" />
                    </FormGroup>


                    { this.validateForm() === true ? (
                        <Link to="/home">
                            <RaisedButton className="loginContent"
                                disabled={false}
                                onClick={this.handleLogin}
                                backgroundColor="#edb138">
                                Login
                        </RaisedButton>
                        </Link>
                    ) : (
                        <RaisedButton className="loginContent"
                            disabled={true}>
                            Login
                        </RaisedButton>
                        )
                    }
                </Card>
            </div>
        );
    }

}
function mapStateToProps(state) {
    return state.logHandle;
}

function mapDispatchToProps(dispatch) {
   return {
        loginActions: bindActionCreators(loginActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)  (Login);
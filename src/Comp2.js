import React from 'react';
import { GridList } from 'material-ui/GridList'
import { RaisedButton, TextField } from 'material-ui'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import './css/style.css'
import PizzaComp from './PizzaComp'
import PizzaCompAdmin from './PizzaCompAdmin'
import OrdersAdmin from './OrdersAdmin'
import pizzasData from './pizzas.json'
import { Tabs, Tab } from 'material-ui/Tabs'
import { FormGroup, ControlLabel } from "react-bootstrap"
import ChipInput from 'material-ui-chip-input'
import * as loginState from "./lib/loginState.js"
import axios from 'axios';

import * as adminActions from "./actions/adminActions.js"
import * as testActions from "./actions/testActions.js"


class Comp2 extends React.Component {
    constructor(props) {
        super(props);


    };

    render() {
        console.log('from comp2')
         return (
        <RaisedButton
                    style={{ marginTop: "250" }}
                    className="loginContent"
                    onClick={(e) => this.props.testActions.modify2(this.props.val2)}
                >
                   {this.props.val2}
                </RaisedButton>
     )
    }
}

function mapStateToProps(state) {
    return {
        val2: state.testReducer.val2,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        testActions: bindActionCreators(testActions, dispatch),
    };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comp2);
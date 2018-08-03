import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import { GridList, GridTile } from 'material-ui/GridList';
import { IconButton, Paper, Chip } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RemoveIcon from 'material-ui/svg-icons/action/delete';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import './css/style.css';
import { withStyles } from 'material-ui/styles';
import * as pizzaOrderActions from "./actions/pizzaOrderAction.js"


class PizzaCompOrder extends React.Component {
    constructor(props) {
        super(props);

        this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this)
    }


    handleRemoveFromCart() {
        this.props.pizzaOrderActions.removeFromCart(this.props.pizza);
    
    }

    render() {
 
        return (

            <TableRow key={this.props.pizza.id} >
                <TableRowColumn>
                   { this.props.pizza.id <= 3 ? (
                        <img src = {require('./css/pizzaPics/'+ 
                        this.props.pizza.id +'.jpg')}
                         height = "70"
                    width = "125"/>
                    ) : (
                        <img src = {require('./css/pizzaPics/general.png')}
                         height = "70"
                    width = "125"/>
                    )
                }
             </TableRowColumn>
                <TableRowColumn className="cellTable">
                    {this.props.pizza.name}
                </TableRowColumn>

                <TableRowColumn className="cellTable">
                    {this.props.pizza.baseSel}
                </TableRowColumn>

                <TableRowColumn className="cellTable">
                    {this.props.pizza.price}
                </TableRowColumn>

                <TableRowColumn className="cellTable">

                    {this.props.pizza.count}

                </TableRowColumn>
                <TableRowColumn className="cellTable">
                    {
                        <IconButton tooltip="Remove one item"
                            tooltipPosition="left-bottom"
                            onClick={this.handleRemoveFromCart}>
                            <RemoveIcon color="#96450f" />
                        </IconButton>
                    }
                </TableRowColumn>
            </TableRow>
        );
    }

}

function mapStateToProps(state) {
    return state.shoppingCart;
}

function mapDispatchToProps(dispatch) {
    return {
        pizzaOrderActions: bindActionCreators(pizzaOrderActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)  (PizzaCompOrder);
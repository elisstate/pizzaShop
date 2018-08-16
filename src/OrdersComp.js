import React from 'react';
import {
    Table,
    TableRow,
    TableRowColumn,
    TableBody,
    TableFooter
} from 'material-ui/Table';

import { Paper, RaisedButton, SelectField, MenuItem } from 'material-ui'
import './css/style.css';
import * as loginState from "./lib/loginState.js"


class OrdersComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            statusType: 1,
        }
        this.handleChangeStatus = this.handleChangeStatus.bind(this)
    }

    handleChangeStatus(event, intex, value) {
        this.setState({
            statusType: value
        })
    }

    getSelecter() {
        return (
        <SelectField
            floatingLabelText="Order Status"
            value={this.state.statusType}
            onChange={this.handleChangeStatus}
            style={{width: "200"}}
        >

            <MenuItem value={1} primaryText="Order received" />
            <MenuItem value={2} primaryText="Preparing" />
            <MenuItem value={3} primaryText="Order sent" />
        </SelectField>
        )
    }
    render() {
        return (
            <TableRow >
                <TableRowColumn style={{ width: "150" }}>
                    <h1>
                        {this.props.order.clientData.hourArrival}
                    </h1>
                </TableRowColumn>

                <TableRowColumn style={{
                    fontSize: "15", maxWidth: "250",
                    overflow: 'auto'
                }}>

                    <h4>Name:
                        <br />
                        {this.props.order.clientData.name}
                    </h4>
                    <h4> Address:
                        <br />
                        {this.props.order.clientData.address}
                    </h4>
                    <h4> Phone number:
                        <br />
                        {this.props.order.clientData.phoneNumber}
                    </h4>
                    <h4>  E-mail:
                        <br />
                        {this.props.order.email}
                    </h4>

                </TableRowColumn>

                <TableRowColumn style={{}}>

                    <Table
                        bodyStyle={{ overflow: 'visible' }}
                        style={{ tableLayout: 'auto' }}
                        fixedHeader={false}>
                        <TableBody
                            displayRowCheckbox={false}
                        >
                            <TableRow
                                className="headerOrderList"
                                key="42"
                                style={{ color: "white" }}
                            >
                                <TableRowColumn className="cellTable">
                                    Pizza type
                                </TableRowColumn>
                                <TableRowColumn className="cellTable">
                                    Base
                                </TableRowColumn>
                                <TableRowColumn className="cellTable">
                                    Price
                                </TableRowColumn>
                                <TableRowColumn className="cellTable">
                                    Pieces
                                </TableRowColumn>
                            </TableRow>
                            {
                                this.props.order.pizzas.map((pizza) => (
                                    <TableRow>
                                        <TableRowColumn className="cellTable">
                                            {pizza.name}
                                        </TableRowColumn>
                                        <TableRowColumn className="cellTable">
                                            {pizza.baseSel}
                                        </TableRowColumn>
                                        <TableRowColumn className="cellTable">
                                            {pizza.price}
                                        </TableRowColumn>

                                        <TableRowColumn className="cellTable">
                                            {pizza.count}
                                        </TableRowColumn>
                                    </TableRow>

                                ))
                            }
                            <TableRow>
                                <TableRowColumn>
                                    <h2> Total: {this.props.order.total} lei</h2>
                                </TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>

                </TableRowColumn>

                { loginState.getUsername() === "admin" &&

                <TableRowColumn className="cellTable" style={{ borderCollapse: "initial" }}>
                    {
                        this.getSelecter()
                    }
                </TableRowColumn>
                }
            </TableRow>
        )
    }
}

export default OrdersComp;
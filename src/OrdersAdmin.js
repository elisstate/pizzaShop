import React from 'react';
import {
    Table,
    TableRow,
    TableRowColumn,
    TableBody
} from 'material-ui/Table';

import {RaisedButton} from 'material-ui';
import './css/style.css';
import * as loginState from "./lib/loginState.js"
import OrdersComp from "./OrdersComp.js"

class OrdersAdmin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        console.log(this.props.orders);
        return (
            <div>
                <div className="mainTitle"> Orders </div>
                <Table
                    bodyStyle={{ overflow: 'visible' }}
                    style={{ tableLayout: 'auto', marginTop: "100",
                     }}
                    fixedHeader={false}
                    className="shoppingCart"
                >
                    <TableBody displayRowCheckbox={false}>
                        <TableRow
                            className="headerOrderList"
                            key="42"
                            style = {{color: "white"}}
                        >

                            <TableRowColumn className="cellTable">
                                Hour of delivery
                            </TableRowColumn>
                            <TableRowColumn className="cellTable">
                                Client data
                            </TableRowColumn>
                            <TableRowColumn className="cellTable">
                                Pizzas
                            </TableRowColumn>

                            <TableRowColumn className="cellTable" />
                            </TableRow>
                            {
                                this.props.orders
                                .sort((a,b) => a.clientData.hourArrival
                                    > b.clientData.hourArrival)
                                .map((order) => (
                                <OrdersComp order={order} />
                                ))  
                            }
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default OrdersAdmin;
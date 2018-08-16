import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormGroup } from 'react-bootstrap';
import { Paper, RaisedButton, TextField } from 'material-ui';
import {
    Table,
    TableBody,
    TableRow,
    TableRowColumn,
    TableFooter,
} from 'material-ui/Table';
import { Stepper, Step, StepLabel, StepContent } from 'material-ui/Stepper';
import SendIcon from 'material-ui/svg-icons/content/send';

import './css/style.css';
import * as loginState from "./lib/loginState.js"
import PizzaCompOrder from './ShoppingCartComp';
import * as pizzaOrderActions from "./actions/pizzaOrderAction.js";
import * as loginActions from "./actions/loginActions.js";
import * as shoppinCartState from "./lib/shoppingCartStorage.js";
import axios from 'axios';


function getOrderSteps() {
    return ['Complete your firstname and lastname', 'Complete your address',
        'Complete your phone number', 'Select the hour of arrival',
        'Send the order'];
}

class ShoppingCart extends React.Component {

    constructor(props) {
        super(props);
        let date = new Date();
        date.setMinutes(date.getMinutes() + 40);
        let currentHour = "".concat(date.getHours())
        currentHour = currentHour.concat(":");
        currentHour = currentHour.concat(date.getMinutes());

        this.state = {
            currentHour: currentHour,
            activeStep: 0,
            orderForm: false,
            clientData: {
                name: "",
                address: "",
                phoneNumber: "",
                hourArrival: currentHour
            }
        };

        this.handleSendOrder = this.handleSendOrder.bind(this);
        this.handleNextStep = this.handleNextStep.bind(this);
        this.handleBackStep = this.handleBackStep.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.getOrderFields = this.getOrderFields.bind(this);
        this.handleClientDataUpdate = this.handleClientDataUpdate.bind(this);
    }

    componentWillMount() {
        if (this.props.shoppingCartPizzas != null)
            this.props.actions.pizzaOrderActions.calculateTotal(this.props.shoppingCartPizzas);
    }

    handleNextStep() {
        this.setState({
            activeStep: this.state.activeStep + 1
        });
    }

    handleBackStep() {
        this.setState({
            activeStep: this.state.activeStep - 1
        });
    }

    handleReset() {
        this.setState({
            activeStep: 0
        });
    }

    handleSendOrder() {
        this.setState({
            orderForm: true
        })
    }

    handleSendData() {
        let data = {
            pizzas: this.props.shoppingCartPizzas,
            clientData: this.state.clientData,
            email: loginState.getUsername()
        }
        axios.post(`http://localhost:4000/orders/newOrder`, data);

        this.props.actions.pizzaOrderActions.cleanCart();
    }

    handleClientDataUpdate(event, index) {
        switch (index) {
            case 0:
                this.setState({
                    clientData: {
                        ...this.state.clientData,
                        name: event.target.value
                    }
                });
                break;
            case 1:
                this.setState({
                    clientData: {
                        ...this.state.clientData,
                        address: event.target.value
                    }
                });
                break;
            case 2:
                this.setState({
                    clientData: {
                        ...this.state.clientData,
                        phoneNumber: event.target.value
                    }
                });
                break;
            case 3:
                this.setState({
                    clientData: {
                        ...this.state.clientData,
                        hourArrival: event.target.value
                    }
                });

                break;
            default:
                return;
        }
    }

    getOrderFields(index) {
        switch (index) {
            case 0:
                return (
                    <FormGroup controlId="name" >
                        <TextField
                            placeholder="FirstName LastName"
                            name="name" autoFocus
                            className="sendOrderContent"
                            onChange={(e) => this.handleClientDataUpdate(e, index)}
                            value={this.state.clientData.name}
                        />

                    </FormGroup>
                );
            case 1:
                return (
                    <FormGroup controlId="address"  >
                        <TextField
                            placeholder="Address of delivery"
                            name="address" autoFocus
                            className="sendOrderContent"
                            onChange={(e) => this.handleClientDataUpdate(e, index)}
                            defaultValue={this.state.clientData.address}
                        />
                    </FormGroup>
                );
            case 2:
                return (
                    <FormGroup controlId="phoneNumber"  >
                        <TextField
                            placeholder="Phone number"
                            name="phoneNumber" autoFocus
                            className="sendOrderContent"
                            onChange={(e) => this.handleClientDataUpdate(e, index)}
                            value={this.state.clientData.phoneNumber}
                        />
                    </FormGroup>
                );
            case 3:
                return (
                    <FormGroup
                        controlId="hour"
                    >
                        <div> Please note that the fastest hour of delivery is
                            40 minutes from the current time
                        </div>
                        <br />
                        <TextField
                            placeholder="Hour for your delivery"
                            name="hour"
                            autoFocus
                            className="sendOrderContent"
                            type="time"
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ step: 300 }}
                            value={this.state.clientData.hourArrival}
                            onChange={(e) => this.handleClientDataUpdate(e, index)}
                        />
                    </FormGroup>
                );
            case 4:
                return (
                    <RaisedButton
                        style={{ marginTop: "250", maxWidth: "200" }}
                        className="loginContent"
                        onClick={this.handleSendData.bind(this)}
                    >
                        Send Order
                    </RaisedButton>
                );
            default:
                return (<br />);
        }
    }

    render() {
        const steps = getOrderSteps();

        return (
            <div>
                {this.props.shoppingCartPizzas.length === 0 ? (
                    <Paper
                        className="cartNoItems"
                        style={{ width: "400" }}
                    >
                        There are no products <br /> in the shopping cart!
                    </Paper>
                ) : (
                        <div className="shoppingCart">
                            <h2 className="mainTitle">
                                Your order
                            </h2>
                            <Paper>
                                <Table
                                    bodyStyle={{ overflow: 'visible' }}
                                    style={{ tableLayout: 'auto'}}
                                    fixedHeader={false}>
                                    <TableBody displayRowCheckbox={false}>
                                        <TableRow
                                            className="headerOrderList"
                                            key="42"
                                            style = {{color: "white"}}
                                        >
                                            <TableRowColumn />
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
                                                Pieces ordered
                                            </TableRowColumn>
                                            <TableRowColumn />
                                        </TableRow>
                                        {
                                            this.props.shoppingCartPizzas.map((pizza2) => (
                                                <PizzaCompOrder pizza={pizza2} />
                                            ))
                                        }

                                    </TableBody>
                                    <TableFooter displayRowCheckbox={false}>
                                        <TableRow>
                                            <TableRowColumn
                                                className="cellFooter">
                                                Total price of your order:
                                                {this.props.orderTotal} lei
                                            </TableRowColumn>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </Paper>

                            <RaisedButton className="sendOrderButton"
                                label="Finalize order"
                                icon={<SendIcon />}
                                labelPosition="after"
                                primary={true}
                                color="#96450f"
                                backgroundColor="#edb138"
                                onClick={this.handleSendOrder}
                            />

                            {this.state.orderForm === true &&
                                <div>
                                    <Stepper
                                        activeStep={this.state.activeStep}
                                        orientation="vertical"
                                    >
                                        {steps.map((label, index) => {
                                            return (
                                                <Step
                                                    className="stepper"
                                                    key={label}
                                                >
                                                    <StepLabel>
                                                        {label}
                                                    </StepLabel>

                                                    <StepContent>
                                                        {this.getOrderFields(index)}
                                                        <RaisedButton
                                                            disabled=
                                                            {this.state.activeStep === 0}
                                                            onClick={this.handleBackStep}
                                                        >
                                                            Back
                                                    </RaisedButton>

                                                        {this.state.activeStep <
                                                            steps.length - 1
                                                            &&
                                                            <RaisedButton
                                                                onClick=
                                                                {this.handleNextStep}
                                                            >
                                                                Next
                                                    </RaisedButton>
                                                        }
                                                    </StepContent>
                                                </Step>
                                            );
                                        })}
                                    </Stepper>
                                    {this.state.activeStep === steps.length &&
                                        <div>
                                            <h3> Your order has been sent </h3>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    )
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state.shoppingCart;
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
)(ShoppingCart);
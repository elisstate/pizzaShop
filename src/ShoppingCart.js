import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GridList, GridTile } from 'material-ui/GridList';
import { FormGroup } from 'react-bootstrap';
import { IconButton, Paper, Chip, Typography, Icon, RaisedButton, TextField }
    from 'material-ui';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    TableFooter,
} from 'material-ui/Table';
import SendIcon from 'material-ui/svg-icons/content/send';
import './css/style.css';
import PizzaCompOrder from './PizzaCompOrder';
import pizzas from './pizzas.json'
import * as pizzaOrderActions from "./actions/pizzaOrderAction.js"
import { Button } from "react-bootstrap";
import { Stepper, Step, StepButton, StepLabel, StepContent }
    from 'material-ui/Stepper';
import * as shoppinCartState from "./lib/shoppingCartStorage.js"


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
            this.props.pizzaOrderActions.calculateTotal(this.props.shoppingCartPizzas);
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


    handleClientDataUpdate(event, index) {
        switch(index) {
            case 0:
                this.setState({
                    clientData: {...this.state.clientData,
                        name: event.target.value}
                });
                break;
            case 1:
                this.setState({
                    clientData: {...this.state.clientData,
                        address: event.target.value}
                });
                break;
            case 2:
                this.setState({
                    clientData: {...this.state.clientData,
                        phoneNumber: event.target.value}
                });
                break;
            case 3:
                if (this.state.currentHour < event.target.value)
                this.setState({
                    clientData: {...this.state.clientData,
                        hourArrival: event.target.value}
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
                        <TextField placeholder="FirstName LastName"
                            name="name" autoFocus
                            className="loginContent"
                            onChange = {(e) => this.handleClientDataUpdate(e, index)}
                            value = {this.state.clientData.name}
                         />
                    </FormGroup>
                );
            case 1:
                return (
                    <FormGroup controlId="address"  >
                        <TextField placeholder="Address of delivery"
                            name="address" autoFocus
                            className="loginContent"
                            onChange = {(e) => this.handleClientDataUpdate(e, index)}
                            value = {this.state.clientData.address}
                        />
                            
                    </FormGroup>
                );
            case 2:
                return (
                    <FormGroup controlId="phoneNumber"  >
                        <TextField placeholder="Phone number"
                            name="phoneNumber" autoFocus
                            className="loginContent"
                            onChange = {(e) => this.handleClientDataUpdate(e, index)}
                            value = {this.state.clientData.phoneNumber}
                        />
                    </FormGroup>
                );
            case 3:
                return (
                    <FormGroup controlId="hour"  >
                        <div> Please note that the fastest hour of delivery is
                            40 minutes from the current time
                        </div>
                        <br />
                        <TextField
                            placeholder="Hour for your delivery"
                            name="hour"
                            autoFocus
                            className="loginContent"
                            type="time"
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ step: 300 }}
                            value = {this.state.clientData.hourArrival }
                            onChange = {(e) => this.handleClientDataUpdate(e, index)}
                        />
                    </FormGroup>
                );
            case 4:
                return (
                    <RaisedButton style={{ marginTop: "250" }} 
                        className="loginContent"
                    >
                        Send Order
                    </RaisedButton>
                );
        }
    }

    render() {
        const steps = getOrderSteps();
        console.log( this.props.shoppingCartPizzas)
        return (

            <div>
                {this.props.shoppingCartPizzas.length === 0 ? (

                    <Paper className="cartNoItems" style={{ width: "400" }} >
                        There are no products <br /> in the shopping cart!
                        </Paper>
                ) : (
                        <div className="pizzaMenu">
                            <h2 className="mainTitle"> Your order </h2>
                            <Paper>
                                <Table bodyStyle={{ overflow: 'visible' }}
                                    style={{ tableLayout: 'auto' }}
                                    fixedHeader={false}>
                                    <TableBody displayRowCheckbox={false}>
                                        <TableRow className="headerOrderList"
                                            key="42">
                                            <TableRowColumn />
                                            <TableRowColumn className="cellTable" >
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
                                            <TableRowColumn/>
                                        </TableRow>
                                        {
                                           this.props.shoppingCartPizzas.map((pizza2) => (
                                                <PizzaCompOrder pizza={pizza2} />
                                            ))
                                        }

                                    </TableBody>
                                    <TableFooter displayRowCheckbox={false}>
                                        <TableRow>
                                            <TableRowColumn className="cellFooter"> 
                                                Total price of your order: 
                                                {this.props.orderTotal} lei
                                            </TableRowColumn>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </Paper>

                            <RaisedButton className="sendOrder"
                                label="Finalize order"
                                icon={<SendIcon />}
                                labelPosition="after"
                                primary={true}
                                labelColor="#96450f"
                                backgroundColor="#edb138"
                                onClick={this.handleSendOrder}
                            />

                            {this.state.orderForm == true &&
                                <div>
                                    <Stepper activeStep={this.state.activeStep}
                                        orientation="vertical">
                                        {steps.map((label, index) => {
                                            return (
                                                <Step key={label}>
                                                    <StepLabel> {label} </StepLabel>

                                                    <StepContent>
                                                        {this.getOrderFields(index)}
                                                        <RaisedButton
                                                        disabled={this.state.activeStep === 0}
                                                        onClick={this.handleBackStep}
                                                        >
                                                            Back
                                                        </RaisedButton>
                                                        <RaisedButton onClick={this.handleNextStep}
                                                            
                                                        >
                                                            {this.state.activeStep === steps.length - 1 
                                                                ? "Send Order" :
                                                                "Next"}
                                                        </RaisedButton>
                                                    </StepContent>
                                                </Step>
                                            );
                                        })}
                                    </Stepper>
                                    { this.state.activeStep === steps.length && 
                                        <div>
                                            <h3> Your order has been sent </h3>
                                            <RaisedButton onClick={this.handleReset}>
                                                Reset
                                            </RaisedButton>

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
        pizzaOrderActions: bindActionCreators(pizzaOrderActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)  (ShoppingCart);
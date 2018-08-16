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

import Comp1 from "./Comp1.js"
import Comp2 from "./Comp2.js"

class PizzaMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabValue: "0",
            newPizza: {
                name: "",
                price: "",
                toppings: [],
                bases: [],
            },
            orders: []
        };

        this.tabChange = this.tabChange.bind(this);
        this.handleAddBase = this.handleAddBase.bind(this);
        this.handleRemoveBase = this.handleRemoveBase.bind(this);
        this.handleAddTopping = this.handleAddTopping.bind(this);
        this.handleRemoveTopping = this.handleRemoveTopping.bind(this);
        this.handleAddNewName = this.handleAddNewName.bind(this);
        this.handleAddNewPrice = this.handleAddNewPrice.bind(this);
        this.addNewPizza = this.addNewPizza.bind(this);
        this.getOrders = this.getOrders.bind(this);
    }

    tabChange(event, val) {
        this.setState({
            tabValue: val
        });
        if (val === "2")
            this.getOrders()
        if (val === "1" && loginState.getUsername() != "admin")
            this.getOrders()
    }

    handleAddBase(base) {
        let newBases = this.state.newPizza.bases;
        newBases.push(base);

        this.setState({
            newPizza: { ...this.state.newPizza, bases: newBases }
        });
    }

    handleRemoveBase(base, index) {
        let newBases = this.state.newPizza.bases;
        newBases.splice(index, 1)

        this.setState({
            newPizza: { ...this.state.newPizza, bases: newBases }
        }
        );
    }

    handleAddTopping(top) {
        let newTop = this.state.newPizza.toppings;
        newTop.push(top);

        this.setState({
            newPizza: { ...this.state.newPizza, toppings: newTop }
        });
    }

    handleRemoveTopping(top, index) {
        let newTop = this.state.newPizza.toppings;
        newTop.splice(index, 1)

        this.setState({
            newPizza: { ...this.state.newPizza, toppings: newTop }
        });
    }

    handleAddNewName(event) {
        this.setState({
            newPizza: { ...this.state.newPizza, name: event.target.value }
        });
    }

    handleAddNewPrice(event) {
        this.setState({
            newPizza: { ...this.state.newPizza, price: event.target.value }
        });
    }

    addNewPizza() {
        this.props.adminActions.addNewPizza(this.state.newPizza);

        let cleanPizza = {
            name: "",
            price: "",
            bases: [],
            toppings: []
        }

        this.setState({
            ...this.state, newPizza: cleanPizza
        });
    }

    getOrders() {
        if (loginState.getUsername() === "admin")
            axios.get('http://localhost:4000//orders/sendOrders')
                .then(response => {
                    this.setState({
                        orders: response.data
                    })
                })
        else {
            axios.post('http://localhost:4000//orders/setUser', loginState.getUsername())
                .then(
                axios.get('http://localhost:4000//orders/sendClientOrders')
                    .then(response => {
                        this.setState({
                            orders: response.data
                        })
                    })
                )
        }
    }


    getTabs() {

        if (loginState.getUsername() === "admin")
            return (
                <Tabs value={this.state.tabValue} >
                    <Tab style={{ backgroundColor: "#edb138" }}
                        onClick={(event) => this.tabChange(event, "0")}
                        label="Current Pizza Menu" value="0"
                    />
                    <Tab style={{ backgroundColor: "#edb138" }}
                        onClick={(event) => this.tabChange(event, "1")}
                        label="Add New Pizza" value="1"
                    />

                    <Tab style={{ backgroundColor: "#edb138" }}
                        onClick={(event) => this.tabChange(event, "2")}
                        label="Orders" value="2"
                    />
                </Tabs>

            )
        else
            return (
                <Tabs value={this.state.tabValue} >
                    <Tab style={{ backgroundColor: "#edb138" }}
                        onClick={(event) => this.tabChange(event, "0")}
                        label="Pizza Menu" value="0"
                    />
                    <Tab style={{ backgroundColor: "#edb138" }}
                        onClick={(event) => this.tabChange(event, "1")}
                        label="Your orders" value="1"
                    />
                </Tabs>

            )
    }

    getDataOrder() {

        axios.get('http://localhost:4000//orders/sendClientOrders')
            .then(response => {
                this.setState({
                    orders: response.data
                })
            })
    }


    getClientOrders() {
        return (
            <OrdersAdmin
                orders={this.state.orders}
            />
        )

    }

    render() {

        let pizzas = pizzasData.pizzas;
        for (let i = 0; i < pizzasData.length; i++) {
            pizzas.count = 0;
        }

        return (
            <div>

                {/*<Comp1 />
                <Comp2 />*/}

                {
                    loginState.getLoginStatus() === true &&
                    this.getTabs()
                }

                {
                    loginState.getLoginStatus() === true &&
                    loginState.getUsername() !== "admin" &&
                    <h4 style={{ textAlign: "right" }}>
                        You are logged in as <br />
                        {loginState.getUsername()}
                    </h4>
                }
                {
                    this.state.tabValue === "0" &&
                    <div>
                        <div className="mainTitle"> Elis's Pizza Menu </div>
                        <GridList className="pizzaMenu"
                            cols={1}
                            cellHeight={400}
                            style={{ width: "851px" }}>

                            {loginState.getUsername() === "admin" ? (
                                pizzas.map((pizza2) => (
                                    <PizzaCompAdmin key={pizza2.id}
                                        pizza={pizza2}
                                    />
                                ))
                            ) :
                                (
                                    pizzas.map((pizza2) => (
                                        <PizzaComp key={pizza2.id}
                                            pizza={pizza2}
                                        />
                                    ))
                                )
                            }
                        </GridList>
                    </div>
                }

                {
                    this.state.tabValue === "1" && (
                        loginState.getUsername() === "admin" ? (
                            <div style={{ margin: "auto" }}>

                                <div className="mainTitle"
                                    style={{ textAlign: "center" }}>
                                    Please complete the form below <br />
                                    to add a new delicious pizza to our menu </div>

                                <FormGroup className="addPizza">
                                    <ControlLabel> Pizza Name: </ControlLabel>
                                    <br />
                                    <TextField
                                        inputStyle={{ textAlign: 'center' }}
                                        name="pizzaName" autoFocus type="textarea"
                                        value={this.state.newPizza.name}
                                        onChange={this.handleAddNewName}
                                        className="addPizzaInput"
                                    />
                                </FormGroup>

                                <FormGroup className="addPizza">
                                    <ControlLabel> Price: </ControlLabel>
                                    <br />
                                    <TextField
                                        inputStyle={{ textAlign: 'center' }}
                                        name="pizzaPrice" autoFocus
                                        type="textarea"
                                        value={this.state.newPizza.price}
                                        onChange={this.handleAddNewPrice}
                                        className="addPizzaInput"
                                    />
                                </FormGroup>

                                <FormGroup className="addPizza">
                                    <ControlLabel > Bases: </ControlLabel>
                                    <br />
                                    <ChipInput
                                        className="addPizzaInput"
                                        value={this.state.newPizza.bases}
                                        onRequestAdd={(base) => this.handleAddBase(base)}
                                        onRequestDelete={
                                            (base, index) => this.handleRemoveBase(base, index)}
                                    />
                                </FormGroup>

                                <FormGroup className="addPizza">
                                    <ControlLabel > Toppings: </ControlLabel>
                                    <br />
                                    <ChipInput
                                        className="addPizzaInput"
                                        value={this.state.newPizza.toppings}
                                        onRequestAdd={(topping) => this.handleAddTopping(topping)}
                                        onRequestDelete={
                                            (topping, index) => this.handleRemoveTopping(topping, index)}
                                    />
                                </FormGroup>

                                <RaisedButton
                                    style={{ marginTop: "250" }}
                                    className="loginContent"
                                    onClick={this.addNewPizza}
                                >
                                    Add new pizza to menu
                        </RaisedButton>
                            </div>
                        ) : (
                                this.getClientOrders()
                            )
                    )
                }

                {
                    this.state.tabValue === "2" &&
                    <OrdersAdmin
                        orders={this.state.orders}
                    />
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        orders: state.adminReducer.orders
    };
}

function mapDispatchToProps(dispatch) {
    return {
        adminActions: bindActionCreators(adminActions, dispatch)
    };
}


// function mapStateToProps(state) {
//     return {
//         val1: state.testReducer.val1,
//         val2: state.testReducer.val2,
//         orders: state.adminReducer.orders
//     };
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         testActions: bindActionCreators(testActions, dispatch),
//         adminActions: bindActionCreators(adminActions, dispatch)
//     };
// }


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PizzaMenu);
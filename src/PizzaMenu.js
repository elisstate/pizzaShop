import React from 'react';
import { GridList } from 'material-ui/GridList';
import { IconButton, RaisedButton, TextField } from 'material-ui';
import Subheader from 'material-ui/Subheader';
import './css/style.css';
import PizzaComp from './PizzaComp';
import PizzaCompAdmin from './PizzaCompAdmin';
import pizzasData from './pizzas.json'
import { Tabs, Tab } from 'material-ui/Tabs'
import { MuiThemeProvider } from 'material-ui/styles/'
import { FormGroup, FormControl, ControlLabel, Label } from "react-bootstrap";
import ChipInput  from 'material-ui-chip-input'
import * as loginState from "./lib/loginState.js"
import axios from 'axios';


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
            }
        };


        this.tabChange = this.tabChange.bind(this);
        this.handleAddBase = this.handleAddBase.bind(this);
        this.handleRemoveBase = this.handleRemoveBase.bind(this);
        this.handleAddTopping = this.handleAddTopping.bind(this);
        this.handleRemoveTopping = this.handleRemoveTopping.bind(this);
        this.handleAddNewName = this.handleAddNewName.bind(this);
        this.handleAddNewPrice = this.handleAddNewPrice.bind(this);
        this.addNewPizza = this.addNewPizza.bind(this);
    }

    tabChange(event, val) {
        this.setState({
            tabValue: val
        });
    }

    handleAddBase(base) {
        let newBases = this.state.newPizza.bases;
        newBases.push(base);

        this.setState({
            newPizza: {...this.state.newPizza, bases: newBases}
        });
    }

    handleRemoveBase(base, index) {
        let newBases = this.state.newPizza.bases;
        newBases.splice(index, 1)

        this.setState({
             newPizza: {...this.state.newPizza, bases: newBases}
            }
        );
    }

    handleAddTopping(top) {
        let newTop = this.state.newPizza.toppings;
        newTop.push(top);

        this.setState({
             newPizza: {...this.state.newPizza, toppings: newTop}
        });
    }

    handleRemoveTopping(top, index) {
        let newTop = this.state.newPizza.toppings;
        newTop.splice(index, 1)

        this.setState({
             newPizza: {...this.state.newPizza, toppings: newTop}
        });
    }

    handleAddNewName(event) {
        this.setState({
            newPizza: {...this.state.newPizza, name: event.target.value}
        });
    }

    handleAddNewPrice(event) {
        this.setState({
           newPizza: {...this.state.newPizza, price: event.target.value}
        });
    }

    addNewPizza() {
        axios.post(`http://localhost:4000/menuModify/newPizza`,
            this.state.newPizza);

        let cleanPizza ={
            name: "",
            price: "",
            bases: [],
            toppings: []
        }

        this.setState({
            ...this.state, newPizza: cleanPizza
        });
    }

    render() {
        let pizzas = pizzasData.pizzas;

        for (let i = 0; i < pizzasData.length; i++) {
            pizzas.count = 0;
        }

        return (
            <div>
                {
                    loginState.getLoginStatus() === true &&
                    loginState.getUsername() === "admin" &&
                    <Tabs value={this.state.tabValue} >
                        <Tab style={{ backgroundColor: "#edb138" }}
                            onClick={(event) => this.tabChange(event, "0")}
                            label="Current Pizza Menu" value="0"
                        />
                        <Tab style={{ backgroundColor: "#edb138" }}
                            onClick={(event) => this.tabChange(event, "1")}
                            label="Add New Pizza" value="1"
                        />
                    </Tabs>
                }

                {
                    this.state.tabValue === "0" &&
                    <div>
                        <div className="mainTitle"> Elis's Pizza Menu </div>
                        <GridList className="pizzaMenu"
                        cols={1}
                        cellHeight={400}
                        style={{ width: "851" }}>
                            
                            {loginState.getUsername() == "admin" ? (
                                pizzas.map((pizza2) => (
                                    <PizzaCompAdmin key={pizza2.id} pizza={pizza2}
                                     />
                                ))
                            ) :
                            (
                                pizzas.map((pizza2) => (
                                    <PizzaComp key={pizza2.id} pizza={pizza2}
                                     />
                                ))
                            )
                            }
                        </GridList>
                    </div>
                }

                {
                    this.state.tabValue === "1" &&
                    <div style={{ margin: "auto" }}>

                        <div className="mainTitle"
                            style={{ textAlign: "center" }}>
                            Please complete the form below <br />
                            to add a new delicious pizza to our menu </div>

                        <FormGroup className="addPizza">
                            <ControlLabel> Pizza Name: </ControlLabel>
                            <br />
                            <TextField inputStyle={{ textAlign: 'center' }}
                                name="pizzaName" autoFocus type="textarea"
                                value={this.state.newPizza.name}
                                onChange={this.handleAddNewName} />
                        </FormGroup>

                        <FormGroup className="addPizza">
                            <ControlLabel> Price: </ControlLabel>
                            <br />
                            <TextField inputStyle={{ textAlign: 'center' }}
                                name="pizzaPrice" autoFocus
                                type="textarea"
                                value={this.state.newPizza.price}
                                onChange={this.handleAddNewPrice} />
                        </FormGroup>

                        <FormGroup className="addPizza">
                            <ControlLabel > Bases: </ControlLabel>
                            <br />
                            <ChipInput value={this.state.newPizza.bases} 
                            onRequestAdd={(base) => this.handleAddBase(base)}
                            onRequestDelete={
                            (base, index) => this.handleRemoveBase(base, index)}
                            />
                        </FormGroup>

                        <FormGroup className="addPizza">
                            <ControlLabel > Toppings: </ControlLabel>
                            <br />
                            <ChipInput value={this.state.newPizza.toppings}
                            onRequestAdd={(topping) => this.handleAddTopping(topping)}
                            onRequestDelete={
                            (topping, index) => this.handleRemoveTopping(topping, index)}
                            />
                        </FormGroup>

                        <RaisedButton 
                            style={{ marginTop: "250" }}
                            className="loginContent"
                            onClick={this.addNewPizza}>
                            Add new pizza to menu
                        </RaisedButton>
                    </div>
                }
            </div>
        );
    }
}

export default PizzaMenu;
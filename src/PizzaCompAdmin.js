import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { GridList, GridTile } from 'material-ui/GridList';
import { IconButton, Paper, Chip, Dialog, DialogTitle, RaisedButton, TextField } from 'material-ui';
import { FormGroup, FormControl, ControlLabel, Label } from "react-bootstrap";
import AddIcon from 'material-ui/svg-icons/content/add-circle';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import EditIcon from 'material-ui/svg-icons/image/edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import SaveIcon from 'material-ui/svg-icons/action/check-circle';
import ChipInput from 'material-ui-chip-input'
import './css/style.css';
import * as loginState from "./lib/loginState.js"
import * as pizzaCompActions from "./actions/pizzaCompActions.js"
import axios from 'axios';

class PizzaComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            modalText: "Please login to add products to your cart",
            modalTitle: "Login",
            newBases: [...this.props.pizza.base],
            newToppings: [...this.props.pizza.toppings],
            newName: this.props.pizza.name,
            newPrice: this.props.pizza.price,
            editMode: false
        }
        this.handleAddToCart = this.handleAddToCart.bind(this)
        this.selectBase = this.selectBase.bind(this)
        this.modalOnClose = this.modalOnClose.bind(this)
        this.setEditMode = this.setEditMode.bind(this)
        this.sendChanges = this.sendChanges.bind(this)
        this.sendDeleteId = this.sendDeleteId.bind(this)
    }

    handleAddToCart() {
        if (loginState.getLoginStatus() === false) {
            this.setState({
                modalShow: true,
                modalText: "Please login to add products to your cart",
                modalTitle: "Login"
            })
        } else {
            if (this.props.currentBase.baseSelected == false ||
                this.props.pizza.id !== this.props.currentBase.id) {
                this.setState({
                    modalShow: true,
                    modalText: "Please " + loginState.getUsername() +
                    ", select a base for your pizza!",
                    modalTitle: "Base Selection"
                });
            } else {
                this.props.pizzaCompActions.addToCart(this.props.pizza, this.props.currentBase);
            }
        }

    }

    selectBase(event, id) {
        this.props.pizzaCompActions.selectBase(event.target.innerText, id);
        var list = document.getElementsByClassName("base")
        for (var item of list) {
            item.style.backgroundColor = '#e0e0e0'
        }
        event.currentTarget.style.backgroundColor = '#ad9482'
    }

    setEditMode() {

    this.setState({
        editMode: !this.state.editMode
    });
        
    }

    sendChanges(event) {

        let toSend = {
            name: this.state.newName,
            price: this.state.newPrice,
            bases: this.state.newBases.map(a => a.name),
            toppings: this.state.newToppings,
            id: this.props.pizza.id
        }

        axios.post(`http://localhost:4000/menuModify/pizza`, toSend);

        this.setState({
            modalText: "Your changes have been saved!",
            modalTitle: "Confirmation",
            editMode: false,
            modalShow: false
        })
    }

    sendDeleteId() {
        axios.post(`http://localhost:4000/menuModify/removePizza`, this.props.pizza.id);
        this.setState({
            editMode: false,
            modalShow: false
        })
    }

    initialValues() {
        this.setState({
            newBases: this.props.pizza.base,
            newToppings: this.props.pizza.toppings,
            newName: this.props.pizza.name,
            newPrice: this.props.pizza.price,
            editMode: false,
            modalShow: false
        })
    }

    handleAddBase(base) {
        let newBases = this.state.newBases;
        let newElem = { name: base, id: this.state.newBases.length + 1 };
        newBases.push(newElem);
        this.setState({
            newBases: newBases
        });
    }

    handleRemoveBase(base, index) {
        let newBases = this.state.newBases;
        newBases.splice(index, 1)

        this.setState({
            newBases: newBases
        });
    }

    handleAddTop(top) {
        let newTop = this.state.newToppings;
        newTop.push(top);
        this.setState({
            newToppings: newTop
        });
    }

    handleRemoveTop(base, index) {
        let newTop = this.state.newToppings;
        newTop.splice(index, 1)

        this.setState({
            newToppings: newTop
        });
    }

    handleRename(event) {
        this.setState({
            newName: event.target.value
        })
    }

    handleModifyPrice(event) {
        this.setState({
            newPrice: event.target.value
        })
    }

    modalForDelete() {
        this.setState({
            modalShow: true,
            modalText: "Do you want to remove Pizza "
            + this.props.pizza.name + " from our menu?",
            modalTitle: "Delete pizza"
        })
    }

    modalForSave() {
         if (this.state.editMode === true) {
            this.setState({
                modalShow: true,
                modalText: "Do you want to save the changes for Pizza "
                + this.props.pizza.name + "?",
                modalTitle: "Save Changes"
            })
        }
    }

    modalOnClose() {
        this.setState({
            modalShow: false
        });
    }

    render() {
        let id = this.props.pizza.id;
        let newBasesNames = this.state.newBases.map(base => base.name);
        return (

            <GridTile style={{ backgroundColor: "#f2d2ba" }}
                key={this.props.pizza.id}
                title={
                    this.state.editMode === false ? (
                        this.props.pizza.name
                    ) :
                        (<input value={this.state.newName}
                            style={{
                                backgroundColor: "rgba(0,0,0,.3)",
                                borderWidth: "0.1",
                                color: "white",
                            }}
                            onChange={this.handleRename.bind(this)} />
                        )}
                subtitle={
                    this.state.editMode === false ? (
                        this.props.pizza.price
                    ) :
                        (<input value={this.state.newPrice}
                            style={{
                                backgroundColor: "rgba(0,0,0,.3)",
                                borderWidth: "0.1",
                                color: "white",
                            }}
                            onChange={this.handleModifyPrice.bind(this)} />
                        )}
                actionIcon={
                    <div style={{ display: "flex" }}>
                        {loginState.getUsername() === "admin" &&
                            <div>
                                {this.state.editMode === false ? (
                                    <div>
                                        <IconButton tooltip="Add to shopping cart"
                                            tooltipPosition="top-left"
                                            onClick={this.handleAddToCart} >
                                            <AddIcon color="#edb138" />
                                        </IconButton>

                                        <IconButton tooltip="Edit"
                                            tooltipPosition="top-left"
                                            onClick={this.setEditMode} >
                                            <EditIcon color="#edb138" />
                                        </IconButton>
                                    </div>
                                ) : (
                                        <div>
                                            <IconButton tooltip="Save changes"
                                                className="Save changes"
                                                tooltipPosition="top-left"
                                                onClick={this.modalForSave.bind(this)}>
                                                <SaveIcon color="#edb138" />
                                            </IconButton>

                                            <IconButton tooltip="Delete from menu"
                                                className="Delete"
                                                tooltipPosition="top-left"
                                                onClick={this.modalForDelete.bind(this)}>
                                                <DeleteIcon color="#edb138" />
                                            </IconButton>
                                        </div>
                                    )
                                }
                            </div>
                        }
                    </div>
                } >

                {
                    <Dialog title={
                    <div className="modalTitle"
                        style={{ border: 0, backgroundColor: "#edb138" }}>
                        <h5 style={{ margin: 10, padding: 0 }}>
                            {this.state.modalTitle}
                        </h5>
                        <IconButton onClick={this.modalOnClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                }
                    aria-labelledby="simple-dialog-title"
                    open={this.state.modalShow}
                    style={{textAlign:"center"}}>
                    <h2>
                        {this.state.modalText}
                    </h2>
                    {this.state.editMode === true &&
                        <div>
                            { this.state.modalTitle === "Save Changes" ? (
                            <RaisedButton
                                onClick={this.sendChanges}
                                style={{marginRight:"20"}}>
                                Yes
                            </RaisedButton>
                            ) : (
                                 <RaisedButton
                                onClick={this.sendDeleteId}
                                style={{marginRight:"20"}}>
                                Yes
                            </RaisedButton>
                            )
                            }
                            <RaisedButton
                                onClick={this.initialValues.bind(this)}>
                                No
                            </RaisedButton>
                        </div>
                    }
                </Dialog>
                }

                <Paper zDepth={1}>
                    {
                        this.state.editMode === false ? (
                            <div>
                                <div className="Toppings">  Bases:
                         {this.props.pizza.base.map((base) =>
                                        <Chip style={{margin:5}}
                                            onClick={(evt) =>
                                                this.selectBase(evt, this.props.pizza.id)}
                                            key={base.id}
                                            className="base" selected={false}>
                                            {base.name}
                                        </Chip>
                                    )}
                                </div>

                                <div className="Toppings">  Toppings:
                            {this.props.pizza.toppings.map((topping, index) =>
                                        <Chip style={{ margin: 5 }}
                                            key={index}
                                        >
                                            {topping}
                                        </Chip>
                                    )}
                                </div>
                            </div>
                        ) : (
                                <div>
                                    <FormGroup className="Toppings">
                                        <ControlLabel > Bases: </ControlLabel>

                                        <ChipInput value={newBasesNames}
                                            onRequestAdd={
                                                (base) => this.handleAddBase(base)}
                                            onRequestDelete={
                                                (base, index) => this.handleRemoveBase(base, index)}
                                            style={{ minWidth: "750" }}
                                        />
                                    </FormGroup>

                                    <FormGroup className="Toppings">
                                        <ControlLabel > Toppings: </ControlLabel>
                                        <ChipInput value={this.state.newToppings}
                                            onRequestAdd={
                                                (base) => this.handleAddTop(base)}
                                            onRequestDelete={
                                                (base, index) => this.handleRemoveTop(base, index)}
                                            style={{ minWidth: "750" }}
                                        />
                                    </FormGroup>

                                </div>
                            )
                    }
                </Paper>
                {id <= 3 ? (
                    <img src={require('./css/pizzaPics/' + id + '.jpg')} />
                ) : (
                    <img src={require('./css/pizzaPics/general.png')} />
                    )
                }
            </GridTile>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentBase: state.pizzaComp,
        shoppingCart: state.shoppingCart
    };
}

function mapDispatchToProps(dispatch) {
    return {
        pizzaCompActions: bindActionCreators(pizzaCompActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PizzaComp);
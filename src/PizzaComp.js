import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { GridTile } from 'material-ui/GridList';
import { IconButton, Paper, Chip, Dialog } from 'material-ui';
import { ControlLabel } from "react-bootstrap";
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import './css/style.css';
import * as loginState from "./lib/loginState.js"
import * as pizzaCompActions from "./actions/pizzaCompActions.js"

class PizzaComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            modalText: "Please login to add products to your cart",
            modalTitle: "Login"
        }
        this.handleAddToCart = this.handleAddToCart.bind(this)
        this.selectBase = this.selectBase.bind(this)
        this.modalOnClose = this.modalOnClose.bind(this)
    }

    handleAddToCart() {
        if (loginState.getLoginStatus() === false) {
            this.setState({
                modalShow: true,
                modalText: "Please login to add products to your cart",
                modalTitle: "Login"
            })
        } else {
            if (this.props.currentBase.baseSelected === false ||
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


    modalOnClose() {
        this.setState({
            modalShow: false
        });
    }

    render() {
        let id = this.props.pizza.id;

        return (

            <GridTile
                key={this.props.pizza.id} title={this.props.pizza.name}
                subtitle={<div>{this.props.pizza.price} + "lei" </div>}
                actionIcon={
                    <div style={{ display: "flex" }}>
                        <IconButton tooltip="Add to shopping cart"
                            tooltipPosition="top-left"
                            onClick={this.handleAddToCart} >
                            <AddIcon color="#f2d2bb"/>
                        </IconButton>
                    </div>

                } >

                <Dialog
                    title={
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
                    style={{ textAlign: "center" }}
                >
                    <h2>
                        {this.state.modalText}
                    </h2>
                </Dialog>

                <Paper zDepth={1}>

                    <div className="Toppings">  Bases:
                         {this.props.pizza.base.map((base) =>
                            <Chip
                                style={{ margin: 5 }}
                                onClick={(evt) =>
                                    this.selectBase(evt, this.props.pizza.id)}
                                key={base.id}
                                className="base" selected={false}
                            >
                                {base.name}
                            </Chip>
                        )}
                    </div>

                    <div className="Toppings">  Toppings:
                         {this.props.pizza.toppings.map((topping, index) =>
                            <Chip
                                style={{ margin: 5 }}
                                key={index}
                            >
                                {topping}
                            </Chip>
                        )}
                    </div>

                </Paper>
                {id <= 3 ? (
                    <img src={'/pizzaPics/' + id + '.jpg'}/>
                ) : (
                        <img src={'/pizzaPics/general.png'}/>
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
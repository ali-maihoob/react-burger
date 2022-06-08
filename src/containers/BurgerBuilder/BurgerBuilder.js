import React, {Component} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const PRICES = {
    salad: 0.8,
    bacon: 1.1,
    cheese: 1.8,
    meat: 2.2
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchasable = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)
        this.setState({
            purchasable: sum > 0
        })
    }

    addIngredient = (type) => {
        const newCount = this.state.ingredients[type] + 1
        const price = this.state.totalPrice + PRICES[type]
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newCount
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: price
        })
        this.updatePurchasable(updatedIngredients);
    }

    removeIngredient = (type) => {
        const oldCount = this.state.ingredients[type]
        if (oldCount <= 0) {
            return;
        }
        const newCount = oldCount - 1
        const price = this.state.totalPrice - PRICES[type]
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newCount
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: price
        })
        this.updatePurchasable(updatedIngredients);
    }

    purchasingHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchasingCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchasingContinueHandler = () => {
        alert('continue');
    }

    render() {
        const disabledInfo = {...this.state.ingredients}
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <div>
                <Modal show={this.state.purchasing} modalClosed={this.purchasingCancelHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        purchasingCancelHandler = {this.purchasingCancelHandler}
                        purchasingContinueHandler = {this.purchasingContinueHandler}
                        price={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    addIngredient={this.addIngredient}
                    removeIngredient={this.removeIngredient}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchasingHandler}
                />
            </div>
        );
    }
}

export default BurgerBuilder;
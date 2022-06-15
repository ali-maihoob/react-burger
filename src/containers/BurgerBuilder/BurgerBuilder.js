import React, {Component} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler";

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
        purchasing: false,
        loading: false
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
        this.setState({
            loading: true
        })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Ali Maihoob',
                address: {
                    street: 'Al-Wahda',
                    country: 'UAE'
                },
                email: 'ali@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order).then(response => {
            this.setState({
                loading: false,
                purchasing: false
            })
        }).catch(error => {
            this.setState({
                loading: false,
                purchasing: false
            })
        })
    }

    render() {
        const disabledInfo = {...this.state.ingredients}
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = (
            <OrderSummary
                ingredients={this.state.ingredients}
                purchasingCancelHandler = {this.purchasingCancelHandler}
                purchasingContinueHandler = {this.purchasingContinueHandler}
                price={this.state.totalPrice}
            />
        );
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <div>
                <Modal show={this.state.purchasing} modalClosed={this.purchasingCancelHandler}>
                    { orderSummary }
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

export default WithErrorHandler(BurgerBuilder, axios);
import React, {Component} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

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
        totalPrice: 4
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
    }

    render() {
        const disabledInfo = {...this.state.ingredients}
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <div>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredient={ this.addIngredient }
                    removeIngredient={ this.removeIngredient }
                    disabledInfo={disabledInfo}
                />
            </div>
        );
    }
}

export default BurgerBuilder;
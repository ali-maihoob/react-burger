import React, { Component } from 'react';
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('[orderSummary] will update')
    }

    render () {
        const ingredientsSummary = Object.keys(this.props.ingredients)
            .map(itemKey => {
                return (
                    <li key={itemKey}>
                        <span style={{textTransform: 'capitalize'}}>{itemKey}</span>: {this.props.ingredients[itemKey]}
                    </li>
                )
            })
        return (
            <>
                <h3>Your Order</h3>
                <p>You have ordered this ingredients:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Your price is: {this.props.price.toFixed(2)}</strong></p>
                <p>Do you want continue to checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchasingCancelHandler}>Cancel</Button>
                <Button btnType='Success' clicked={this.props.purchasingContinueHandler}>Continue</Button>
            </>
        );
    }
}

export default OrderSummary;
import React from 'react';
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(itemKey => {
            return (
                <li key={itemKey}>
                    <span style={{textTransform: 'capitalize'}}>{itemKey}</span>: {props.ingredients[itemKey]}
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
            <p><strong>Your price is: {props.price.toFixed(2)}</strong></p>
            <p>Do you want continue to checkout?</p>
            <Button btnType='Danger' clicked={props.purchasingCancelHandler}>Cancel</Button>
            <Button btnType='Success' clicked={props.purchasingContinueHandler}>Continue</Button>
        </>
    );
};

export default OrderSummary;
import React from 'react';
import BuildControl from "./BuildControl/BuildControl";
import classes from './BuildControls.css'
const controls = [
    {
        type: 'salad', label: 'Salad'
    },
    {
        type: 'bacon', label: 'Bacon'
    },
    {
        type: 'cheese', label: 'Cheese'
    },
    {
        type: 'meat', label: 'Meat'
    },
]
const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Total Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(control => {
                return <BuildControl
                    label={control.label}
                    key={control.label}
                    addIngredient = {() => props.addIngredient(control.type)}
                    removeIngredient = {() => props.removeIngredient(control.type)}
                    disabled = {props.disabledInfo[control.type]}
                />
            })}
            <button
                disabled={!props.purchasable}
                className={classes.OrderButton}
                onClick={props.ordered}
            >
                ORDER NOW
            </button>
        </div>
    );
};

export default BuildControls;
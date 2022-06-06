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
const BuildControls = () => {
    return (
        <div className={classes.BuildControls}>
            {controls.map(control => {
                return <BuildControl label={control.label} key={control.label} />
            })}
        </div>
    );
};

export default BuildControls;
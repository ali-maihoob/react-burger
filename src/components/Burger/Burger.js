import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
        </div>
    );
};

export default Burger;
import React from 'react';
import classes from './customButtin.module.css'

const CustomButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.customRedBtn}>
            {children}
        </button>
    );
};

export default CustomButton;
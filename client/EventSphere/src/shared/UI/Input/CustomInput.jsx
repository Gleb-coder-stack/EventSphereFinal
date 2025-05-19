import React from 'react';
import classes from './cutomInput.module.css'

const CustomInput = React.forwardRef((props, ref) => {
    return (
        <div>
            <input ref={ref} style={props.style} className={classes.myInput} {...props}/>
        </div>
    );
});

export default CustomInput;
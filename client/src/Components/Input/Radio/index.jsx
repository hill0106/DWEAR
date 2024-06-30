import React from 'react';
import styles from './styles.module.scss';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

const RadioInput = ({
    name,
    handleInputState,
    label,
    options,
    required,
    ...rest
}) => {
    const handleChange = ({ currentTarget: input }) => {
        handleInputState(input.name, input.value);
    };

    return (
        <div className={styles.container}>
            <p className={styles.label}>
                {label}
            </p>
            <RadioGroup {...rest} row name={name} onChange={handleChange}>
                {options.map((opt, idx) => (
                    <FormControlLabel
                        key={idx}
                        value={opt}
                        control={<Radio disableRipple required={required} style={{ color: "#15883e", transform: "scale(1.2)" }} />}
                        label={opt}
                        className={styles.radio_input}
                    />
                ))}
            </RadioGroup>
        </div>
    );
};

export default RadioInput;

import styles from "./styles.module.scss";
import { FormControlLabel, Checkbox } from "@mui/material";

const CheckBoxInput = ({
    label,
    ...rest
}) => {
    return (
        <FormControlLabel 
            className={styles.checkbox_container}
            control={<Checkbox {...rest} style={{color: "#9A77CF"}} className={styles.checkbox}/>}
            label={label}
        />
    );
};

export default CheckBoxInput;
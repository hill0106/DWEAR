import styles from "./styles.module.scss";

const Select = ({
    label,
    options,
    handleInputState,
    placeholder,
    ...rest
}) => {
    const handleChange = ({currentTarget: input}) => {
        handleInputState(input.name, input.value);
    }

    return (
        <div className={styles.container}>
            <p className={styles.label}>
                {label}
            </p>
            <select {...rest} onChange={handleChange} className={styles.select}>
                <option style={{display: "none"}} value="">{placeholder}</option>
                {options.map((opt, idx) => (
                    <option key={idx} value={opt.value}>{opt.name}</option>
                ))}
            </select>
        </div>
    )
};

export default Select;
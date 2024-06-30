import styles from "./styles.module.scss";
import {useRef} from "react";
import Button from "../../Button";


const FileInput = ({
    name,
    label,
    value,
    icon,
    type,
    handleInputState,
    ...rest
}) => {
    const inputRef = useRef();
    const handleChange = (e) => {
        handleInputState(name, e.currentTarget.files[0])
    };
    return (
        <div className={styles.container}>
            <input type="file" ref={inputRef} onChange={handleChange} value={value} {...rest}/>
            <Button style={{width: "15rem"}} onClick={() => inputRef.current.click()} label={label}/>
            {type === "image" && value && (
                <img src={typeof value === "string" ? value : URL.createObjectURL(value)} alt="file" />
            )}
            <Button label="Upload" style={{width: "10rem"}}/>
        </div>
    );
};

export default FileInput;
import { useState, useEffect } from "react";
import TextField from "../Input/TextField";
import FileInput from "../Input/FileInput";
import Button from "../Button";
import styles from "./styles.module.scss";
import defaultImage from "../../images/defaultCloset.png";

const ClosetsModel = ({closeModel, closet}) => {
    const [data, setData] = useState({
        desc: "",
        img: "",
    });



    useEffect(() => {
        if (closet) {
            setData(prev => ({
                ...prev,
                desc: closet?.desc || "",
                img: closet?.img || defaultImage,
            }));
        }
    }, [closet]);

    const handleInputState = (name, value) => {
        setData((prev) => ({ ...prev, [name]: value }));

        if (name === "img") {
            const file = value;
            const reader = new FileReader();


            if (file) {
                reader.readAsDataURL(file);
            }
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("desc", data.desc);
        formData.append("img", data.img);
        alert("Description: " + data.desc + ", Image: " + (data.img ? data.img.name : "No file selected"));
        console.log(JSON.stringify(data));
    };

    return(
        
        <div className={styles.model_container}>
            <form onSubmit={handleSubmit} className={styles.form_container}>
                <div className={styles.input_container}>
                    <TextField
                        label="Description"
                        name="desc"
                        value={data.desc}
                        handleInputState={handleInputState}
                        InputProps={{ classes: { input: styles.topAlignedText } }}
                    />
                </div>
                <h1>Upload Closet's Image</h1>
                <div className={styles.input_container}>
                    {/*<FileInput
                        label="Choose Image"
                        name="img"
                        type="file"
                        value={data.img}
                        handleInputState={handleInputState}
    />*/}
                <input
                    type="file"
                    id="file-input"
                    name="img"
                    onChange={(e) => handleInputState("img", e.target.files[0])}
                />
                </div>
                <div className={styles.input_container}>
                    <Button
                        label="Create"
                        onClick={handleSubmit}
                    />
                </div>
            </form>
        </div>
    );
};

export default ClosetsModel;
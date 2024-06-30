import { useState, useEffect } from "react";
import TextField from "../Input/TextField";
import FileInput from "../Input/FileInput";
import Button from "../Button";
import Select from "../Input/Select";
import styles from "./styles.module.scss";
import defaultImage from "../../images/defaultClothes.png";

const categoryOptions = [
    { name: 'Top', value: 'Top' },
    { name: 'Down', value: 'Down' },
    { name: 'Shoes', value: 'Shoes' },
    { name: 'Outerwear', value: 'Outerwear' },
    { name: 'Bag', value: 'Bag' },
    { name: 'Accessory', value: 'Accessory' },
    { name: 'Jewellery', value: 'Jewellery' },
    { name: 'Other', value: 'Other' },
];

const colorOptions = [
    { name: 'White', value: 'White' },
    { name: 'Black', value: 'Black' },
    { name: 'Gray', value: 'Gray' },
    { name: 'Brown', value: 'Brown' },
    { name: 'Beige', value: 'Beige' },
    { name: 'Camel', value: 'Camel' },
    { name: 'Red', value: 'Red' },
    { name: 'Orange', value: 'Orange' },
    { name: 'Yellow', value: 'Yellow' },
    { name: 'Green', value: 'Green' },
    { name: 'Blue', value: 'Blue' },
    { name: 'Navy', value: 'Navy' },
    { name: 'Purple', value: 'Purple' },
    { name: 'Pink', value: 'Pink' },
    { name: 'Silver', value: 'Silver' },
    { name: 'Gold', value: 'Gold' },
    { name: 'Misc', value: 'Misc' },
    { name: 'Other', value: 'Other' },
];

const seasonOptions = [
    { name: 'Spring', value: 'Spring' },
    { name: 'Summer', value: 'Summer' },
    { name: 'Fall', value: 'Fall' },
    { name: 'Winter', value: 'Winter' },
    { name: 'Other', value: 'Other' },
];

const ClothesModel = ({clothes}) => {
    const [data, setData] = useState({
        name: "",
        category: "",
        img: "",
        color: "",
        brand: "",
        season: ""
    });



    useEffect(() => {
        setData(prev => ({
            ...prev,
            img: clothes?.img || defaultImage,
        }));
    }, [clothes]);

    const handleInputState = (name, value) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("img", data.img);
        formData.append("brand", data.brand);
        formData.append("category", data.category);
        formData.append("color", data.color);
        formData.append("season", data.season);
        //alert("Image: " + (data.img ? data.img.name : "No file selected"));
        console.log(JSON.stringify(data));
    };

    return(
        
        <div className={styles.model_container}>
            <form onSubmit={handleSubmit} className={styles.form_container}>
                <div className={styles.input_container}>
                    <TextField
                        required={true}
                        label="Name"
                        name="name"
                        value={data.name}
                        handleInputState={handleInputState}
                        InputProps={{ classes: { input: styles.topAlignedText } }}
                    />
                </div>
                <div className={styles.input_container}>
                    <TextField
                        label="Brand"
                        name="brand"
                        value={data.brand}
                        handleInputState={handleInputState}
                        InputProps={{ classes: { input: styles.topAlignedText } }}
                    />
                </div>
                <div className={styles.input_container}>
                    <Select 
                        name="category"
                        handleInputState={handleInputState}
                        label="Category"
                        placeholder="--"
                        options={categoryOptions}
                        value={data.category}
                        required={true}
                        style={{fontSize: "2rem"}}
                    />
                </div>
                <div className={styles.input_container}>
                    <Select 
                        name="color"
                        handleInputState={handleInputState}
                        label="Color"
                        placeholder="--"
                        options={colorOptions}
                        value={data.color}
                        required={true}
                        style={{ fontSize: "2rem"}}
                    />
                </div>
                <div className={styles.input_container}>
                    <Select 
                        name="season"
                        handleInputState={handleInputState}
                        label="Season"
                        placeholder="--"
                        options={seasonOptions}
                        value={data.season}
                        required={true}
                        style={{fontSize: "2rem"}}
                    />
                </div>
                <h1>Upload Clothes' Image</h1>
                <div className={styles.input_container}>
                    <input
                        type="file"
                        id="file-input"
                        name="img"
                        onChange={(e) => handleInputState("img", e.target.files[0])}
                    />
                </div>
                <div className={styles.input_container} style={{margin: "3.5rem 0"}}>
                    <Button
                        label="Create"
                        onClick={handleSubmit}
                    />
                </div>
            </form>
        </div>
    );
};

export default ClothesModel;
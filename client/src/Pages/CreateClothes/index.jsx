import { useState, Fragment, useEffect } from "react";
import ClothesModel from "../../Components/ClothesModel";
import styles from "./styles.module.scss";



const CreateClothes = () => {
    
    return(
        <div className={styles.container}>
            <h1 className={styles.heading}>Create New Clothes</h1>
            <ClothesModel />
        </div>
    );
};

export default CreateClothes;
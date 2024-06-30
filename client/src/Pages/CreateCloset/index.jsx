import { useState, Fragment, useEffect } from "react";
import ClosetsModel from "../../Components/ClosetModel";
import styles from "./styles.module.scss";



const CreateCloset = () => {
    
    return(
        <div className={styles.container}>
            <h1 className={styles.heading}>Create New Closet</h1>
            <ClosetsModel />
        </div>
    );
};

export default CreateCloset;
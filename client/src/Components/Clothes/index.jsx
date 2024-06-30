import { useState } from "react";
import { IconButton } from "@mui/material";
import Liked from "../Liked";
import styles from "./styles.module.scss";
import { MoreHoriz } from "@mui/icons-material";
import ClothesCard from "./card";


const Clothes = ({clothes}) => {

    return(
        <div className={styles.clothes_container}>
            <ClothesCard clothes={clothes} />
        </div>
    );
};

export default Clothes;
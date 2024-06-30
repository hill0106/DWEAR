import { Fragment, useState } from "react";
import Clothes from "../../Components/Clothes";
import styles from "./styles.module.scss";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import {Search, Clear} from "@mui/icons-material"

const clothes1 = [
    {
        name: "My Bag",
        img: "https://media.bergdorfgoodman.com/f_auto,q_auto:low,ar_5:7,c_fill,dpr_2.0,w_720/01/bg_4035878_100273_m",
        category: "Bag",
        color: "Brown",
        brand: "prada",
        season: "Summer",
        _id: 1
    },
    {
        name: "Just black-t",
        img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Top",
        color: "Black",
        brand: "No-brand",
        season: "Summer",
        _id: 2
    },
]

const SearchPage = () => {
    const [search, setSearch] = useState("");
    const handleSearch = async({currentTarget: input}) => {
        setSearch(input.value);
    }

    return(
        <Fragment>
            <div className={styles.container}>
                <div className={styles.search_input_container}>
                    <IconButton>
                       <Search />
                    </IconButton>
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search for clothes"
                    />
                    <IconButton onClick={() => setSearch("")}>
                        <Clear />
                    </IconButton>
                </div>
                
                <div className={styles.results_container}>
                    <div className={styles.clothes_container}>
                        {clothes1.map(c => (
                            <Fragment key={c._id}>
                                <Clothes clothes={c} />
                            </Fragment>
                        ))}
                    </div>
                    
                </div>
            </div>
        </Fragment>
    );
};

export default SearchPage;
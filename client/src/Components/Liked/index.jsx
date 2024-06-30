import {useState} from 'react';
import { IconButton } from '@mui/material';
import {FavoriteBorder, Favorite} from "@mui/icons-material";
import styles from "./styles.module.scss";


const Liked = () => {
    const [like, setLike] = useState(false);
    return (
        <IconButton className={styles.like_btn} onClick={() => setLike(!like)}>
            {!like 
                ? (<FavoriteBorder className={styles.like_outlined}/>)
                : (<Favorite className={styles.like} />)
            }
        </IconButton>
    );
};

export default Liked

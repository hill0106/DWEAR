
import { Fragment } from "react";
import styles from "./styles.module.scss";
import ClosetCard from "./card";



const Closets = ({closets}) => {
    return(
        <Fragment>
            <div className={styles.cardContainer}>
                {closets.map(c => (
                    <ClosetCard closet={c}/>
                ))
                }
            </div>
        </Fragment>
    );
};

export default Closets;
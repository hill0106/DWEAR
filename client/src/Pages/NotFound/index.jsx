import React from 'react'
import {useNavigate} from 'react-router-dom';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import styles from "./styles.module.scss";

const NotFound = () => {
    const navigate = useNavigate();
  return (
    <div className={styles.container}> 
      <div className={styles.left}>
        <div className={styles.main}>
            <div className={styles.not}>
              <h1>404s Not Found</h1>
              <SentimentVeryDissatisfiedIcon sx={{ fontSize: 40 }}/>
            </div>
            
            <p>We couldn't find the page you were looking for.</p>
            <span onClick={() => navigate("/home")}>Go Back Home</span>
        </div>
      </div>
    </div>
  );
}

export default NotFound

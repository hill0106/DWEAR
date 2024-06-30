import { Fragment, useState, useEffect } from "react";
import Closets from "../../Components/Closets";
import styles from "./styles.module.scss";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";
import NavBar from "../../Components/Navbar";
import setAuthToken from '../../setAuthToken';
import axios from "axios";

const Home = () => {
  const [closetData, setClosetData] = useState([]);

  useEffect(() => {
    const storedClosetData = localStorage.getItem('closetData');
    if (storedClosetData) {
      try {
        const parsedClosetData = JSON.parse(storedClosetData);
        setClosetData([parsedClosetData.data]);
      } catch (error) {
        console.error('Error parsing Data:', error);
      }
    }

  }, []);

  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.top}>
          <h1>Your Closets</h1>
          <Link to="/create_closet">
            <Button label="Create New Closet" style={{ width: "20rem", marginRight: "5rem" }} />
          </Link>
        </div>
        <div className={styles.closets_container}>

            <Closets closets={closetData} />
         
        </div>
      </div>
    </Fragment>
  );
};

export default Home;

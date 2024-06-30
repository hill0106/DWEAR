import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import { ClickAwayListener } from "@mui/material";
import logo from "../../images/DWEAR_Logo.png";
import { Checkroom, AccountCircle, Person, Settings, Logout, ArrowDropUp, ArrowDropDown, Check } from "@mui/icons-material"; // Removed unused imports
import styles from "./styles.module.scss";

const NavBar = () => {
    const [menu, setMenu] = useState(false);
    const navigate = useNavigate(); 
    const [userData, setUserData] = useState('');

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            try {
                const parsedUserData = JSON.parse(storedUserData);
                setUserData(parsedUserData.data);
            } catch (error) {
                console.error('Error parsing userData:', error);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userData');
        navigate('/login');
    };
    

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                {/*<div className={styles.icon} onClick={() => navigate(-1)}> 
                    <ArrowBackIosRounded />
                </div>
                <div className={styles.icon} onClick={() => navigate(+1)}>
                    <ArrowForwardIosRounded />
                </div>*/}
                <div className={styles.logo}>
                    <Link to="/">
                        <img src={logo} alt="logo"/>
                    </Link>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.profile_menu} onClick={() => setMenu(!menu)}>
                    <AccountCircle />
                    <p>{userData.name}</p>
                    
                    {menu ? <ArrowDropUp /> : <ArrowDropDown />}
                </div>
            </div>
            {menu && (
                    <ClickAwayListener onClickAway = {() => setMenu(false)}>
                        <div className={styles.menu} onClick={() => setMenu(false)}>
                            <Link to="/home">
                                <div className={styles.options}>
                                    <p>Closets</p>
                                    <Checkroom />
                                </div>
                            </Link>
                            <Link to="/profile">
                                <div className={styles.options}>
                                    <p>Profile</p>
                                    <Person />
                                </div>
                            </Link>
                            <Link to="/">
                                <div className={styles.options} onClick={handleLogout}>
                                    <p>Logout</p>
                                    <Logout />
                                </div>
                            </Link>
                        </div>
                    </ClickAwayListener>
                )
            }
        </div>
    );
};

export default NavBar;

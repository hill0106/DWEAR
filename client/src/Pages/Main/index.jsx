import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import logo from "../../images/DWEAR_Logo.png";
import CopyrightIcon from "@mui/icons-material/CopyrightOutlined";
import styles from "./styles.module.scss";

const nav_links = [
    {name: "Sign up", link: "/signup"},
    {name: "Log in", link: "/login"}
];

const Main = () => {
    return(
        <div className={styles.container}>
            <nav className={styles.navbar_container}>
                <Link to="/" className={styles.nav_logo}>
                    <img src={logo} alt="logo"/>
                </Link>
                <div className={styles.nav_links}>
                    {
                        nav_links.map((link, idx) => (
                            <Link key={idx} to={link.link} className={styles.links}>{link.name}</Link>
                        ))
                    }
                </div>
            </nav>
            <main className={styles.main_container}>
                    <div className={styles.bg}></div>
                    <div className={styles.main}>
                        <h1>Clothing is everything.</h1>
                        <p>Time to manage your daily outfits with DWEAR.</p>
                        <Link to="/signup">
                            <Button label="Sign Up Now" style={{color: "#111111", width: "20rem", fontSize: "2rem"}}></Button>
                        </Link>
                    </div>
            </main>
            <footer className={styles.footer_container}>
                <div className={styles.footer_1}>
                    <Link to="/" className={styles.footer_logo}>
                        <img src={logo} alt="logo"/>
                    </Link>
                    <div className={styles.copy_right}>
                    <CopyrightIcon />
                    <span>2024 DWEAR. All rights reserved.</span>
                </div>
                </div>
            </footer>
        </div>
    );
};

export default Main;
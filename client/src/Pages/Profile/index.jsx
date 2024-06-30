import { Fragment, useState, useEffect } from "react";
import Joi from "joi";
import TextField from "../../Components/Input/TextField";
import Closets from "../../Components/Closets";
import styles from "./styles.module.scss";
import Button from "../../Components/Button";
import RadioInput from "../../Components/Input/Radio";
import Select from "../../Components/Input/Select";
import passwordComplexity from "joi-password-complexity";
import {List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const months = [
    { name: "January", value: 1 },
    { name: "February", value: 2 },
    { name: "March", value: 3 },
    { name: "April", value: 4 },
    { name: "May", value: 5 },
    { name: "June", value: 6 },
    { name: "July", value: 7 },
    { name: "August", value: 8 },
    { name: "September", value: 9 },
    { name: "October", value: 10 },
    { name: "November", value: 11 },
    { name: "December", value: 12 }
];

const convertMonth = (m) => {
    switch (m) {
        case '1':
            return 'January';
        case '2':
            return 'February';
        case '3':
            return 'March';
        case '4':
            return 'April';
        case '5':
            return 'May';
        case '6':
            return 'June';
        case '7':
            return 'July';
        case '8':
            return 'August';
        case '9':
            return 'September';
        case '10':
            return 'October';
        case '11':
            return 'November';
        case '12':
            return 'December';
        default:
            return '';
    }
};

const Profile = () => {
    const [data, setData] = useState({
        email: "",
        pwd: "",
        name: "",
        month: "",
        year: "",
        day: "",
        gender: ""
    });
    const [errors, setErrors] = useState({});

    const handleInputState = (name, value) => {
        setData(data => ({...data, [name]: value}));
    };

    const handleErrorState = (name, value) => {
        value === ""
        ? delete errors[name] 
        : setErrors(() => ({...errors, [name]: value}));
    };

    const schema = {
        email: Joi.string().email({tlds: false}).required().label("Email"),
        pwd: passwordComplexity().required().label("Password"),
        name: Joi.string().required().min(2).max(10).label("Name"),
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data); //todo
    };

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

    const [update, setUpdate] = useState(false);

    const handleUpdate = () => {
        setUpdate(true);
    }

    return(
        <Fragment>
            {update ? (<></>) : (
            <div className={styles.container}>
                <h1>User Information</h1>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ListItem>
                        <ListItemAvatar>
                        <Avatar>
                            <PersonIcon fontSize= "large"/>
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Name" secondary={userData.name}  primaryTypographyProps={{fontSize: '2rem'}} secondaryTypographyProps={{fontSize: '1.8rem', fontWeight: "500"}}/>
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                        <Avatar>
                            <EmailIcon fontSize= "large" />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Email" secondary={userData.email} primaryTypographyProps={{fontSize: '2rem'}} secondaryTypographyProps={{fontSize: '1.8rem', fontWeight: "500"}}/>
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                        <Avatar>
                            <InfoIcon fontSize= "large" />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Gender" secondary={userData.gender} primaryTypographyProps={{fontSize: '2rem'}} secondaryTypographyProps={{fontSize: '1.8rem', fontWeight: "500"}}/>
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                        <Avatar>
                            <CalendarTodayIcon fontSize= "large"/>
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Birthday" secondary={convertMonth(userData.month) + ', ' + userData.day + ', ' + userData.year} secondaryTypographyProps={{fontSize: '1.8rem', fontWeight: "500"}} primaryTypographyProps={{fontSize: '2rem'}}/>
                    </ListItem>
                </List>
                    
                <Button label="Update Profile" onClick={handleUpdate} style={{margin: "5rem 0"}}/>
            </div>
            )}
            {update 
            ? (<div className={styles.container2}>
                <IconButton aria-label="delete" style={{marginRight: "50rem"}} onClick={() => setUpdate(false)}>
                    <ArrowBackIcon style={{width: "3.5rem", height: "3rem"}}/>
                </IconButton>

                <h1>Update Your Profile</h1>
                <form onSubmit={handleSubmit} className={styles.form_container}>
                    <div className={styles.input_container}>
                        <TextField
                            label="Your email"
                            placeholder="Enter your email"
                            name="email"
                            handleInputState={handleInputState}
                            schema={schema.email}
                            handleErrorState={handleErrorState}
                            value={data.email}
                            error={errors.email}
                            required={true}
                        />
                    </div>
                    <div className={styles.input_container}>
                        <TextField
                            label="Your password"
                            placeholder="Enter your password"
                            name="pwd"
                            handleInputState={handleInputState}
                            schema={schema.pwd}
                            handleErrorState={handleErrorState}
                            value={data.pwd}
                            error={errors.pwd}
                            type="password"
                            required={true}
                        />
                        <p style={{color: "var(--light-gray)", fontSize: "1.4rem"}}>Your password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one special character (e.g., !@#$%^&*).</p>
                    </div>
                    <div className={styles.input_container}>
                        <TextField
                            label="Your name"
                            placeholder="Enter your name"
                            name="name"
                            handleInputState={handleInputState}
                            schema={schema.name}
                            handleErrorState={handleErrorState}
                            value={data.name}
                            error={errors.name}
                            required={true}
                        />
                    </div>
                    <div className={styles.birthdate_container}>
                        <p>Your date of birth</p>
                        <div className={styles.birthdate}>
                            <div className={styles.month}>
                                <Select 
                                    name="month"
                                    handleInputState={handleInputState}
                                    label="Month"
                                    placeholder="Month"
                                    options={months}
                                    value={data.month}
                                    required={true}
                                    style={{color: "var(--gray)", fontSize: "2.2rem"}}
                                />
                            </div>
                            <div className={styles.day}>
                                <TextField 
                                    name="day"
                                    handleInputState={handleInputState}
                                    label="Day"
                                    placeholder="DD"
                                    value={data.day}
                                    required={true}
                                    style={{color: "var(--gray)"}}
                                />
                            </div>
                            <div className={styles.year}>
                                <TextField 
                                    name="year"
                                    handleInputState={handleInputState}
                                    label="Year"
                                    placeholder="YYYY"
                                    value={data.year}
                                    required={true}
                                    style={{color: "var(--gray)"}}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.input_container}>
                        <RadioInput
                            label="Your gender"
                            name="gender"
                            handleInputState={handleInputState}
                            options={["male", "female", "non-binary"]}
                        />
                    </div>
                    <div className={styles.submit_btn_wrapper}>
                        <Button
                            label="Update"
                            type="sumbit"
                            style={{ width: "20rem", margin: "1rem 0"}}
                        />
                    </div>
                </form>
            </div>)
            : (<></>)
            }
            
        </Fragment>
    );
};

export default Profile;
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import TextField from "../../Components/Input/TextField";
import Select from "../../Components/Input/Select";
import RadioInput from "../../Components/Input/Radio";
import axios from "axios";
import Button from "../../Components/Button";
import logo from "../../images/DWEAR_Logo.png";
import styles from "./styles.module.scss";

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


const SignUp = () => {
    const navigate = useNavigate();
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
        month: Joi.string().required(),
        year: Joi.string().required(),
        day: Joi.string().required(),
        gender: Joi.string().required()
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationResult = Joi.object(schema).validate(data);
        console.log(validationResult);
        if (validationResult.error) {
            const newErrors = {};
            validationResult.error.details.forEach(detail => {
                newErrors[detail.path[0]] = detail.message;
            });
            setErrors(newErrors);
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/api/users', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Signup successful', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Signup failed', error.response.data);
        }
    };

    return(
        <div className={styles.container}>
            <div className={styles.logo}>
                <Link to="/">
                    <img src={logo} alt="logo"/>
                </Link>
            </div>
            <h1 className={styles.heading}>Let DWEAR Manage Your Closet</h1>
            <form onSubmit={handleSubmit} className={styles.form_container}>
                <h2 className={styles.form_heading}>Sign up with your email address</h2>
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
                        required={true}
                    />
                </div>
                <div className={styles.submit_btn_wrapper}>
                    <Button
                        label="Sign Up"
                        type="sumbit"
                        style={{ width: "20rem", margin: "1rem 0"}}
                    />
                </div>
                <p className={styles.condition} style={{fontSize: "1.6rem"}}>
                    Have an account? <Link to="/login">Log in</Link>
                </p>
            </form>
        </div>
    );
};

export default SignUp;
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import TextField from "../../Components/Input/TextField";
import axios from "axios";
import RadioInput from "../../Components/Input/Radio";
import CheckBoxInput from "../../Components/Input/CheckBox";
import Button from "../../Components/Button";
import logo from "../../images/DWEAR_Logo.png";
import styles from "./styles.module.scss";
import setAuthToken from '../../setAuthToken';


const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({email: "", pwd: ""});
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
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationResult = Joi.object(schema).validate(data);
        if (validationResult.error) {
            const newErrors = {};
            validationResult.error.details.forEach(detail => {
                newErrors[detail.path[0]] = detail.message;
            });
            setErrors(newErrors);
            return;
        }
        try {
            const response1 = await axios.post('http://localhost:8080/api/login', data);
            const token = response1.data.data;
            const user_id = response1.data.id;
            console.log('Login successful! ' + 'token: ' + token + ' user ID: ' + user_id);
            localStorage.setItem('token', token);
            setAuthToken(token);
            try {
                const userResponse = await axios.get(`http://localhost:8080/api/users/${user_id}`, {
                    headers: {
                        'x-auth-token': token,
                    }
                });
                const userData = userResponse.data;
                localStorage.setItem('userData', JSON.stringify(userData));
                const closetResponse = await axios.get('http://localhost:8080/api/closet/', {
                    headers: {
                      'x-auth-token': token,
                    },
                });
                const closetData = closetResponse.data;
                localStorage.setItem('closetData', JSON.stringify(closetData));
                navigate('/home');
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
            
        } catch (error) {
            console.error('Login failed', error.response.data);
            // Handle error response
        }
    };

    return(
        <div className={styles.container}>
            <div className={styles.logo}>
                <Link to="/">
                    <img src={logo} alt="logo"/>
                </Link>
            </div>
            <main>
                <h1 className={styles.heading}>Sign in</h1>
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
                    </div>
                    <p className={styles.forgot_pwd}>Forgot your password?</p>
                    <div className={styles.form_bottom}>
                        <CheckBoxInput label="Remember me"/>
                        <Button
                            label="Log In"
                            type="sumbit"
                            style={{ width: "20rem"}}
                        />
                    </div>
                </form>
                <p className={styles.condition} style={{fontSize: "1.6rem"}}>
                        Don't Have an account? <Link to="/signup">Sign up now</Link>
                </p>
            </main>
        </div>
    );
};

export default Login;
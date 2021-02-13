import React, {useContext, useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link, useHistory} from 'react-router-dom'
import {useForm} from "react-hook-form";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import {UserContext} from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));

const Login = () => {
    const {user, setUser} = useContext(UserContext);
    let history = useHistory();

    useEffect(() => {
        if (localStorage.getItem("jwtToken")) {
            axios.get("http://localhost:5000/api/v1/users/me", {headers: {'x-auth-token': localStorage.getItem('jwtToken')}})
                .then(res => {
                    setUser(res.data);
                    redirectDashboard();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    let [incorrectEmailOrPassword, setIncorrectEmailOrPassword] = useState(false);
    const methods = useForm();
    const {handleSubmit, register, errors} = methods;
    const onSubmit = (data) => {
        axios.post("http://localhost:5000/api/v1/users/login", data)
            .then((res) => {
                localStorage.setItem("jwtToken", res.headers["x-auth-token"]);
                setUser(res.data);
                redirectDashboard();
            })
            .catch((err) => {
                setIncorrectEmailOrPassword(true);
                console.log(err);
            });
    }

    const redirectDashboard = () => {
        history.push("/feed");
    }

    return (
        <div>
            <div className={"row mt-3 justify-content-center"}>
                <div className={"col-md-4"}>
                    <Paper elevation={24}>
                        <div className={"p-5"}>
                            <h2 className={"text-center"}>Login form</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className={useStyles.root} noValidate
                                  autoComplete="off">
                                {incorrectEmailOrPassword && <div>
                                    <Alert className={"mt-3 mb-3"} severity="error">Incorrect Email or password</Alert>
                                </div>}
                                <div className={"mb-3"}>
                                    <TextField error={!!errors.email} fullWidth label="Email"
                                               placeholder={"Write your email"} name="email"
                                               inputRef={register({
                                                   required: "Email is required"
                                               })}
                                               helperText={(!!errors.email) ? errors.email.message : ""}/>
                                </div>
                                <div className={"mb-3"}>
                                    <TextField error={!!errors.password} fullWidth type={"password"} label="Password"
                                               placeholder={"Write your password"} name="password" inputRef={register({
                                        required: "Password is required"
                                    })}
                                               helperText={(!!errors.password) ? errors.password.message : ""}/>
                                </div>
                                <Button type={"submit"} className={"float-right"} variant="contained" color="primary"
                                        endIcon={<ExitToAppIcon/>}>
                                    Login
                                </Button>
                                <p>Not have an account? <Link to={"/signup"}>Sign Up</Link></p>
                                <p>
                                    {JSON.stringify(user, null, 2)}
                                </p>
                            </form>
                        </div>
                    </Paper>
                </div>

            </div>
        </div>


    )
}

export default Login;


import React, { useContext, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import BASE_URL from "../BaseUrl";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const SignUpPage = () => {
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  let [alreadyRegisteredMsg, setAlreadyRegisteredMsg] = useState(false);
  const methods = useForm();
  const { handleSubmit, register, errors } = methods;
  const onSubmit = (data) => {
    setLoading(true);
    data.email = data.email.toLowerCase();
    axios
      .post(BASE_URL + "/users/register", data)
      .then((res) => {
        //is logged in automatically
        localStorage.setItem("jwtToken", res.headers["x-auth-token"]);
        setUser(res.data);
        redirectDashboard();
      })
      .catch((err) => {
        setLoading(false);
        setAlreadyRegisteredMsg(true);
      });
  };

  const redirectDashboard = () => {
    history.push("/feed");
  };

  return (
    <div className="container">
      <div className={"row mt-3 justify-content-center"}>
        <div className={"col-md-7"}>
          <Paper elevation={24}>
            <div className={"p-5"}>
              <h2 className={"text-center"}>Sign up form</h2>
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                autoComplete="off"
              >
                {alreadyRegisteredMsg && (
                  <div>
                    <Alert className={"mt-3 mb-3"} severity="error">
                      Email already registered
                    </Alert>
                  </div>
                )}

                <div className={"mb-3"}>
                  <TextField
                    error={!!errors.username}
                    fullWidth
                    label="Username"
                    placeholder={"Write your username"}
                    name="username"
                    inputRef={register({
                      required: "Username is required.",
                      minLength: {
                        value: 4,
                        message: "Username minlenght is 4 characters.",
                      },
                    })}
                    helperText={
                      !!errors.username ? errors.username.message : ""
                    }
                  />
                </div>
                <div className={"mb-3"}>
                  <TextField
                    error={!!errors.email}
                    fullWidth
                    label="Email"
                    placeholder={"Write your email"}
                    name="email"
                    inputRef={register({
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    helperText={!!errors.email ? errors.email.message : ""}
                  />
                </div>
                <div className={"mb-3"}>
                  <TextField
                    error={!!errors.password}
                    fullWidth
                    type={"password"}
                    label="Password"
                    placeholder={"Write your password"}
                    name="password"
                    inputRef={register({
                      required: "Password is required",
                      minLength: {
                        value: 4,
                        message: "Password minlenght is 4 characters",
                      },
                    })}
                    helperText={
                      !!errors.password ? errors.password.message : ""
                    }
                  />
                </div>
                <Button
                  type={"submit"}
                  className={"float-right"}
                  variant="contained"
                  color="primary"
                  endIcon={<ExitToAppIcon />}
                >
                  Sign up
                </Button>
                <p>
                  Already have an account? <Link to={"/login"}>Login</Link>
                </p>
              </form>
            </div>
            {loading && <LinearProgress />}
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

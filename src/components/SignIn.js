import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState } from "react";
import Image from "../assets/huset.jpg";
import { auth } from "../utils/firestore";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${Image})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      console.error("Error signing in with password and email", error);
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-postadress"
              name="userEmail"
              autoComplete="email"
              autoFocus
              onChange={onChangeHandler}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="userPassword"
              label="Lösenord"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChangeHandler}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(event) => {
                signInWithEmailAndPasswordHandler(event, email, password);
              }}
            >
              Logga in
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default SignIn;

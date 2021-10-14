import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import React, { useState } from "react";
import { connect } from "react-redux";
import { login, setEmail, setPassword } from "../../redux/actions/user";
import FormErrors from "../Global/FormErrors";
import style from "./style";

const Login = (props) => {
    const {classes, setEmail, setPassword, login, user} = props;
    const {email, password} = user;
    const [errors, setErrors] = useState([]);
    return (
        <div style={{textAlign: "center"}}>
            <Grid container direction="column" spacing={2} width="350px" marginLeft="auto" marginRight="auto" textAlign="center">
                <Grid item>
                    <Typography component="h1" variant="h3">Log-in</Typography>
                </Grid>
                <Grid item>
                    <Typography component="p" variant="p">Please enter your credentials to start chatting</Typography>
                </Grid>
                <Grid item>
                    <TextField 
                        fullWidth
                        placeholder="Your email"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField 
                        fullWidth
                        placeholder="Your password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />
                </Grid>
                <Grid item>
                    <Button 
                        fullWidth 
                        variant="contained" 
                        onClick={() => login(setErrors)}
                        disabled={email.length === 0 || password.length === 0}
                    >
                        Login
                    </Button>
                </Grid>
            </Grid>
            <FormErrors errors={errors} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return({
        user: state.user.user,
    });
}

const mapDispatchToProps = (dispatch) => {
    return({
        setEmail: (email) => dispatch(setEmail(email)),
        setPassword: (password) => dispatch(setPassword(password)),
        login: (setErrors) => dispatch(login(setErrors)),
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Login));

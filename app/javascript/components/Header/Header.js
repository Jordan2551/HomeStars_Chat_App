import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import { withStyles } from "@mui/styles";
import styles from "./styles";
import { Typography } from "@mui/material";

const Header = (props) => {
    const {classes, logout, isLoggedin, user} = props;
    
    return (
        <Box className={classes.headerContainer}>
            <AppBar position="static">
                <Toolbar>
                <Link to="/" className={classes.navLink}>Home</Link>
                <Link to="/channels" className={classes.navLink}>Channels</Link>
                <Link to={`/users/messages`} className={classes.navLink}>Messages</Link>
                {
                    isLoggedin ?
                        <div style={{marginLeft: 'auto'}}>
                            <Typography component="p" variant="p" display="inline-block">{user.email}</Typography> | 
                            <Button onClick={logout} display="inline-block" style={{color: '#ffff'}}>LOGOUT</Button>
                        </div>
                        :
                        <Link to ={"/login"} className={classes.navLink} style={{marginLeft: 'auto'}}>LOGIN</Link>
                }
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default withStyles(styles)(Header);

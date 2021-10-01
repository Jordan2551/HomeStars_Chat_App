import { Typography, Button, Grid } from "@mui/material"
import React from "react"
import {Link} from 'react-router-dom';

const Welcome = () => {
    return (
        <Grid container textAlign="center" spacing={3} direction="column">
            <Grid item>
                <Typography component="h1" variant="h3">
                    Welcome to the Chat Application!
                </Typography>
            </Grid>
            <Grid item>
                <Typography component="p" variant="subtitle">
                    Get started by visiting and joining your favorite channels or to check out your own message history
                </Typography>
            </Grid>
            <Grid item>
                <Link to="/channels" style={{textDecoration: 'none'}}>
                    <Button variant="outlined">Visit Channels</Button>
                </Link>
                <Link to="/users/messages" style={{textDecoration: 'none'}}>
                    <Button variant="contained" style={{marginLeft: '2em'}}>Your Messages</Button>
                </Link>                
            </Grid>
        </Grid>
    )
}

export default Welcome

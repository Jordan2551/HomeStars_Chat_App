// import { Button } from "@mui/material";
import { IconButton, Tooltip, Typography } from '@mui/material';
import React from "react";
import { Link, useParams } from "react-router-dom";

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { withStyles } from '@mui/styles';
import styles from './styles';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import {API_PATH} from "../../helpers/consts";
import APIWrapper from "../../helpers/apiWrapper";
import axios from "axios";

const ChannelPreview = (props) => {
    const {id, attributes, inChannel, getUserChannels, classes} = props;
    const {name, image} = attributes;

    const joinChannel = async () => {
        const result = await APIWrapper.handleAPIRequest(() => axios.post(`${API_PATH}/users/channels/${id}`));
        getUserChannels();
    }

    const leaveChannel = async () => {
        const result = await APIWrapper.handleAPIRequest(() => axios.delete(`${API_PATH}/users/channels/${id}`));
        getUserChannels();
    }

    return(
        <Card sx={{ width: 260, marginBottom: '2em'}}>
            <CardMedia 
                component="img"
                height="140"
                image={image}
                alt={`Image for ${name} chat`}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">{name}</Typography>
            </CardContent>
            <CardActions >
                {inChannel && (
                    <Button>
                        {/*/channel/:id/:limit?/:offset?"> */}
                        <Link className={classes.cardActionLink} to={`channel/${id}/10/0`}>Visit Channel</Link>
                    </Button>
                )}
                <div className={classes.joinRemoveActionContainer}>
                    {
                        inChannel ? 
                            <IconButton color="secondary" onClick={leaveChannel}>
                                <Tooltip title="Leave this channel">
                                    <RemoveCircleOutlineIcon htmlColor="#E74C3C"/>
                                </Tooltip>
                            </IconButton>
                            :
                            <IconButton color="primary" onClick={joinChannel}>
                                <Tooltip title="Join this channel">
                                    <ControlPointIcon htmlColor="#27AE60"/>
                                </Tooltip>
                            </IconButton>
                    }
                </div>
            </CardActions>
        </Card>
    )
}

export default withStyles(styles)(ChannelPreview);
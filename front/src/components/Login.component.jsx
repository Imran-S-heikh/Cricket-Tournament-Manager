import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, makeStyles, FormControl, InputLabel, Input, TextField, Paper, Button } from '@material-ui/core';
import BG from '../assets/images/cricket.jpeg';

const useStyles = makeStyles((theme) => ({
    root: {

        width: '100%',
        height: 'calc(100vh - 64px)',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden'

    },
    bg: {
        backgroundImage: `url(${BG})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: -1,
        filter: 'blur(3px)',
        opacity: .5,

        '&:before': {
            content: '\'\'',
            width: '100%',
            height: '100%',
            position: 'absolute',
            opacity: '.6',
            backgroundColor: 'white',
            filter: 'blur(500px)',

        }
    },
    paper: {
        width: 300,
        margin: 'auto',
        padding: 20,
        backgroundColor: 'rgba(0,0,0,.3)',
        // marginTop: 30
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
            margin: theme.spacing(1)
        }
    },
    createLink: {
        margin: '10px auto 0 auto',
        textAlign: 'center',
        fontSize: '12px'
    }
}));

function Login() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.bg}></div>
            <Paper className={classes.paper} elevation={3}>
                <h1>Player Lgin</h1>
                <form className={classes.form}>
                    <TextField id="email" label="Email" size="small" type="email" />
                    <TextField id="password" label="Password" size="small" type="password" />
                </form>
                <Box mt={2}>
                    <Button variant="contained" color="primary" fullWidth>Submit</Button>
                </Box>
                <Box component="div" className={classes.createLink}>
                    Don't have an account,
                    <Link to="/signup">
                        Create one
                    </Link> 
                </Box>
            </Paper>
        </div>
    )
}

export default Login;
export {useStyles as SignupStyle}
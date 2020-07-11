import React from 'react'
import {  Box, TextField, Paper, Button } from '@material-ui/core';
import { SignupStyle } from './Login.component'

function Signup() {
    const classes = SignupStyle();
    console.log('hello')
    return (
        <div className={classes.root}>
            <div className={classes.bg}></div>
            <Paper className={classes.paper} elevation={3}>
                <h1>Create Account</h1>
                <form className={classes.form}>
                    <TextField id="name" label="Name" size="small" type="text" />
                    <TextField id="email" label="Email" size="small" type="email" />
                    <TextField id="home" label="Home" size="small" type="text" />
                    <TextField id="password" label="Password" size="small" type="password" />
                    <TextField id="confirmPassword" label="Confirm Password" size="small" type="password" />
                </form>
                <Box mt={2}>
                    <Button variant="contained" color="primary" fullWidth>Submit</Button>
                </Box>
            </Paper>
        </div>
    )
}

export default Signup;

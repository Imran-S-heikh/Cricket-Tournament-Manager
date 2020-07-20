import React, { useState } from 'react'
import { Box, TextField, Paper, Button } from '@material-ui/core';
import { SignupStyle } from '../login/Login.component';
import { signupRequest } from './signup.api';
import { useRecoilState } from 'recoil';
import { currentUserState } from '../../recoil/atoms';
import { Redirect } from 'react-router-dom';

function Signup() {
    const classes = SignupStyle();
    const [name, setName] = useState('Imran Sheikh');
    const [email, setEmail] = useState('imran@gmail.com');
    const [home, setHome] = useState('Bangladesh');
    const [password, setPassword] = useState('12345678');
    const [confirmPassword, setConfirmPassword] = useState('12345678');
    const [currentUser,setCurrentUser] = useRecoilState(currentUserState);

    if(currentUser) return <Redirect to="/"/>

    const handleSubmit = () => {
        const obj = {
            name,
            email,
            home,
            password,
            confirmPassword
        }
        signupRequest(obj).then(({data})=>{
            setCurrentUser(data.player)
            console.log(data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    const value = (event) => {
        return event.currentTarget.value
    }

    return (
        <div className={classes.root}>
            <div className={classes.bg}></div>
            <Paper className={classes.paper} elevation={3}>
                <h1>Create Account</h1>
                <form className={classes.form}>
                    <TextField id="name" value={name}
                        onChange={e => setName(value(e))}
                        label="Name" size="small"
                        type="text"
                    />
                    <TextField id="email" value={email}
                        onChange={e => setEmail(value(e))}
                        label="Email" size="small"
                        type="email"
                    />
                    <TextField id="home" value={home}
                        onChange={e => setHome(value(e))}
                        label="Home" size="small"
                        type="text"
                    />
                    <TextField id="password" value={password}
                        onChange={e => setPassword(value(e))}
                        label="Password" size="small"
                        type="password"
                    />
                    <TextField id="confirmPassword"
                        onChange={e => setConfirmPassword(value(e))}
                        label="Confirm Password" size="small"
                        type="password"
                    />
                </form>
                <Box mt={2}>
                    <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>Submit</Button>
                </Box>
            </Paper>
        </div>
    )
}

export default Signup;

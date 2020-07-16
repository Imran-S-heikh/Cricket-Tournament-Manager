import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Box, makeStyles, TextField, Paper, Button } from '@material-ui/core';
import BG from '../../assets/images/cricket.jpeg';
import { useRecoilState } from 'recoil';
import { currentUserState } from '../../recoil/atoms';
import { requestLogin } from './login.api';

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
    const [email,setEmail] = useState('imran@gmail.com');
    const [password,setPassword] = useState('12345678');
    const [currentUser,setCurrentUser] = useRecoilState(currentUserState);
    if(currentUser) return <Redirect to="/home"/>

    const handleSubmit = ()=> {
        requestLogin({email,password}).then(res=>{
            setCurrentUser(res.data.player)
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className={classes.root}>
            <div className={classes.bg}></div>
            <Paper className={classes.paper} elevation={3}>
                <h1>Player Lgin</h1>
                <form className={classes.form}>
                    <TextField value={email} id="email" 
                        onChange={e=>setEmail(e.currentTarget.value)} 
                        label="Email" size="small" 
                        type="email" 
                    />
                    <TextField value={password} id="password"
                        onChange={e=>setPassword(e.currentTarget.value)} 
                        label="Password" size="small" 
                        type="password" 
                    />
                </form>
                <Box mt={2}>
                    <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>Submit</Button>
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
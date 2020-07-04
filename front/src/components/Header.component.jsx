import React, { useState } from 'react'
import { AppBar, Toolbar, Button, IconButton, Typography, makeStyles, Drawer, Box } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import Hide from './Hide.component';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import Sidebar from './Sidebar.component';

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
}));

function Header() {
    const classes = useStyles();
    const [me, setMe] = useState({ active: true });
    const [drawer, setDrawer] = useState(false);

    const toggleDrawer = () => {
        setDrawer(!drawer);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color="transparent">
                <Toolbar>
                    <IconButton onClick={toggleDrawer} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Box flexGrow={1}>
                        <Link to="/">
                            <IconButton>
                                <HomeRoundedIcon />
                            </IconButton>
                        </Link>
                    </Box>
                    <Hide hide={!me.active}>
                        <Link to="/login" >
                            <IconButton>
                                <AccountCircle />
                            </IconButton>
                        </Link>
                    </Hide>
                </Toolbar>
            </AppBar>
            <Sidebar toggle={toggleDrawer} drawer={drawer}/>
       </div>
    )
}

export default Header;

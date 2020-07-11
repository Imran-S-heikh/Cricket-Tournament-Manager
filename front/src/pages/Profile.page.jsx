import React, { useState } from 'react'
import { Box, makeStyles, Grid, Paper, BottomNavigation, BottomNavigationAction} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import FaceIcon from '@material-ui/icons/Face';
import SportsBaseballIcon from '@material-ui/icons/SportsBaseball';
import { ReactComponent as Bat } from '../assets/svg/cricket-bat.svg';
import Batting from '../components/Batting.component';
import Info from '../components/Info.component';
import Bowling from '../components/Bowling.component';

const drawerWidth = '100%';

const useStyles = makeStyles(() => ({
    root: {
        width: '80vw',
        height: 400,
        margin: '30px auto 30px auto',

    },
    drawerPaper: {
        width: drawerWidth,
        position: 'static'
    },
    closeIcon: {

    },
    left: {
        width: 200,
        position: 'relative',
        backgroundColor: 'gray'

    },
    right: {
        display: 'flex'
    },
    container: {
        height: '100%'
    },
    userIcon: {
        position: 'absolute',
        top: '50%',
        right: '0',
        transform: `translate(50%,-50%)`,
        '& > *': {
            fontSize: 80
        }
    },
    content: {
        width: '85%',
        height: '90%',
        margin: 'auto',
    },
    batIcon: {
        width: 30, 
    },
    value: {

    },
    field: {
        color: 'gray'
    },
    navPaper: {
        '& > div': {
            backgroundColor: 'rgba(0,0,0,.4)'
        }
    },
    white: {
        color: 'white'
    }

}))

function Profile() {
    const [value, setValue] = useState('info')
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Grid container className={classes.container}>
                <Grid item className={classes.left}>
                    <Paper className={classes.userIcon}>
                        <PersonIcon />
                    </Paper>
                </Grid>
                <Grid item xs={true} className={classes.right}>
                    <Box className={classes.content}>
                        <div className={classes.nav}>
                            <Paper className={classes.navPaper}>
                                <BottomNavigation value={value} onChange={(event, newValue) => { setValue(newValue) }}>
                                    <BottomNavigationAction label="Information" value="info" icon={<FaceIcon />} onClick={() => { console.log('Hello') }} />
                                    <BottomNavigationAction label="Bowling" value="bowling" icon={<SportsBaseballIcon />} />
                                    <BottomNavigationAction label="Batting" value="batting" icon={<Bat className={classes.batIcon} />} />
                                </BottomNavigation>
                            </Paper>
                        </div>
                        <div className={classes.statContainer}>
                            {(value === 'batting') ? <Batting/> : (value === 'bowling') ? <Bowling/>  : <Info classes={classes}/>}
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Profile

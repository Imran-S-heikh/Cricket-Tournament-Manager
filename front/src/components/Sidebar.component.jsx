import React from 'react'
import { IconButton, makeStyles, Drawer, Box, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import PersonIcon from '@material-ui/icons/Person';
import { useHistory, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil'
import { currentUserState } from '../recoil/atoms';

const useStyles = makeStyles((theme) => ({
    drawer: {

    },
    drawerPaper: {
        width: '300px',
    },
    drawerIcon: {
        position: 'absolute',
        right: 5,
        marginLeft: 'auto',
    },
    drawerHeader: {
        position: 'relative',
        textAlign: 'center',
        flexDirection: 'column',
        display: 'flex'
    },
    status: {
        marginTop: 2,
        fontSize: 12
    },
    divider: {
        margin: '6px 0 6px 0'
    },
    drawerContent: {
        display: 'flex',
        flexDirection: 'column'
    }

}))
function Sidebar({ toggle, drawer }) {
    const currentUser = useRecoilValue(currentUserState);
    const classes = useStyles();
    const history = useHistory();

    const handleClick = (path) => {
        toggle();
        history.push(path);
    }

    if (!currentUser) {
        // history.push('/')
        return null
    }

    return (
        <div>
            <Drawer className={classes.drawer} open={drawer} classes={{ paper: classes.drawerPaper }}>
                <Box className={classes.drawerHeader}>
                    <IconButton className={classes.drawerIcon} onClick={toggle}>
                        <ChevronLeftRoundedIcon />
                    </IconButton>
                    <Box mt={2}>
                        <PersonIcon fontSize="large" />
                    </Box>
                    <span className={classes.name}>{currentUser.name}</span>
                    <span className={classes.status}>{currentUser.status}</span>
                </Box>
                <Divider light className={classes.divider} />
                <Box className={classes.drawerContent}>
                    <List>
                        <ListItem button onClick={() => handleClick('/profile')}>
                            <ListItemText primary="Profile" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Matches" onClick={() => handleClick('/matches')} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Tournaments" onClick={() => handleClick('/tournaments')}/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Teams" onClick={() => handleClick('/teams')}/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Start a Match" onClick={() => handleClick('/startMatch')}/>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

        </div>
    )
}

export default Sidebar

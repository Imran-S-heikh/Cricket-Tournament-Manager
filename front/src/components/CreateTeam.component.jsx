import React from 'react'
import { TextField, makeStyles, Button, Box } from '@material-ui/core'
import { useState } from 'react'
import Axios from 'axios'

const useStyles = makeStyles(theme => ({
    root: {

    },
    title: {
        textAlign: 'center'
    },
    createTeamForm: {
        width: 400,
        margin: 'auto'
    }
}))



function CreateTeam() {
    const classes = useStyles()
    const [name,setName] = useState('');

    const handler = ()=>{
        Axios({
            method: 'POST',
            url: 'api/v1/teams',
            data: {name}
        }).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div>
            <h1 className={classes.title}>Create Team</h1>
            <div className={classes.createTeamForm}>
                <TextField fullWidth label="Team Name" onChange={e=>setName(e.currentTarget.value)} value={name} required />
                <Box mt={2}> 
                    <Button onClick={handler} fullWidth variant="contained">Create</Button>
                </Box>
            </div>
        </div>
    )
}

export default CreateTeam

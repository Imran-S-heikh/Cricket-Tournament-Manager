import 'date-fns';
import React from 'react'
import { useState } from 'react'
import Axios from 'axios'
import { makeStyles, Button, TextField, Box, Grid } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
    root: {
        // marginTop: 30
    },
    title: {
        textAlign: 'center'
    },
    createTournamentForm: {
        width: 500,
        margin: 'auto'
    }
}))


function CreateTournament() {
    const classes = useStyles();
    const [name, setName] = useState('Ekushe Tournament');
    const [firstPrize, setFirstPrize] = useState('i-phone 11');
    const [secondPrize, setSecondPrize] = useState('Samsung J2')
    const [thirdPrize, setThirdPrize] = useState('Nokia')
    const [manOfTheMatch, setManOfTheMatch] = useState('500')
    const [manOfTheTournament, setManOfTheTournament] = useState('6000')
    const [entryFee, setEntryFee] = useState(500);
    const [startDate, setStartdate] = useState();
    const [finalDate, setFinaldate] = useState();
    const [place, setPlace] = useState('Udaypur');
    const [time, setTime] = useState();


    const handler = () => {
        const data = {
            name,firstPrize,secondPrize,
            thirdPrize,manOfTheMatch,
            manOfTheTournament,entryFee,
            startDate,finalDate,place,time
        }
        Axios({
            method: 'POST',
            url: 'api/v1/tournaments',
            data
        }).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className={classes.root}>
            <h1 className={classes.title}>Create Tournament</h1>
            <div className={classes.createTournamentForm}>
                <TextField fullWidth label="Tournament Name"
                    onChange={e => setName(e.currentTarget.value)}
                    value={name} required
                />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Entry-Fee"
                            onChange={e => setEntryFee(e.currentTarget.value)}
                            value={entryFee} required type="number"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Vanue"
                            onChange={e => setPlace(e.currentTarget.value)}
                            value={place} required
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Man of The Match"
                            onChange={e => setManOfTheMatch(e.currentTarget.value)}
                            value={manOfTheMatch} required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Man of The Tournament"
                            onChange={e => setManOfTheTournament(e.currentTarget.value)}
                            value={manOfTheTournament} required
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <TextField fullWidth label="First Prize"
                            onChange={e => setFirstPrize(e.currentTarget.value)}
                            value={firstPrize} required
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth label="Second Prize"
                            onChange={e => setSecondPrize(e.currentTarget.value)}
                            value={secondPrize} required
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth label="Third Prize"
                            onChange={e => setThirdPrize(e.currentTarget.value)}
                            value={thirdPrize}
                        />
                    </Grid>
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <KeyboardDatePicker
                                margin="normal"
                                label="Start Date"
                                format="MM/dd/yyyy"
                                value={startDate}
                                onChange={d => setStartdate(d)}
                                required
                                KeyboardButtonProps={{
                                    'aria-label': 'change date'
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <KeyboardDatePicker
                                margin="normal"
                                label="Final Date"
                                value={finalDate}
                                required
                                onChange={d => setFinaldate(d)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date'
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <KeyboardTimePicker
                                margin="normal"
                                label="Start Time"
                                value={time}
                                required
                                onChange={t => setTime(t)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date'
                                }}
                            />
                        </Grid>
                    </Grid>
                </MuiPickersUtilsProvider>
                <Box mt={2}>
                    <Button onClick={handler} fullWidth variant="contained">Create</Button>
                </Box>
            </div>
        </div>
    )
}

export default CreateTournament

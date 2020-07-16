import React, { useEffect } from 'react'
import MatchCard from '../../components/MatchCard.component';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import { allMatchesState } from './matches.atom';
import { getAllMatches } from './matches.api';

const useStyles = makeStyles((theme)=>({
    root: {

    },
    link: {
        listStyle: 'none',
        textDecoration: 'none'
    }
}))

function Matches() {
    const classes = useStyles();
    const allMatches = useRecoilValue(allMatchesState);
    console.log(allMatches)

    useEffect(()=>{
        getAllMatches();
    },[])

    return (
        <div className={classes.root}>
            <Link className={classes.link} to="/match/39">
                <MatchCard/>
            </Link>
        </div>
    )
}

export default Matches

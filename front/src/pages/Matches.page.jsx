import React from 'react'
import MatchCard from '../components/MatchCard.component';
import { Link } from 'react-router-dom';

function Matches() {
    return (
        <div>
            <Link to="/match/39">
                <MatchCard/>
            </Link>
        </div>
    )
}

export default Matches

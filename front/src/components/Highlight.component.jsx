import React from 'react';
import { useStyles as scoreColor } from './PlayerScore.component';
import { v4 as uniqId } from 'uuid';
import { useRecoilValue } from 'recoil';
import { scoreState } from '../pages/match/match.atom';

function Highlight() {
    const classes = scoreColor();
    const score = useRecoilValue(scoreState);

    return (
        <div>
            {
                score.map(value =>
                    <span key={uniqId()}>
                        <span className={classes[value]}>{value}</span>
                        &nbsp; + &nbsp;
                    </span>
                )}
        </div>
    )
}

export default Highlight

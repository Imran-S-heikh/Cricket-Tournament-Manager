import React from 'react';
import { useStyles as scoreColor } from './PlayerScore.component';
import { v4 as uniqId } from 'uuid';

function Highlight({ score }) {
    const classes = scoreColor();
    
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

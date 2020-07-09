import React from 'react';
import { useStyles as scoreColor } from './PlayerScore.component';

function Highlight({ score }) {
    const classes = scoreColor();

    return (
        <div>
            {
                score.map(value =>
                    <span>
                        <span className={classes[value]}>{value}</span>
                        &nbsp; + &nbsp;
                    </span>
            )}
        </div>
    )
}

export default Highlight

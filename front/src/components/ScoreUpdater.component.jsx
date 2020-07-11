import React from 'react';
import { Button } from '@material-ui/core';
import { v4 as uniqId } from 'uuid';

function ScoreUpdater({updates,size,handler}) {
    return (
        <>
        {updates.map(el=>
            <Button key={uniqId()} data-score={el.type} variant="outlined" size={size} onClick={handler}>
                {el.value}
            </Button>)}
        </>
    )
}

export default ScoreUpdater

import React from 'react';
import { Box, Button } from '@material-ui/core';

function ScoreUpdater({updates,size,handler}) {
    return (
        <>
        {updates.map(el=>
            <Button data-score={el.type} variant="outlined" size={size} onClick={handler}>
                {el.value}
            </Button>)}
        </>
    )
}

export default ScoreUpdater

import React from 'react';
import { Grid } from '@material-ui/core';

function Home() {
    return (
        <Grid container>
            <Grid item sm={2} />
            <Grid item xs={12} sm={6}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam excepturi, minus ipsam doloribus odit error quibusdam veritatis, et iure eius voluptates temporibus quos placeat. Nemo molestiae repellendus aperiam ut reiciendis!
            </Grid>
            <Grid item sm={2} />
        </Grid>
    )
}

export default Home;

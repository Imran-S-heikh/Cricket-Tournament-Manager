import React from 'react'
import Profile from './Profile.page'
import { Drawer } from '@material-ui/core'

function Dashboard() {
    return (
        <div>
           <Drawer open={false}>
                <Profile/>
           </Drawer> 
        </div>
    )
}

export default Dashboard

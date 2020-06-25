import React from 'react'
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

function Account({user,id}) {
    // useEffect(() => {
    //     fetch(`/api/v1/players/${id}`).then((res) => {
    //         return res.json();
    //     }).then((player) => {
    //         handleUser({ ...player, loggedIn: true })
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // }, []);

    if (!user.loggedIn) {
        return <Redirect to="/login"/>
    }

    console.log(user)
    return (
        <div>
            <h1>{user.name}</h1>
        </div>
    )
}

export default Account

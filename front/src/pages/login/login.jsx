import React from 'react'
import { useState } from 'react';
import Input from '../../components/atoms/input/input.atom';
import { Redirect } from 'react-router-dom';

function Login({ user,handleUser }) {

    const [field,setField] = useState({email: 'player@gmail.com',password: '1234abcd'});

    if(user.loggedIn){
        return <Redirect to="/" />
    }

    const handleFields = ({target:{id,value}})=>{
        setField({
            ...field,
            [id]: value
        });
    };

    const handleSubmit = ()=>{
        fetch(`/api/v1/players/login`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'same-origin',
            body: JSON.stringify(field)
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            if(data.status === 'success'){
                handleUser({...data.player,loggedIn: true});
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    return (
        <div className="signup">
            <h3>Login To Your Account</h3>
            <div className="fields-container">
                <Input id="email" value={field.email} type="email" ph="email" label="Email Address" handler={handleFields} />
                <Input id="password" value={field.password} type="password" ph="password" label="Password" handler={handleFields} />
            </div>
            <button className="" onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Login;

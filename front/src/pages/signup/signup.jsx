import React from 'react';
import './signup.style.scss';
import { useState } from 'react';
import Input from '../../components/atoms/input/input.atom';
import { Redirect } from 'react-router-dom';


function Signup({user,handleUser}) {

    const [field,setField] = useState({
        name: 'Imran',
        email: 'player@gmail.com',
        home: 'mollahat',
        password: '1234abcd',
        confirmPassword: '1234abcd'
    });

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
        fetch('/api/v1/players/signup',{
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

    };

    return (
        <div className="signup">
            <h3>Signup for Account</h3>
            <div className="fields-container">
                <Input id="name" value={field.name} type="text" ph="name" label="Name" handler={handleFields} />
                <Input id="email" value={field.email} type="email" ph="email" label="Email Address" handler={handleFields} />
                <Input id="home" value={field.home} type="text" ph="Home" label="Home" handler={handleFields} />
                <Input id="password" value={field.password} type="password" ph="password" label="Password" handler={handleFields} />
                <Input id="confirmPassword" value={field.confirmPassword} type="password" ph="confirm password" label="Confirm Password" handler={handleFields} />   
            </div>
            <button className="" onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Signup;
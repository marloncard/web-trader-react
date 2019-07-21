import React from 'react';
import {Link} from 'react-router-dom'
import {isLoggedIn} from '../App.js'


export default function Navbar(props){
    if(isLoggedIn()){
        console.log("Logged In")
        return(
        // change to a class
            <nav className= "Navbar">
                <Link to= "/loggedin">Home</Link>
                <Link to= "/deposit">Deposit</Link>
                <Link to= "/trade">Trade</Link>
                <Link to= "/positions">Positions</Link>
                <button onClick={(event)=>{props.logout()
                /*this.foreUpdate() */
         }}
            >Log Out</button>
            </nav>
        );
    }
    else{
    return(
        
        <nav className= "Navbar">
            <Link to= "/">Home</Link>
            <Link to= "/lookup">Lookup</Link>
            <Link to= "/login">Login</Link>
            <Link to= "/register">Register</Link>
        </nav>
        
    );
    }
}
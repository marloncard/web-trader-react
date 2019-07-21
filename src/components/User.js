import React from 'react';
import {isLoggedIn} from '../App.js';



export default function User(props) {

    if (isLoggedIn()) {

        return (
            <div className="User">
                <h2>Welcome {window.sessionStorage.RealName}</h2>
                <p>Your balance is: {window.sessionStorage.Balance}</p>
                <p>Your API Key is: {window.sessionStorage.ApiKey}</p>
            </div>
        )
    } else {
        return (
            <div className="User">
                <h2>Please login</h2>
            </div>
        )
    }

    
}
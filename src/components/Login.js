import React from 'react'
import {Redirect} from 'react-router-dom';
import {isLoggedIn} from '../App.js'

export default class Login extends React.Component {

    state = {
        username : "",
        password : ""
    }
    render() {
    if (isLoggedIn()) {
        return <Redirect to="/" />
    }

    return (
        <div className= "Login">
            <form onSubmit={(event)=>{
                event.preventDefault()
                this.props.apiLogin(this.state.username, this.state.password)
            }}>
                <input 
                    id="username" 
                    name="username" 
                    placeholder="username" 
                    value={this.state.username}
                    onChange={(event)=> {
                        this.setState({
                            username : event.target.value
                            })
                        }}
                    />
                <input 
                    id="password" 
                    name="password" 
                    placeholder="password" 
                    value={this.state.password}
                    onChange={(event)=> {
                        this.setState({
                            password : event.target.value
                            })
                        }} 
                />
                <input type="submit" value="login" />

            </form>
                
        </div>
    )
}
}
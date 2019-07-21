import React from 'react';
import baseURL from './Util'


export default class Register extends React.Component {

    state ={
        real_name : "",
        user_name : "",
        password : "",
        confirmPassword : ""
    }

    handleSubmit = () => {
        const { password, confirmPassword } = this.state;
        if (password !== confirmPassword) {
            alert("Passwords don't match");
        } else {
            this.validateUser()
        }
    }

    validateUser = () => {
        const user_name = this.state.user_name;
        const endPoint = "check_user/"
        const promise = fetch(baseURL+endPoint+user_name, {
            method : "get",
            mode : "cors"
        })
        promise
            .then((response) => {
                if (response.status === 200) {
                    console.log("validateUser returns: " + response.status)
                    this.props.apiRegister(this.state.real_name, this.state.user_name, this.state.password)
                } else {
                    console.log("validateUser returns: " + response.status)
                    alert("User name already exists!")
                }
            })

    }

    render () {
        return (
            <div className="Register">
                <form onSubmit={(event)=>{
                    event.preventDefault();
                    this.handleSubmit();

                }}>
                    <div>
                    <input
                        id="real_name"
                        name="real_name"
                        placeholder="Enter your name"
                        value={this.state.real_name}
                        onChange={(event)=> {
                            this.setState({
                                real_name : event.target.value
                            })
                        }}
                    />
                    </div>
                    <div>
                    <input
                        id="user_name"
                        name="user_name"
                        placeholder="Enter user name"
                        value={this.state.user_name}
                        onChange={(event)=> {
                            this.setState({
                                user_name : event.target.value
                            })
                        }}

                    />
                    </div>
                    <div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter a password"
                        value={this.state.password}
                        onChange={(event)=> {
                            this.setState({
                                password : event.target.value
                            })
                        }}

                    />
                    </div>
                    <div id="confirmpw">
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Re-enter password"
                        value={this.state.confirmPassword}
                        onChange={(event)=> {
                            this.setState({
                                confirmPassword : event.target.value
                            })
                        }}

                    />
                    </div>

                    <input type="submit" value="Register" />

                </form>
            </div>
        )
    }
}
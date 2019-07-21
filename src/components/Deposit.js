import React from 'react';
import {isLoggedIn} from '../App.js';
import {Redirect} from 'react-router-dom';

export default  class Deposit extends React.Component {

    state = {
        amount : 0
    }

    render () {
        
        if (!isLoggedIn()) {
            return <Redirect to="/" />
        }
              
        return (
            <div className="Deposit">
                <form onSubmit={ (e) => {
                    e.preventDefault()
                    this.props.apiDeposit(this.state.amount)
                }}>
                    <h3>Make a Deposit:</h3>
                    <input
                        id="deposit"
                        name="deposit"
                        placeholder="Enter Deposit"
                        value={this.state.amount}
                        onChange={(e) => {
                            this.setState({
                                amount: e.target.value
                            })
                        }}
                    />
                    <input type="submit" value="Deposit" />

                </form>
            </div>
        )

        
    
    }

}
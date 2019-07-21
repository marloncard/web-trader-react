import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import baseURL from './components/Util'
import Placeholder from './components/Placeholder';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Deposit from './components/Deposit';
import User from './components/User';
import Register from './components/Register';


export function isLoggedIn(){
  return(
    window.sessionStorage.getItem("ApiKey") ? true : false
  )
}

export default class App extends React.Component {

  state = {
    real_name : "",
    balance : 0
  }

  //==================================
  apiRegister = (real_name, user_name, password) => {
    const endPoint = 'create_account'
    const promise = fetch(baseURL+endPoint, {
      method: "post",
      mode: "cors",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        real_name : real_name,
        user_name : user_name,
        password : password
      })
    })
    promise
      .then((response) => {
        if(response.status === 201) {

          console.log("Success")
        } else { console.log("Error")}
      })
  }
  //==================================
  apiLogin = (user_name, password)=> { 
    const endPoint = 'get_api_key';
    const promise = fetch(baseURL+endPoint, {
      method: "post",
      mode: "cors",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        user_name : user_name,
        password : password
      })
    })
    promise
      .then(blob => blob.json())
      .then(json => {
      console.log(json);
      if(json.api_key !== undefined){
        window.sessionStorage.setItem("ApiKey", json.api_key)
        this.getUser(json.api_key)
        this.forceUpdate()
        //this.getUser(json.api_key)
      } else {
        console.log("bad credentials")
      }
    }).catch(e=>{
      console.log("promise exceptions", e)
    })
    // window.sessionStorage.setItem("ApiKey",)
    
    this.forceUpdate()
    
  }
  //==================================
  logout= (event) => { 
    window.sessionStorage.setItem("ApiKey","")
    this.forceUpdate()
  }
  //==================================
  apiDeposit = (amount) => {
    const api_key = window.sessionStorage.ApiKey
    const endPoint = 'deposit/';
    const promise = fetch(baseURL+endPoint+api_key, {
      method: "post",
      mode: "cors",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        amount : Number(amount)
      })
    })
    console.log(promise)
    promise
      .then(blob => blob.json())
      .then(json => {
      console.log(json);
    }).catch(e=>{
      console.log("promise exceptions", e)
    })
    this.getUser(api_key)
  }
  //==================================
  getUser = (api_key) => {
    /* get the username, full name, and balance of the logged in user */
    // const api_key = this.getKey()
    const endPoint = 'account_info/'
    const promise = fetch(baseURL+endPoint+api_key, {
      method : "get",
      mode : "cors"
    })
    promise.then(blob=>blob.json()).then(json=>{
        window.sessionStorage.setItem("RealName", json["Real Name"])
        window.sessionStorage.setItem("Balance", json.Balance)
      // this.setState({
      //     real_name : json["Real Name"],
      //     balance : json.Balance
      //   })
        // console.log(json)
        this.forceUpdate()

    })

};
    

  render() {
    return (
    <BrowserRouter>
      <div className="App">
        
        <h1>
          Web Trader
        </h1>

         <Navbar logout = {this.logout} />          

        <Route exact path="/" 
        render = {(props)=> 
           <Placeholder {...props} message="Home" />          
        }
        />
       
        <Route exact path="/lookup" 
        render = {(props)=> <Placeholder {...props} message="Lookup" />} 
        />
        
        
        <Route exact path="/login" 
        render = {(props)=> <Login {...props} apiLogin={this.apiLogin} />} 
        />
      
 
        <Route exact path="/deposit" 
        render = {(props)=> <Deposit {...props} apiDeposit={this.apiDeposit} />}
        />

        <Route exact path="/trade" 
        render = {(props)=> 
           <Placeholder {...props} message="Trade" />
        }
        />
  
        <Route exact path="/positions" 
        render = {(props)=> 
           <Placeholder {...props} message="Positions" />
        }
        />

        <Route exact path="/register"
        render = {(props)=>
          <Register {...props} apiRegister={this.apiRegister}/>
        }
        />

        {/* {isLoggedIn() ? this.loggedIn : this.notLoggedIn} */}
        <User />
        
      </div>
    </BrowserRouter>
  );
  }
}
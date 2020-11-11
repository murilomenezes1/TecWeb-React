import React, { Component } from 'react'
import {Redirect, Route} from 'react-router-dom'
import Routes from './routes'
import logo from './logo-stockmernfit.png'

import axios from 'axios'




export default class Login extends Component{





	constructor(props){
		super(props)


		this.state = {user: 
				{username: '', password: ''}, 
				login: false}
		this.handleChange = this.handleChange.bind(this)
		this.login = this.login.bind(this)


	}


	render(){
		if (this.state.login===true){
			return(
				<Redirect to='/stocks'/>
				)
		}

		return(
			<div>
				<header><h1>stockMERN</h1></header>
				<ul>
					
						Username: <input name="username" 
										value={this.state.user.username}
										onChange={this.handleChange}/><br></br>
						Password: <input name="password" 
										value={this.state.user.password}	
										onChange={this.handleChange}/><br></br><br></br>



					<button onClick={this.login}> Login </button>
						<form action = 'https://stockmern-react.herokuapp.com/signup'>
					<input type="submit" value="Sign Up" />
						</form>
					</ul>



			</div>
			)
	}

		login(){
			console.log(this.state.user)
			axios.post('https://tecweb-demo.herokuapp.com/login', this.state.user).then(resp =>{
				if(Math.floor(resp.status/100)===2 && resp.data.login === true){
					this.setState((state) =>{
						return {
							user: {username: this.state.user.username, password: this.state.user.password},
							login: true
						}
					})
					return;
				}else{
					console.log("Invalid login.")
				}
			}).catch(erro => console.log(erro))
		}


		handleChange(event) {
			var handleState = (state, event) => {
				state.user[event.target.name] = event.target.value
				return state
			}
			this.setState(handleState(this.state, event))
			console.log(localStorage.getItem('user'))
		}
		}



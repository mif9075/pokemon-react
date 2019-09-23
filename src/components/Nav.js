import React, { Component } from 'react';
import { apiAuth } from '../api/api';
import { NavLink } from 'react-router-dom';

export default class Nav extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errorToggle: false,
            errorMessage: '',
            login: false,
            loggedInEmail: ''
        }


    } 

    handleLogOut = () =>{
      this.setState({
        login: false
    }, () => {

        this.props.appHandleAuth()
        localStorage.removeItem('jwtToken');
    })
        
  }

    handleInputOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })

    }

    handleInputSubmit = (event) => {
        event.preventDefault();
        apiAuth({
            email: this.state.email,
            password: this.state.password
        })
        .then(result =>{
            const { email } = result
            return this.props.appHandleHome(email)
        })
        .catch(error =>{
            console.log(error)
            let errorMessages = JSON.stringify(error.response.data.message) 
            this.setState({
                errorToggle: true,
                errorMessage: errorMessages
            })
        })
    }
    render() {
        return (
            <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light rounded mt-5">
            <NavLink className="navbar-brand" to='/'>Pokemon</NavLink>
				  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				    <span className="navbar-toggler-icon"></span>
				  </button>
				  <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {this.props.isAuth? (
               <>
				    <ul className="navbar-nav mr-auto">
				      <li className="nav-item active">
              <NavLink className="nav-link" to='/pokemons'>Pick Pokemons</NavLink>
				      </li>

				      <li className="nav-item">
                <NavLink className="nav-link" to='/my-team'>My Team</NavLink>
				      </li>
				    </ul>
            <ul className="nav navbar-nav navbar-right">
            <li className="nav-item">
               <p className="navbar-text">{this.props.email}</p>
              </li>
              <li className="nav-item">
           <p className="nav-link" onClick={this.handleLogOut}>Log-out</p>
           </li>
           </ul>
               </>
            ):(
              <>
              <ul className="nav navbar-nav ml-auto">
				    <form className="form-inline my-2 my-lg-0 " onSubmit={this.handleInputSubmit}>
				    	<div className="col-auto pl-0">
					      <div className="input-group">
					        <div className="input-group-prepend">
					          <div className="input-group-text"><i className="fa fa-user"></i></div>
					        </div>
					        <input type="text" id="login" className="fadeIn second" name="email" placeholder="Email" onChange={this.handleInputOnChange}></input>
					      </div>
					    </div>
					    <div className="col-auto pl-0">
					      <div className="input-group">
					        <div className="input-group-prepend">
					          <div className="input-group-text"><i className="fa fa-lock"></i></div>
					        </div>
					        <input type="text" id="password" className="fadeIn third" name="password" placeholder="password" onChange={this.handleInputOnChange}></input>
					      </div>
					    </div>
					    <div className="col-auto pl-0 pr-0">
				      		<button className="btn  btn-sm btn-outline-dark" type="submit">Login</button>
				      	</div>

				    </form>
            </ul>
            </>
             )}
				  </div>
                </nav>	
              
                

                <span
                 style={{padding: '0px'}}
                 className={this.state.errorToggle ? 'alert alert-danger' : ''}>
                 {this.state.errorToggle ? this.state.errorMessage : ''}
                </span>
                </>
        )
    }
}

import React, { Component } from 'react';
import Nav from './components/Nav';
import Home from './components/Home';
import Pokemons from './components/Pokemons';
import MyTeam from './components/MyTeam';
import { Switch, Route } from 'react-router-dom';
import { handleGetAllPokemons,
         checkToken
} from './api/api';


class App extends Component {
  constructor(props){
    super(props)
    this.state ={
      pokemons: [],
      isAuth: false,
      email: ''
    }
  }

  componentDidMount(){
    this.appHandleLocalStorage()
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.isAuth === false && this.state.isAuth === true){
      this.appHandleGetAllPokemons();
    }
  }

  appHandleLocalStorage = () =>{
    checkToken()
      .then(token =>{
        this.setState({
          isAuth: true,
          email: token.email
        })
      })
      .catch(error =>{
        this.setState({
          isAuth: false
        })
      })
    
  }

  appHandleHome=(email)=>{
    return(
      this.setState({
        isAuth: true,
        email: email
      })
    )
  }

  appHandleAuth= () =>{
      this.setState((prevState)=>{
        return {
            isAuth: !prevState.isAuth
        }
      })
    
  }


  appHandleGetAllPokemons = ()=>{
    handleGetAllPokemons()
      .then(pokemon => {
        const { data } = pokemon;
        this.setState({
          pokemons: data.results
        })
      })
      .catch(error =>{
        console.log(error)
      })
  }



  render() {
    return(
      <>
      <Nav appHandleHome={this.appHandleHome}
            isAuth = {this.state.isAuth}
            email ={this.state.email}
      />
      
      { 
        this.state.isAuth ? (
         
        <Switch>
        <Route exact path='/' render={()=>  <Home/>}/>
        <Route exact path='/pokemons' render={()=>< Pokemons
            pokemons ={this.state.pokemons}
            email = {this.state.email}
        />}/>
        <Route exact path='/my-team' render={()=><MyTeam email={this.state.email}/>}/>
      </Switch>
      ):(
        <h1>Must be logged in to learn more</h1>
        )
        }
      </>
    )
  }
}

export default App;
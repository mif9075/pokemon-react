import React, { Component } from 'react';
import { addPokemon } from '../api/api';
import { NavLink } from 'react-router-dom';


export default class Pokemon extends Component {
    handleAddPokemon = () =>{
      const { pokemon, email } = this.props
      addPokemon( email, pokemon.name, pokemon.sprites.front_default)
        .then(result =>{
          return result
        })
        .catch(error =>{
          console.log(error)
        })
    }
  
    render() {
        return (
                        <div className="col-auto mb-3">
                        <div className="card" >
                        <img className="rounded mx-auto d-block" src={this.props.pokemon.sprites.front_default} alt="error"></img>
                        <div className="card-body">
                          <h5 className="card-title">{this.props.pokemon.name}</h5>
                          <NavLink className="btn btn-sm btn-outline-dark" to='/my-team' onClick={this.handleAddPokemon}>I choose you!</NavLink>
                          <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Moves</th>
                        </tr>
                      </thead>
                      <tbody>
                          {
                        this.props.pokemon.abilities.map(ability =>{
                          return(
                            <tr>

                            <td>{ability.ability.name}</td>
                        </tr>
                          )
                          
                        })
                      }
                    
                      </tbody>
                      <thead>
                        <tr>
                          <th scope="col">Moves</th>
                        </tr>
                      </thead>
                      <tbody>
                          {
                        this.props.pokemon.moves.map(move =>{
                          return(
                            <tr>

                            <td>{move.move.name}</td>
                        </tr>
                          )
                          
                        })
                      }
                    
                      </tbody>

                    </table>
                        </div>
                      </div>
                    </div>
        )
    }
}

import React, { Component } from 'react';
import OriginalPokemons from './OriginalPokemons';
import Selected from './Pokemon';
import { handleGetEachPokemon } from '../api/api'

export default class Pokemons extends Component {
    constructor(props){
        super(props)
        this.state = {
            pokemon: {},
            selected: false,
            search: '',
            errorToggle: false,
            errorMessage: ''
        }
    }
    showOriginalPokemons =() =>{
        return this.props.pokemons.map((pokemon)=>{
            let id = pokemon.name
           return(
            < OriginalPokemons 
                key={id}
                id ={id}
                name ={pokemon.name}
                setSelectedPokemon = {this.setSelectedPokemon}
            />
           )
        })
    }
    setSelectedPokemon =(pokemon)=>{
        handleGetEachPokemon(pokemon)
            .then(selected =>{
                let {data} = selected
                this.setState({
                    pokemon: data,
                    selected: true,
                    errorToggle: false
                })

            })

            .catch(error =>{
                this.setState({
                    errorToggle: true,
                    errorMessage: 'Please enter Pokemon full name'
                })
            })
    }

    handleOnChangeInput = (event) => {
        this.setState({
            search: event.target.value
        })
    }

    handleSearchSubmit = (event) =>{
        event.preventDefault();
        this.setSelectedPokemon(this.state.search)

    }
    
    render() {
        return (
            <>
            <form onSubmit={this.handleSearchSubmit} >
            <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={this.handleOnChangeInput}></input>
            <button className="btn  btn-sm btn-outline-dark" type="submit">Search</button>
            </form>
            <span
                 style={{padding: '0px'}}
                 className={this.state.errorToggle ? 'alert alert-danger' : ''}>
                 {this.state.errorToggle ? this.state.errorMessage : ''}
            </span>
            {
                this.state.selected ? (
                    <Selected pokemon ={this.state.pokemon}
                              email ={this.props.email}
                    />
                ):(
                    <div className="row">
                    {this.showOriginalPokemons()}
                    </div>
                ) 
            }
            </>
        )
    }
}

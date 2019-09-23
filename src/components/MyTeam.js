import React, { Component } from 'react';
import Selected from './Pokemon';
import MyTeamPokemons from './MyTeamPokemons'
import { handleGetEachPokemon,
         showMyTeam
} from '../api/api'

export default class MyTeam extends Component {
    constructor(props){
        super(props)
        this.state = {
            pokemon: {},
            myTeam: [],
            selected: false,
            email: this.props.email
        }
    }

    componentDidMount(){
        this.handleGetMyTeam(this.state.email)
    }

    handleGetMyTeam = (email) =>{
        showMyTeam(email)
            .then(result =>{
                let { data } = result
                this.setState({
                    myTeam: data.pokemons
                })
            })
            .catch(error =>{
                console.log(error)
            })
    }

    renderMyTeam=() =>{
     this.state.myTeam.forEach((pokemon)=>{
           return(
            < MyTeamPokemons 
                key={pokemon.id}
                name ={pokemon.name}
                image ={pokemon.image}
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
                    selected: true
                })

            })

            .catch(error =>{
                console.log(error)
            })
    }
    
    render() {
        return (
            <>
            {
                this.state.selected ? (
                    <>
                    <p>back</p>
                    <Selected pokemon ={this.state.pokemon}
                              email ={this.props.email}
                    />
                    </>
                ):(
                    <div className="row">
                    {this.renderMyTeam()}
                    </div>
                ) 
            }
            </>
        )
    }
}

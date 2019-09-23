import React, { Component } from 'react';


export default class OriginalPokemons extends Component {
    constructor(props){
        super(props)
        this.state = {
            pokemon: this.props.name,
            selected: false,
        }
    }
    handleMoreInfo = () =>{
        this.props.setSelectedPokemon(this.state.pokemon)
    }

    render() {
        const{
            id,
            name,
            image
        } = this.props
        return (
            <div className="col-sm-3 py-3" key ={id}>
                <div className="card" >
                <img className="card-img-top" src={image} alt="Card cap"></img>
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <button className="btn  btn-sm btn-outline-dark" onClick={this.handleMoreInfo}>More Info</button>
                    </div>
                </div>
            </div>
        )
    }
}

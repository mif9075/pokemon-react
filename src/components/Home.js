import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Home extends Component {
    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-4">Welcome Pokemon Master!</h1>
                 <p className="lead">Begin Creating Your Own Team Deck!</p>
                <hr className="my-4"></hr>
                <p>You can begin picking your Pokemon through the Original 151 or seach by name</p>
                <p>But be careful who you choose, once a team, always a team!</p>
                <NavLink className=" btn btn-sm btn-outline-dark" to='/pokemons'> Begin Your Journey</NavLink>
            </div>
        )
    }
}

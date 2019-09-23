import { Axios } from './Axios';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const handleGetAllPokemons =()=>{
    return new Promise((resolve, reject)=>{
        axios.get(`http://pokeapi.co/api/v2/pokemon/?limit=151`)
            .then(pokemon =>{
                resolve(pokemon)
            })
            .catch(error=>{
                reject(error)
            })
    })
}

const handleGetEachPokemon = (pokemon) =>{
        return new Promise((resolve,reject)=>{
            axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then(pokemon=>{
                resolve(pokemon)
            })
            .catch(error=>{
                reject(error)
            })
        })
}

const apiAuth = (email, password) =>{
    return new Promise((resolve, reject)=>{
        Axios.post('/users/sign-up-and-sign-in', {
            email,
            password
        })
        .then(results => {
            let { token }= results.data
            const decodedToken = jwt_decode(token)
            resolve(decodedToken)
        })
        .catch(error =>{
            reject(error)
        })
    })
}
const checkToken = () =>{
    return new Promise((resolve, reject) => {
        let token = localStorage.getItem('jwtToken');
        if (token) {
        
            let decodedToken = jwt_decode(token);
            let currentDate = Date.now() / 1000;
        
            if(decodedToken.exp < currentDate) {

                localStorage.removeItem('jwtToken')
                reject(null)

            } else {

                let user = {
                    id: decodedToken.id,
                    email: decodedToken.email
                }
                resolve(user)
            }
        } else {
            reject('Log in to use this')
        }
    })
}

const addPokemon = (email, name, img) =>{
    return new Promise((resolve, reject)=>{
        Axios.post('/teams/add-new-member', { email, name, img })
            .then(result =>{
                resolve(result)
            })
            .catch(error =>{
                reject(error)
            })
    })
}
const showMyTeam = (email) =>{
    return new Promise((resolve, reject)=>{
        Axios.get(`/teams/my-team/${email}`)
            .then(result =>{
                resolve(result)
            })
            .catch(error=>{
                reject(error)
            })
    })
}

export {
    handleGetAllPokemons,
    apiAuth,
    checkToken,
    handleGetEachPokemon,
    addPokemon,
    showMyTeam
}
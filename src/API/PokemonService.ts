import axios from "axios";
import { IAbility, IPokemon, IPokemons } from "../interfaces/interfaces";

export default class PokemonService {    

    static async  getAll(limit:number = 20, currentPage:number = 1) {
        const response = await axios.get<IPokemons>('https://pokeapi.co/api/v2/pokemon', {
            params: {
                limit: limit,
                offset: limit*(currentPage-1)
            }
        })        
        return response.data
    } 

    static async getOne(name:string) {
        const response = await axios.get<IPokemon>('https://pokeapi.co/api/v2/pokemon/'+ name);
        return response.data   
    }    

 

    static async getImage(id:number) {
        const response = await axios.get<string>(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,{
                responseType: 'arraybuffer',
            })        
        return response
    }
      
    static async getAbility(abilityName:string) {
        const response = await axios.get<IAbility>(`https://pokeapi.co/api/v2/ability/${abilityName}`)
        return response.data
    }
}
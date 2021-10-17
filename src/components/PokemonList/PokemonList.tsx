import { FC } from 'react';
import { IPokemonsItem } from '../../interfaces/interfaces';
import PokemonCard from '../PokemonCard/PokemonCard';
import cl from './PokemonList.module.scss';

interface PokemonListProps{
    pokemons: IPokemonsItem[]
}

const Pokemonlist: FC<PokemonListProps> = ({pokemons}) => {    

    if (!pokemons.length) {
        return (
            <h2>No pokemons here!</h2>
        )
    }

   return (
    <ul className={cl.pokemonList__list}>               
        {pokemons.map((pokemon, index) => {
            return (
                <li key={pokemon.name} >                    
                    <PokemonCard  
                        name={pokemon.name}
                        index={index}
                    />                                      
                </li>   
            ) 
        })}       
    </ul>
   )
}

export default Pokemonlist;

import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { Link } from "react-router-dom"
import PokemonService from "../../API/PokemonService"
import Container from "../../components/Container/Container"
import Loader from "../../components/Loader/Loader"
import { useFetching } from "../../hooks/useFetching"
import pokePlug from '../../img/pokeball.png'
import { IPokemon } from "../../interfaces/interfaces"
import cl from './PokemonPage.module.scss'

interface IPokemonParams {
    name: string
}

const PokemonPage = () => {
    const params: IPokemonParams = useParams()
    const [pokemon, setPokemon] = useState<IPokemon>()
    const [pokemonImg, setPokemonImg] = useState<string>('empty')
    const [getPokemon, isPokemonLoading, pokemonGettingError] = useFetching(async() => {
        const response = await PokemonService.getOne(params.name)   
        setPokemon(response)     
        if (response !== undefined) {
            
            let img = response.sprites.other["official-artwork"].front_default
            img===null ? setPokemonImg(pokePlug) : setPokemonImg(img)            
        } 
    })
    const router = useHistory()

    useEffect(()=> {
        getPokemon()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (     
        <Container title={params.name}>   
            <div className={cl.pokemonPage}>
                {
                    isPokemonLoading
                        ?   <Loader />
                        :   pokemonGettingError
                            ?   <h1>Sory, something went wrong... {pokemonGettingError}</h1>
                            :   pokemon!==undefined
                                ?   <div className={cl.pokemonPage__wrapper}>
                                        <div className={cl.pokemonPage__innerWrapper}>
                                            <div className={cl.pokemonPage__imageWrapper}>
                                                <img src={pokemonImg}
                                                    alt={params.name} 
                                                    width="500"
                                                    height="500"
                                                />
                                            </div>
                                            <div className={cl.pokemonPage__pokemonDescription}>    
                                                <ul className={cl.pokemonPage__pokemonCharacteristics} >
                                                    {pokemon.stats.map(characteristic => {
                                                        return(
                                                            <li key={characteristic.stat.name}>
                                                                <span>{characteristic.stat.name}</span>
                                                                <span>{characteristic.base_stat}</span>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                                <ul className={cl.pokemonPage__pokemonTypes}>
                                                    {pokemon.types.map((typesElement) => {
                                                        return(
                                                            <li key={typesElement.type.name}>
                                                                <span>{typesElement.type.name}</span>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                                <ul className={cl.pokemonPage__pokemonAbilities}>
                                                    {pokemon.abilities.map(abilitiesItem => {
                                                        return(
                                                            <li 
                                                                key={abilitiesItem.ability.name} 
                                                                onClick={()=> {
                                                                    router.push(`/pokemons/${params.name}/${abilitiesItem.ability.name}`)
                                                                }} >
                                                                <span>{abilitiesItem.ability.name}</span>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                    <Link style={{textAlign:'center'}} to='/main'>back to Pokemons!</Link>
                                </div> 
                                : <h1>Sory, something went wrong...</h1>      
                }
            </div>
        </Container>
    );
}

export default PokemonPage;

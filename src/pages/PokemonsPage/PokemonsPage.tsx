import { useContext, useEffect, useState } from "react";
import PokemonService from "../../API/PokemonService";
import Container from "../../components/Container/Container";
import Loader from "../../components/Loader/Loader";
import Pagination from "../../components/Pagination/Pagination";
import Pokemonlist from "../../components/PokemonList/PokemonList";
import { AppContext } from "../../context/AppContext";
import { useFetching } from "../../hooks/useFetching";
import { IPokemons } from "../../interfaces/interfaces";
import cl from './PokemonsPage.module.scss'

const PokemonsPage = () => {
    const {pokemons, setPokemons, currentPage, cardsPerView} = useContext(AppContext); 
    const [totalCount, setTotalCount]= useState<number>(0);  
    
    const useFetchingArray:[()=>void, boolean, string] = useFetching(async () => {
      const response : IPokemons = await PokemonService.getAll(cardsPerView, currentPage);
      const totalCount = response.count;
      setTotalCount(totalCount)
      setPokemons(response.results)
    })    
    const [fetchPokemons, isPokemonsLoading, pokemonLoadingError] = useFetchingArray

  useEffect(()=> {
    fetchPokemons()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])
    
    return (   
      <Container title="pokeDex">              
        <div className={cl.PokemonsPage}>      
  
          <div className={cl.PokemonsPage__pagination}>
            {((isPokemonsLoading && !pokemons.length) || pokemonLoadingError)
              ? <div></div>
              : <Pagination 
                  totalCount={totalCount} 
                />
            }
              
          </div> 
  
          <div className={cl.pokemonList__wrapper}>
              {
                isPokemonsLoading 
                  ? <Loader />
                  : pokemonLoadingError 
                    ? <h2 style={{textAlign: 'center'}}>Error! {pokemonLoadingError} </h2>
                    : <Pokemonlist pokemons={pokemons} />
              }            
          </div>   
        </div> 
      </Container>
    )
};

export default PokemonsPage
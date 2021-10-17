import { useContext, useEffect, useState, FC } from "react";
import { useHistory } from "react-router-dom";
import { buildDataUrlImg, getPokemonId } from "../../utils/utils"
import cl from "./PokemonCard.module.scss";
import { useFetching } from "../../hooks/useFetching";
import PokemonService from "../../API/PokemonService";
import pokePlug from '../../img/pokeball.png'
import Loader from "../Loader/Loader";
import { AppContext } from "../../context/AppContext";

interface IPokemonCardProps {
    name: string
    index: number
}

const PokemonCard: FC<IPokemonCardProps> =  ({name ,index}) => {    
    const {currentPage, cardsPerView} = useContext(AppContext);
    const router = useHistory();
    const  PokemonName = name[0].toUpperCase() + name.slice(1); 
    const [pokemonImg, setPokemonImg] = useState<string>('');
    const [fetchImage, isImageLoading, imageLoadingError] = useFetching(async()=> {   
        const pokemonId = getPokemonId(currentPage,cardsPerView, index)
        const response = await PokemonService.getImage(pokemonId)        
        const result = (response.data) 
            ?   buildDataUrlImg(response.data)
            :   pokePlug          
        setPokemonImg(result)
    })    
    
    useEffect(()=> {        
        fetchImage();        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

   
    return (
        <div className={cl.pokemonCard} onClick={()=> {
            router.push(`/pokemons/${name}`)
        }}>
            {isImageLoading
                ?   <Loader />
                :   <div className={cl.pokemonCard__imageWrapper}>
                        <img src= {
                            imageLoadingError
                                ?   pokePlug
                                :   pokemonImg
                        }
                            alt={PokemonName} 
                            width="250"
                            height="250"
                        />
                    </div>
                
            }            
            <h2>{PokemonName}</h2>
        </div>
    );
}

export default PokemonCard;

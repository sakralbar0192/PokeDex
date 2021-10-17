import { createContext } from "react";
import { IContext } from "../interfaces/interfaces";


const defaultState: IContext = {
    pokemons: [],
    setPokemons: ()=>{},
    currentPage: 1,
    setCurrentPage: ()=>{},
    cardsPerView: 0
}

export const AppContext = createContext<IContext>(defaultState);
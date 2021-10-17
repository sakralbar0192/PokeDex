import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { IContext, IPokemonsItem } from "./interfaces/interfaces";
import AppRouter from "./router/AppRouter";


function App() {
  const CARDS_PER_VIEW = 20;
  const [pokemons, setPokemons] = useState<Array<IPokemonsItem>>([]);   
  const [currentPage, setCurrentPage] = useState<number>(1)

  const contextValue: IContext = {
    pokemons: pokemons,
    setPokemons: setPokemons,
    currentPage: currentPage,
    setCurrentPage: setCurrentPage,
    cardsPerView: CARDS_PER_VIEW
  }

  return (
    <AppContext.Provider value={contextValue}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
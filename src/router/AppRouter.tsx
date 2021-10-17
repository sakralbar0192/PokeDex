import { Route, Redirect, Switch } from "react-router-dom";
import PokemonPage from "../pages/PokemonPage/PokemonPage";
import PokemonsPage from "../pages/PokemonsPage/PokemonsPage";
import  AbilityPage from '../pages/AbilityPage/AbilityPage';

const AppRouter = () => {
    return (   
        <Switch>
            <Route exact path="/pokemons">
                <PokemonsPage />
            </Route> 
            <Route exact path="/pokemons/:name">
                <PokemonPage />
            </Route> 
            <Route exact path="/pokemons/:name/:ability">
                <AbilityPage />
            </Route>
            <Redirect to='/pokemons'/>
        </Switch>            
    )
}

export default AppRouter;
 
import { useEffect } from 'react';
import { useState } from 'react';
import PokemonService from '../../API/PokemonService';
import { useFetching } from '../../hooks/useFetching';
import { useParams, useHistory } from 'react-router-dom';
import cl from './AbilityPage.module.scss'
import Container from '../../components/Container/Container';
import Loader from '../../components/Loader/Loader';

interface IPokemonAbilityParams {
    name: string
    ability: string
}

const AbilityPage = () => {
    const DESCRIPTION_LANGUAGE = 'en'
    const [abilityDescription, setAbilityDescription] = useState('')
    const params: IPokemonAbilityParams = useParams()    
    const [fetchAbility, isAbilityLoading, abilityLoadingError] = useFetching(async ()=> {
        const response = await PokemonService.getAbility(params.ability);        
        const entries = response.effect_entries
        const entryInRequiredLanguage =  entries.find(entry => {
            return entry.language.name === DESCRIPTION_LANGUAGE
        })
        entryInRequiredLanguage 
            ? setAbilityDescription(entryInRequiredLanguage.effect) 
            : setAbilityDescription('Sory there is no description in your language for current ability')
    })

    const router = useHistory()

    useEffect(()=> {
        fetchAbility()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    
    return (
        <Container title={params.ability}>
            <div className={cl.ability} >
                {
                    isAbilityLoading 
                        ? <Loader />
                        : abilityLoadingError
                            ?   <p>Sory, something went wrong... {abilityLoadingError}</p>
                            :   <p className={cl.ability}>
                                    {abilityDescription}
                                </p>
                }
            
                <button onClick={()=>{router.push(`/pokemons/${params.name}`)}}>back to Pokemon!</button>
            </div>
            
        </Container>
    );
}

export default AbilityPage;

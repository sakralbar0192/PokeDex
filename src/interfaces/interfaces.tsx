export interface IPokemonsItem {
    readonly name: string
    readonly url: string
}

export interface IPokemons {
    results: IPokemonsItem[]
    count: number
}

export interface IPokemon {
    abilities: {
        ability: {
            name: string
        }        
    }[]
    stats: {
        base_stat: number
        stat: {
            name: string
        }
    }[]
    types: {
        type: {
            name: string
        }
    }[]
    sprites: {
        other: {
            'official-artwork': {
                front_default: string|null
            }
        }
    }
}

export interface IAbility {
    effect_entries: {
        effect: string
        language: {
            name: string
        }
    }[]
}

export interface IContext {
    pokemons: IPokemonsItem[]
    setPokemons: (array : IPokemonsItem[]) => void
    currentPage: number
    setCurrentPage: (n:number) => void
    cardsPerView: number
}
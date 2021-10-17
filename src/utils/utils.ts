export function getPokemonId(
    currentPage:number,
    CardsPerView:number, 
    index:number
) : number {
    let pokemonId = (currentPage-1)*CardsPerView + index+1
    if (pokemonId > 898) {
        pokemonId = 10000+ pokemonId - 898
    }
    return pokemonId
}

export function buildDataUrlImg (data: string): string {
    const result = `data:image/png;base64, ${Buffer.from(data, 'binary').toString('base64')}`
    return result
}

export function findOutTotalPages(
    totalCount: number, 
    CardsPerView: number
): number {
    const result = Math.ceil(totalCount/CardsPerView);
    return result;
}


  
export function getPagination(
    currentPage:number, 
    pageCount:number
):Array<number|string>{
    function getRange(
        start:number, 
        end:number
    ): number[] {
        return Array(end - start + 1).fill(null).map((v, i) => i + start)
    }

    let delta:number
    if (pageCount <= 7) {
        // delta === 7: [1 2 3 4 5 6 7]
        delta = 7
    } else {
        // delta === 2: [1 ... 4 5 6 ... 10]
        // delta === 4: [1 2 3 4 5 ... 10]
        delta = currentPage > 4 && currentPage < pageCount - 3 ? 2 : 4
    }

    const range = {
        start: Math.round(currentPage - delta / 2),
        end: Math.round(currentPage + delta / 2)
    }

    if (range.start - 1 === 1 || range.end + 1 === pageCount) {
        range.start += 1
        range.end += 1
    }

    let pages: Array<number|string> =
        currentPage > delta
            ? getRange(Math.min(range.start, pageCount - delta), Math.min(range.end, pageCount))
            : getRange(1, Math.min(pageCount, delta + 1))

    const withDots = (value:number, pair:Array<number|string>) => (pages.length + 1 !== pageCount ? pair : [value])

    if (pages[0] !== 1) {
        pages = withDots(1, [1, '...']).concat(pages)
    }

    if (pages[pages.length - 1] < pageCount) {
        pages = pages.concat(withDots(pageCount, ['...', pageCount]))
    }
    return pages
}

export function findAverageIntegerValue(x:number|string, y: number|string): number {
    return Math.trunc((Number(x)+Number(y))/2)    
}



import { FC, useContext } from 'react'
import { useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { findAverageIntegerValue, findOutTotalPages, getPagination } from '../../utils/utils'
import cl from './Pagination.module.scss'

interface IPagintionProps {
    totalCount: number
}

const Pagination: FC<IPagintionProps> = ({totalCount}) => {    
    const {cardsPerView, currentPage, setCurrentPage} = useContext(AppContext);
    const [pagination, setPagination] = useState(getPagination(currentPage, totalCount))

    useEffect(()=> {
        setPagination(getPagination(currentPage, findOutTotalPages(totalCount, cardsPerView)))
    }, [currentPage, totalCount, cardsPerView])

    if (!pagination.length) {
        return (
            <div></div>
        )
    } 
    
    return (
        <ul className={cl.pagination}>
        {pagination.map((page, index) => {
                            
            return (                
                <li 
                    key={
                        page !== '...' 
                            ? page
                            : pagination[index+1] !== undefined 
                                ?   findAverageIntegerValue(pagination[index-1], pagination[index+1])
                                :   index+1
                                                       
                    } 
                    className={
                        page===currentPage 
                            ? cl.active 
                            : ''
                    }
                > 
                <button
                    onClick={()=> {
                        if (page !== '...') {
                            setCurrentPage(Number(page))
                        } else {
                            setCurrentPage(findAverageIntegerValue(pagination[index-1], pagination[index+1]))
                        }                                        
                }}>{page}</button>
              </li>
            )
          })
        }
      </ul> 
    );
}

export default Pagination;

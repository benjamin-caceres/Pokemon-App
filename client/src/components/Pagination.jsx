import React from 'react'
import '../styles/components/Pagination.css';


const Pagination = ({ pokemonPerPage, totalPokemon, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPokemon / pokemonPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='pagination-style'>
            {
                pageNumbers.map(number => (
                    <button  key={number} onClick={() => paginate(number)}>{number}</button>
                ))
            }
        </div>
    )
}

export default Pagination;

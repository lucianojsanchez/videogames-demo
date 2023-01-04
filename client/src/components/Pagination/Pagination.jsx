import React from 'react';
import style from "./Pagination.module.css"


const Paginado = ({ gamesPerPage, allGames, paginado }) => {
    const pageNumbers = [] //declaro un arreglo vacio

    for (let i = 1; i <= Math.ceil(allGames / gamesPerPage); i++) { //todos los videojuegos dividido los videojuegos por pag que quiero
        pageNumbers.push(i)   //lo guardo en pageNumbers
    }
    return (
        <div className={style.pagination_container}>
            {pageNumbers && pageNumbers.map(number => (
                <a key={number} href onClick={() => paginado(number)}>{number}</a>
            ))}
        </div>
    )
}

export default Paginado

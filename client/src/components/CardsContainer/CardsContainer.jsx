import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import {
    getGames,
    getGenres,
    getPlatforms,
    filterGameByGenre,
    filterByCreatedAt,
    sortByName,
    sortByRating
} from '../../redux/actions.js';
import Card from '../Card/Card';
import style from "./CardsCointainer.module.css"
import Paginado from '../Pagination/Pagination';
import Loading from '../Loading/Loading.jsx';
import NavBar from "../NavBar/NavBar"


const CardContainer = () => {

    const dispatch = useDispatch()                 //lo de aca abajo me trae del reduce el estado videogames
    const allGames = useSelector((state) => state.videogames) // con useSelector hago q me traiga todo lo q está en el estado de videogame y lo guardo en esa constante
    const [order, setOrder] = useState('') //estado local de asc y desc que arranca vacio
    const [currentPage, setCurrentPage] = useState(1)
    const [gamesPerPage, setGamesPerPage] = useState(15)

    const indexOfLastGame = currentPage * gamesPerPage // 15
    const indexOfFirstGame = indexOfLastGame - gamesPerPage // 0
    const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame)//videogames de la pagina actual


    const paginado = (pageNumber) => {   //me va a ayudar al renderizado
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getPlatforms());
        dispatch(getGames());
    }, [dispatch]);


    const handleFilterGenre = (e) => {
        e.preventDefault();
        dispatch(filterGameByGenre(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    };

    const handleFilterCreated = (e) => {
        e.preventDefault();
        dispatch(filterByCreatedAt(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    };

    const handleNameSort = (e) => {
        e.preventDefault();
        dispatch(sortByName(e.target.value)) // value en selection
        setCurrentPage(1);
        setOrder(e.target.value); // estado local modificado que me triggerea el renderizado del setcurrentpage
    };

    const handleRatingSort = (e) => {
        e.preventDefault();
        dispatch(sortByRating(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    }


    // function handleClick(e) {
    //     e.preventDefault();       //prevent default para q no rompa cdo recarga la pagina, o evita q recargue, no entendi bien
    //     dispatch(getVideogames());
    // };


    return (
        <div className={style.background}>
            <NavBar
                handleFilterCreated={handleFilterCreated}
                handleFilterGenre={handleFilterGenre}
                handleNameSort={handleNameSort}
                handleRatingSort={handleRatingSort}
            />
            <div className={style.cardsContainer} >
                {
                    currentGames.length ? currentGames.map((videogames) => {
                        return (
                            <div >
                                <Card
                                    id={videogames.id}
                                    name={videogames.name}
                                    image={videogames.image}
                                />
                            </div>
                        )
                    }
                    ) :
                        <Loading />
                }
            </div>
            <div className={style.paginado}>
                <Paginado
                    gamesPerPage={gamesPerPage}
                    allGames={allGames.length}
                    paginado={paginado}
                />
            </div>
        </div>
    )
}

export default CardContainer
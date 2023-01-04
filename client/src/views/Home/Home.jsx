
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import Loading from "../../components/Loading/Loading";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import {
    getGames,
    getGenres,
    getPlatforms,
} from "../../redux/actions"
import Header from "../../components/Header/Header";
//  function handleClick(e) {
//    e.preventDefault()
//    dispatch(getGames)
//  }


const Home = () => {
    const dispatch = useDispatch()                 //lo de aca abajo me trae del reduce el estado videogames
    const allGames = useSelector((state) => state.videogames) // con useSelector hago q me traiga todo lo q está en el estado de videogame y lo guardo en esa constante

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getPlatforms());
        dispatch(getGames());
    }, [dispatch]);



    if (!allGames.length) {
        return <Loading />;
    }

    return (
        <div>
            <div>
                <Header />
            </div>
            <div>
                <CardsContainer />
            </div>
        </div >
    )
}

export default Home;



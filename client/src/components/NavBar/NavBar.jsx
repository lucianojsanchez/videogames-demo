import React from "react";
import { useSelector } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import style from "../NavBar/NavBar.module.css"




const NavBar = ({ handleFilterGenre, handleFilterCreated, handleNameSort, handleRatingSort }) => {
    const allGenres = useSelector((state) => state.genres) // accedo al estado para sacar mapear mis datos y luego los pongo en mi value


    return (
        <div className={style.background}>
            <SearchBar />
            <section>
                <select onChange={e => handleNameSort(e)}>
                    <option>Order</option>
                    <option value='asc'>A-Z</option>
                    <option value='dec'>Z-A</option>
                </select>
                <select onChange={e => handleRatingSort(e)}>
                    <option>Rating</option>
                    <option value='Highest to Lowest Rating'>Higher Rating</option>
                    <option value='Lowest to Highest Rating'>Lower Rating</option>
                </select>
                <select onChange={e => handleFilterCreated(e)}>
                    <option value='All'>All - Games</option>
                    <option value='DB'>Created</option>
                    <option value='api'>Existent</option>
                </select>
                <select onChange={e => handleFilterGenre(e)}>
                    <option value="All">All - Genres</option>
                    {allGenres.map((e) => {
                        return (
                            <option value={e.name} key={e.id}>{e.name}</option>
                        )
                    })}
                </select>
            </section>
        </div>
    )
}

export default NavBar
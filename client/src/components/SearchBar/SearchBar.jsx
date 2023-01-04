import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getGameName } from "../../redux/actions";
import style from "../SearchBar/SearchBar.module.css"
import search from "../../img/search.png"

const SearchBar = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    const handleInputChange = (e) => {
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getGameName(name))
        setName("") // estado local
    }

    return (
        <div className={style.search_bar}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type='text'
                    value={name}
                    placeholder='Search a Videogame...'
                    onChange={(e) => handleInputChange(e)}
                />
                <button type='submit'><img src={search} alt="search" /></button>
            </form>
        </div>
    )
}

export default SearchBar;
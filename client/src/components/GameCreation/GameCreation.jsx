import { React, useEffect, useState } from "react";
import { getPlatforms, getGenres, postVideogame } from "../../redux/actions.js";
import { useSelector, useDispatch } from "react-redux";
import Header from "../Header/Header.jsx";
import style from "../GameCreation/GameCreation.module.css"
import iconDel from "../../img/delete.png"


const VideogameCreate = () => {
    const dispatch = useDispatch()
    const genres = useSelector((state) => state.genres)
    const platforms = useSelector((state) => state.platforms)
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        //value
        name: "",
        description: "",
        released: "",
        image: "",
        rating: "",
        genres: [],
        platforms: []
    })

    const validations = (input) => {
        const errors = {};
        if (!input.name) {
            errors.name = "A name is required"
        } else if (input.name.length > 70) {
            errors.name = "Name is too long"
        } if (!input.description) {
            errors.description = "A description is required"
        } else if (input.description.length < 10) {
            errors.description = "At least 10 characters are required"
        } if (!input.released) {
            errors.released = "A release date is required"
        } if (!input.genres > 1) {
            errors.genres = "At least one genre is required "
        } if (!input.platforms > 1) {
            errors.platforms = 'At least one platform is required'
        } if (!input.image) {
            errors.image = 'A image is required!'
        }
        if (!input.rating) {
            errors.rating = 'Rating is required'
        } else if (input.rating > 5) {
            errors.rating = 'Only rates from 1 to 5 are allowed!'
        }
        return errors;
    }

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validations({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleSelectGenre = (e) => {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value],
        })
        setErrors(validations({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleSelectPlatform = (e) => {
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
    };

    const handleDeleteGenre = (el) => {
        setInput({
            ...input,
            genres: input.genres.filter(gen => gen !== el)
        })
    }

    const handleDeletePlatforms = (el) => {
        setInput({
            ...input,
            platforms: input.platforms.filter(pl => pl !== el)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(
            validations({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
        if (Object.keys(errors).length === 0) {
            dispatch(postVideogame(input));
            alert('VIDEOGAME CREATED');
            setInput({
                name: '',
                description: '',
                released: '',
                rating: '',
                image: '',
                genres: [],
                platforms: []
            })
        } else {
            alert('ERROR: VIDEO GAME CANNOT BE CREATED!');
            return;
        }
    }

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getPlatforms())
    }, [dispatch])

    return (
        <div>
            <div className={style.container}>
                <Header />
                <h1 className={style.videogame}>Create your Videogame</h1>
                <div className={style.form}>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <label className={style.label}>Name:</label>
                            <input className={style.input}
                                placeholder='Videogame Name'
                                maxlength={71}
                                type='text'
                                value={input.name}
                                name='name'
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.name && (
                                <p className={style.error}>{errors.name}</p>
                            )}
                        </div>
                        <div>
                            <label className={style.label}>Image:</label>
                            <input className={style.input}
                                placeholder="https://image.com/img/gameimage.jpg"
                                type="url" required // me ahorro validar por regex o crear otra funcion validadora
                                value={input.image}
                                name='image'
                                alt='not found'
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.image && (
                                <p className={style.error}>{errors.image}</p>
                            )}
                        </div>
                        <div>
                            <label className={style.label}>Description:</label>
                            <input className={style.input}
                                placeholder='Description'
                                minLength={9}
                                type='text'
                                value={input.description}
                                name='description'
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.description && (
                                <p className={style.error}>{errors.description}</p>
                            )}
                        </div>
                        <div className={style.released_container}>
                            <label className={style.label}>Released:</label>
                            <input className={style.released_input}
                                type='date'
                                value={input.released}
                                name='released'
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.released && (
                                <p className={style.error}>{errors.released}</p>
                            )}
                            <label className={style.label}>Rating:</label>
                            <input className={style.rating_input}
                                placeholder='0 to 5'
                                type='number'
                                value={input.rating}
                                min={0}
                                max={5}
                                name='rating'
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.rating && (
                                <p className={style.error}>{errors.rating}</p>
                            )}
                        </div>
                        <div className={style.genres_container}>
                            <label className={style.label}>Genres:</label>
                            <select className={style.genres_input} onChange={(e) => handleSelectGenre(e)}>
                                {genres.map(g => (
                                    <option key={g.name} value={g.name}>{g.name}</option>
                                ))}
                            </select>
                        </div>
                        {errors.genres && (
                            <p className={style.error}>{errors.genres}</p>
                        )}
                        <div className={style.platforms_container}>
                            <label className={style.label}>Platforms:</label>
                            <select className={style.platforms_input} onChange={(e) => handleSelectPlatform(e)}>
                                {platforms.map(p => (
                                    <option key={p.name} value={p.name}>{p.name}</option>
                                ))}
                            </select>
                        </div>
                        {errors.platforms && (
                            <p className={style.error}>{errors.platforms}</p>
                        )}
                        <div className={style.platform_genre}>
                            {input.genres.map(el =>
                                <div className={style.x_genre_container}>
                                    <label className={style.x_genre}>{el}</label>
                                    <button className={style.genre_button} onClick={() => handleDeleteGenre(el)}><img className={style.delete} src={iconDel} alt="delete" /></button>
                                </div>
                            )}
                            {input.platforms.map(el =>
                                <div className={style.x_platform_container}>

                                    <label className={style.x_platform}>{el}</label>
                                    <button className={style.platform_button} onClick={() => handleDeletePlatforms(el)}><img className={style.delete} src={iconDel} alt="delete" /></button>
                                </div>
                            )}
                        </div>

                        <div>
                            <button disabled={input.name === '' || errors.name || // si esta vacio o tiene un error = disabled
                                input.description === '' || errors.description ||
                                input.rating === '' || errors.rating ||
                                input.released === '' || errors.released ||
                                input.image === '' || errors.image ||
                                input.genres[0] === '' || errors.genres ||
                                input.platforms[0] === '' || errors.platforms
                            } type='submit' className={style.create}>CREATE GAME</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default VideogameCreate;

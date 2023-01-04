import style from "./Card.module.css"
import React from 'react';
import { NavLink } from 'react-router-dom';


const Card = ({ id, name, genres, image, createdAtDB }) => {
    return (
        <div>
            <NavLink to={`/videogames/${id}`} className='link'>
                <div key={id} className={style.card}>
                    <img className={style.card_image} src={image} alt={`Imagen del juego ${name}`} />
                    <div className={style.title_name}><a href={id}>{name}</a></div>
                    <div className={style.title_name}><h3>{createdAtDB}</h3></div>
                    {/* <div className='genres'>
                    {
                        genres.map((genre, id) => {
                            return <p key={id}>{genre.name}</p>
                        })
                    }
                </div> */}
                </div>
            </NavLink>
        </div>
    );
}

export default Card
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../redux/actions.js";
import { useParams } from "react-router-dom";
import style from "../GameDetail/GameDetail.module.css"
import Loading from "../Loading/Loading.jsx";
import Header from "../Header/Header.jsx";

const Details = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    console.log(id)

    useEffect(() => {
        dispatch(getDetails(id))
    }, [dispatch, id])



    const myGame = useSelector((state) => state.details)

    if (!myGame.length) {
        return <Loading />
    }
    return (
        <div>
            <Header />
            <div className={style.container}>
                {
                    myGame.length > 0 ? // tiene algo?
                        <div className={style.card}>
                            <div className={style.name}>
                                <h5>{myGame[0].name}</h5>
                                <img className={style.image} src={myGame[0].background_image ? myGame[0].background_image : myGame[0].image} alt={`of ${myGame[0].name}`} />
                                <h5 className={style.rating}> Rating:</h5><p>{myGame[0].rating}</p>
                                <h5 className={style.genre}>Genres:</h5><p>{!myGame[0].createdInDB ? myGame[0].genres.join(" - ") : myGame[0].genres.map(el => el.name).join(" - ")} </p>
                                <h5 className={style.released}>Released:</h5> <p>{myGame[0].released}</p>
                                <h5 className={style.platforms}>
                                    Platforms: </h5><p>{!myGame[0].createdInDB ? myGame[0].platforms.join(" - ") : myGame[0].platforms.map(el => el.name).join(" - ")}
                                </p>
                                <h5 className={style.description}>Description:</h5><p>{myGame[0].description}</p>
                            </div>
                        </div> : <Loading />
                }
            </div>
        </div>
    )
}


export default Details;
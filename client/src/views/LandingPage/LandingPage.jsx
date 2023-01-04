import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import style from "../LandingPage/LandingPage.module.css"


const LandingPage = () => {
    return (
        <div>
            <div>
                <Header />
            </div>
            <div className={style.container_landing}>
                <div className={style.content}>
                    <div className={style.info}>
                        <h2>RAWG <br />
                            <span>Videogames API!</span></h2>
                        <p>RAWG is the largest video game database and game discovery service. And we are gladly sharing our 500,000+ games, search, and machine learning recommendations with the world. Learn what the RAWG games database API can do and build something cool with it!.</p>
                        <Link to="/home"><button className={style.info_btn}>Discover Games!</button></Link>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default LandingPage;
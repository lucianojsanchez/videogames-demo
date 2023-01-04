import { Link } from "react-router-dom";
import style from "./Header.module.css"
import React from "react";
import logo from "../../img/logo.png"

const Header = () => {
    return (
        <body>
            <div className={style.container}>
                <div className={style.navbar}>
                    <Link to="/"><img className={style.img} src={logo} width={90} height={75} alt="logo" /></Link>
                    <ul>
                        <li >
                            <Link to="/">Landing</Link>
                        </li>
                        <li>
                            <Link to="/home">Videogames</Link>
                        </li>
                        <li>
                            <Link to="/videogame">Create a Videogame</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </body >

    )
}

export default Header;

import style from "./Loading.module.css"

const Loading = () => {
    return (

        <div className={style.loading_container}>
            <h1>Loading...</h1>
            <svg className={style.svg}>
                <circle className={style.svg_circle} cx="70" cy="70" r="70"></circle>
            </svg>
        </div>
    )
}

export default Loading;

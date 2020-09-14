import React, {createRef} from 'react'
import style from "./splash.module.css"
import logo from './../../logo.png'
import {Button} from "antd";

const Splash = (props) => {

    const handleSubmit = (login, password) => {
        console.log(login, password)
        props.setLogged(login, password)
    }

    let loginRef = new createRef();
    let passwordRef = new createRef();

    return <>
        <div className={style.splash}>
            <div className={style.splashData}>
                <img className={style.logo} src={logo} alt="NMAU Online"/>
                <h1>Auditorium</h1>
                <h2>Учбова частина</h2>
                <div className={style.form__group}>
                    <input ref={loginRef} type="input" className={style.form__field} placeholder="Login" name="Login" id='login'
                           required/>
                    <label htmlFor="Login" className={style.form__label}>Логін</label>
                </div>
                <div className={style.form__group}>
                    <input ref={passwordRef} type="password" className={style.form__field} placeholder="Password" name="Password"
                           id='password' required/>
                    <label htmlFor="Password" className={style.form__label}>Пароль</label>
                </div>
                <Button onClick={()=>handleSubmit(loginRef.current.value, passwordRef.current.value)} className={style.submitButton} ghost>Увійти</Button>
                <p>НАЦІОНАЛЬНА МУЗИЧНА АКАДЕМІЯ ІМ. П. І. ЧАЙКОВСЬКОГО</p>
            </div>

        </div>
    </>
}

export default Splash;
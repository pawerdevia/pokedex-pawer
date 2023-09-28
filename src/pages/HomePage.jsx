import React from 'react'
import { useRef } from 'react'
import { useDispatch } from "react-redux";
import { setTrainerSlice } from '../store/slices/trainer.slice';
import { useNavigate } from "react-router-dom"
import '../assets/styles/HomePage.css';

const HomePage = () => {

    const inputTrainer = useRef()
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleTrainer = e => {
        e.preventDefault();
        dispatch(setTrainerSlice(inputTrainer.current.value.trim()))
        navigate('/pokedex')
    };



    return (
        <div className='container-homepage'>
            <header className='homepage__header'>
                <img src="https://i.postimg.cc/GtYdprZX/home-page-text.png" alt="text pokedex" className='header__text-pokemon' />
                <img src="https://i.postimg.cc/MTYgZhjV/pokeball-mobile.png" alt="pokeball" className='header__pokeball' />
            </header>
            <section className='homepage__greeting-name'>
                <h2 className='greeting'>¡Hi Trainer!</h2>
                <p className='welcome'>Welcome to Green Leaf Town to get started, give me your name</p>
                <form onSubmit={handleTrainer} className='homepage__form'>
                    <input type="text" ref={inputTrainer} className='form__input' placeholder='Your name...' />
                    <button className='form__btn'>Start!</button>
                </form>
            </section>
            <footer className='footer'>
                <img src="https://i.postimg.cc/GhMpn4QQ/home-footer.png" alt="footer homepage" className='footer__img'/>
            </footer>
        </div>
    )
}

export default HomePage
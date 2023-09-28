import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import PokeCard from '../components/HomePage/PokedexPage/PokeCard';
import SelecType from '../components/HomePage/PokedexPage/SelecType';
import useFetch from '../hooks/useFetch';
import '../assets/styles/PokedexPage.css'
import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom'


const PokedexPage = () => {

  const navigate = useNavigate()

  const handleNavigateHome = () => {
      navigate('/')
  }

  const trainer = useSelector(store => store.trainer)
  const inputSearch = useRef()
  const [inputValue, setinputValue] = useState('')
  const [typeSelected, setTypeSelected] = useState('allPokemons')
  const url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=200'
  const [pokemons, getPokemons, getTypePokemon] = useFetch(url)
  const pokeFilter = pokemons?.results.filter(poke => poke.name.includes(inputValue))


  //Pagination 
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(20)
  const lastPostIndex = currentPage * postPerPage;
  const firstPostPage = lastPostIndex - postPerPage
  const currentPost = pokeFilter?.slice(firstPostPage, lastPostIndex)

  useEffect(() => {
    if (typeSelected === 'allPokemons') {
      getPokemons()
    } else {
      getTypePokemon(typeSelected)
    }

  }, [typeSelected])


  const handleSearch = e => {
    e.preventDefault()
    setinputValue(inputSearch.current.value.trim().toLowerCase())
    setCurrentPage(1)
  }

  return (
    <div className='pokedex-page'>
      <p className='pokedexp__greetings'>¡Welcome {trainer.replace(/^\w/, (c) => c.toUpperCase())}, <span className='spam-nick'>here you can find your favorite pokemon</span> !</p>
      <section className='pokedexp__container-form'>
        <form onSubmit={handleSearch} className='pokedexp__form'>
          <input type="text" ref={inputSearch} className='form__input-pokedex' placeholder='Find your pokemon' />
          <button className='form__btn-pokedexp'>Search</button>
        </form>

        <SelecType setTypeSelected={setTypeSelected} />
      </section>
      <button onClick={handleNavigateHome} className='previus-home'>Previus</button>

      <div className='container__pokemons'>
        {
          currentPost?.map(poke => (
            <PokeCard
              key={poke.url}
              url={poke.url}
            />
          ))
        }
      </div>
      <Pagination
        totalPosts={pokeFilter?.length}
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  )
}

export default PokedexPage
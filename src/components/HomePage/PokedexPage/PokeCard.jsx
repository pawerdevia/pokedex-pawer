import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import '../../../assets/styles/PokeCard.css'
import capitalizeLetter from '../../../hooks/capitalizeLetter'

const PokeCard = ({ url }) => {


    const [pokemon, getPokemon] = useFetch(url)

    useEffect(() => {
        getPokemon()
    }, [])


    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(`/pokedex/${pokemon.id}`)
    }

    let colorNamePokemon = `${pokemon?.types[0].type.name}T`
    let typeGradient = `${pokemon?.types[0].type.name}C`
    let typeBorderColor = pokemon?.types[0].type.name

    

    return (
        <article onClick={handleNavigate} className={`card-pokemon ${typeBorderColor}`}>
            <header className={`card_header ${typeGradient}`}>
                <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="pokemon" className='header__img' />
            </header>
            <section className='card__description'>
                <h3 className={`card__name ${colorNamePokemon}`}>{capitalizeLetter(pokemon?.name)}</h3>
                <ul className='card__types'>
                    {
                        pokemon?.types.map(typeInfo => (
                            <li className='card__type-info'
                                key={typeInfo.type.url}>
                                    {capitalizeLetter(typeInfo.type.name)}
                            </li>
                        ))
                    }
                </ul>
                    <h5 className='card__type-text'>Type</h5>
                <hr className='card__line'/>
                <ul className='card__stats'>
                    {
                        pokemon?.stats.map(statInfo => (
                            <li key={statInfo.stat.url} className='card__stat'>
                                <span className={colorNamePokemon}>{statInfo.stat.name.toUpperCase()}</span>
                                <span className='card__value-stat'>{statInfo.base_stat}</span>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </article>
    )
}

export default PokeCard
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import '../../src/assets/styles/PokedexIdPage.css';
import capitalizeLetter from "../hooks/capitalizeLetter";
import { useNavigate } from 'react-router-dom'


const PokedexIdPage = () => {

    const navigate = useNavigate()

    const handleNavigateHome = () => {
        navigate('/pokedex')
    }

    const { id } = useParams()

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const [pokemon, getPokemon] = useFetch(url)

    useEffect(() => {
        getPokemon()
    }, [id])

    const colorTextP = `${pokemon?.types[0].type.name}T`
    const gradientHeader = `${pokemon?.types[0].type.name}C`





    return (
        <article className="container-pokemon-id">
            <button onClick={handleNavigateHome} className='previus-home pokedex'>Previus</button>

            <header className="pokemonid__header">
                <div className={`pokemonid__container-img ${gradientHeader}`}>
                    <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="Pokemon" className="img-pokemon" />
                </div>
                <div className="pokemonid__description">
                    <h2 className={`description__number-pokemon ${colorTextP}`}>#{pokemon?.id}</h2>
                    <h1 className={`description__name-pokemon ${colorTextP}`}>{capitalizeLetter(pokemon?.name)}</h1>
                    <ul className="description__principal">
                        <li className="date one">
                            <span className="date__type">Weight</span>
                            <span className="date__value">{pokemon?.weight}</span>
                        </li>
                        <li className="date two">
                            <span className="date__type">Height</span>
                            <span className="date__value">{pokemon?.height}</span>
                        </li>
                    </ul>
                </div>
                <div className="container__section-type">
                    <div className="container__desciptions">
                        <h3 className="descriptions__title">Type</h3>
                        {
                            pokemon?.types.map((type, i) => (
                                <span className={`${pokemon?.types[i].type.name}B type-pokemon`}>{capitalizeLetter(type?.type.name)}</span>
                            ))
                        }
                    </div>
                    <div className="container__desciptions">
                        <h3 className="descriptions__title">Skills</h3>
                        {
                            pokemon?.abilities.map((ability, i) => (
                                <div key={i} className='type-pokemon'>{capitalizeLetter(ability.ability.name)}</div>
                            ))
                        }
                    </div>
                </div>
                <section className="section-stats">
                    <div className="container-stats">
                        <h2 className="stats__title">Stats</h2>
                        <img src="https://i.postimg.cc/x1vkJDPt/statbanner.png" alt="img-banner" className="type-img" />
                    </div>
                    <div>
                        {
                            pokemon?.stats.map((statP, i) => (
                                <div key={i} className='container__bars'>
                                    <div className="stat__bar">
                                        <h4>{capitalizeLetter(statP.stat.name)}:</h4>
                                        <h4>{statP.base_stat}/250</h4>
                                    </div>
                                    <div style={{ width: '100%' }} className='container__stat-bar'>
                                        <div style={{ background: 'linear-gradient(90deg,#ffca00 10%, #ffaf00 20%)', width: `${(statP.base_stat / 255 * 100)}%`, height: '20px' }}>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </section>
            </header>

            <section className="container__movements">
                <header className="movements__header">
                    <h2 className="movements__title">Movements</h2>
                    <img src="https://i.postimg.cc/x1vkJDPt/statbanner.png" alt="banner" className="imgb-movements" />
                </header>
                <div className="movements__all">
                    {
                        pokemon?.moves.map((move, i) => (
                            <div key={i} className='movement'>{capitalizeLetter(move.move.name)}</div>
                        ))
                    }
                </div>
            </section>

        </article>
    )
}

export default PokedexIdPage
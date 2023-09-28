import React from 'react'
import { useEffect } from 'react'
import useFetch from '../../../hooks/useFetch'
import '../../../assets/styles/SelecType.css'

const SelecType = ({setTypeSelected}) => {


    const url = 'https://pokeapi.co/api/v2/type'
    const [types, getTypes] = useFetch(url)

    useEffect(() => {
        getTypes()
    }, [])
    

    const handleChange = e => {
        setTypeSelected(e.target.value)
    }

    return (
        <div className='container__select'>
            <select onChange={handleChange} className='pokedexp-select'>
                <option value="allPokemons">All pokemons</option>
                    {
                        types?.results.map(typeInfo => (
                            <option value={typeInfo.url} key={typeInfo.url}>{typeInfo.name}</option>
                        ))
                    }
            </select>
        </div>
    )
}

export default SelecType
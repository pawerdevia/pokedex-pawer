import axios from "axios"
import { useState } from "react"


const useFetch = (url) => {

    const [infoApi, setinfoApi] = useState()

    const getApi = () => {
        axios.get(url)
            .then(res => setinfoApi(res.data))
            .catch(err => console.log(err))
    }

    const getTypeApi = (urlType) => {
        axios.get(urlType)
            .then(res => {
                res.data
                const obj = {
                    results: res.data.pokemon.map(e => e.pokemon)
                }
                setinfoApi(obj)
            })
            .catch(err => console.log(err))
    }


    return [infoApi, getApi, getTypeApi]
}

export default useFetch
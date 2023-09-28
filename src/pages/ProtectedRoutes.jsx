import { useSelector } from "react-redux"
import { Navigate,Outlet } from "react-router-dom"
import NavBar from "../components/HomePage/PokedexPage/shared/NavBar"

const ProtectedRoutes = () => {

    const trainer = useSelector(store => store.trainer)

    if (trainer.length > 2) {
        
        return (
            <>
            <NavBar/>
            <Outlet/>
            </>
        )
    } else {
        return <Navigate to='/'/>
    }
}

export default ProtectedRoutes
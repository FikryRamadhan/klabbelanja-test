import axios from "axios"
import { Routes } from "react-router-dom"


const checkAuth = () => {

    const TOKEN = localStorage.getItem("token")
    
    const PUBLIC_ROUTES = ["/login", "/register"]

    const isPublicPage = PUBLIC_ROUTES.some(r => window.location.href.includes(r))

    if (TOKEN === null && isPublicPage === false) {
        window.location.href = '/login'
        return false;
    } else if(TOKEN !== null) {
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`

        // checkGuest(TOKEN)
        return TOKEN
    }
}

export default checkAuth
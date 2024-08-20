const checkGuest = () => {
    const TOKEN = localStorage.getItem("token")
    if (TOKEN !== null) {
        return window.location.href = 'app/dashboard'
    }
}

export default checkGuest


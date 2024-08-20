import { message } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("token")

        message.success("Log Out Succsess")
        setInterval(() => {
            window.location.href = "/login"
        },2000)
    }

    return (
        <>
            {/* Navbar */}
            <header className="bg-slate-800 shadow-md p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-white">KlabBelanja</h1>
                    <button
                        className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        onClick={toggleMenu}
                    >
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                    <nav className={`md:flex space-x-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
                        <Link to={"/dashboard"} className="block text-white hover:text-blue-600 py-2">Home</Link>
                        <button onClick={handleLogout} className="block text-white hover:text-blue-600 py-2">Log out</button>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Header
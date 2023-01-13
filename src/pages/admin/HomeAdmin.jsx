import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useUserAuth } from '../../context/UserAuthContext';



function Home() {

    const { admin, logout } = useUserAuth()
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout()
            navigate('/admin/login')
        } catch(e) {
            console.log(e.message);
        }
    }

    return (
        <div>
            <button onClick={handleLogout}>Déconnexion</button>
            <NavLink to="/admin/list-users">Utilisateurs</NavLink>
            
        </div>
    );
}

export default Home;
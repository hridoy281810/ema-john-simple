import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const Header = () => {
    const {user,logOut} = useContext(AuthContext)

    const handleLogOut =()=>{
        logOut()
        .then(() => {
            // Sign-out successful.
          }).catch((error) => {
            console.log( error  )
          });
    }
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div className='ancore'>
                <Link to="/">shop</Link>
                <Link to="/order">Order</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                {user && <>
                <span className='text-color'>Welcome {user.displayName} <button onClick={handleLogOut}>Sign Out</button></span>
                </>}
            </div>


        </nav>
    );
};

export default Header;
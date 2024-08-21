import React from 'react'
import './Header.css'
import {Link } from 'react-router-dom'
import { FaEthereum } from "react-icons/fa";

const Header = () => {
  return (
    <div className='navbar'>
    <div className='logo'>
    <FaEthereum color='orange' size={60} />
    <Link to='/' style={{textDecoration:'none',color:'white',fontSize:'3rem'}}>CryptoVerse</Link>
        
    </div>
        <ul>
            <li>
            <Link to='/exchanges'>Exchanges</Link>
            </li>
            <li>
            <Link to='/coins'>Coins</Link>
            </li>
        </ul>
    </div>
  )
}

export default Header
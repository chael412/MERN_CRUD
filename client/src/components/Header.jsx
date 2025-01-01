import React from 'react';
import logo from '../assets/react.svg';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<header>
			<Link
				to='/'
				className='logo'>
				<img
					src={logo}
					alt='react logo'
				/>
				React JS
			</Link>
			<nav>
				<NavLink to='/'>Home</NavLink>
				<NavLink to='/about'>About</NavLink>
			</nav>
		</header>
	);
};

export default Header;

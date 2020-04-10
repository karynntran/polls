import React from 'react';
import { Link } from 'react-router-dom';
import TestAuth from './auth/TestAuth';

const Header = () => {
	return (
		<div className="ui secondary pointing menu">
			<h1>
				<Link to="/">Pulse</Link>
			</h1>
			<div className="right menu">
				<TestAuth />
			</div>
		</div>
	)
}

export default Header;

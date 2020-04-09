import React from 'react';
import TestAuth from './auth/TestAuth';

const Header = () => {
	return (
		<div className="ui secondary pointing menu">
			<h1>Pulse</h1>
			<div className="right menu">
				<TestAuth />
			</div>
		</div>
	)
}

export default Header;

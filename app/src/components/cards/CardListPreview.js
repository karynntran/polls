import React from 'react';
import { Link } from 'react-router-dom';

const CardListPreview = ({ card }) => {
	let { question, answers, id } = card;
	return (
		<div className="ui card">
			<Link to={`cards/${id}`}>
				<div className="content">
					<div className="header">{question}</div>
				</div>
				<div className="content">
					{answers}
				</div>
			</Link>

			<div className="content">
				<button><Link to={`/cards/edit/${id}`}>Edit Poll</Link></button>
				<button><Link to={`/cards/delete/${id}`}>Delete Poll</Link></button>
			</div>
		</div>
	)
}

export default CardListPreview;

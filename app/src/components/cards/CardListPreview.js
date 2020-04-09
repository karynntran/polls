import React from 'react';
import { Link } from 'react-router-dom';

const CardListPreview = ({ card }) => {
	let { question, answers, type, id } = card;

	const renderAnswers = () => {
		if (answers.length) {
			return answers.map((answer, idx) => {
				return <li key={idx}>{answer.answer}</li>
			})

		} else {
			return (<div>Rating</div>)
		}
	}

	return (
		<div className="ui card">
			<Link to={`cards/${id}`}>
				<div className="content">
					<h6>{`Type: ${type}`}</h6>
					<h2 className="header">{question}</h2>
					
				</div>
				<div className="content">
					{ renderAnswers()}
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

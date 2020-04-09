import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class CardListPreview extends React.Component {
	renderAnswers = (answers) => {
		if (answers.length) {
			return answers.map((answer, idx) => {
				return <li key={idx}>{answer.answer}</li>
			})

		} else {
			return (<div>Rating</div>)
		}
	}

	renderOptions(id, userId) {
		if (this.props.currentUser) {
			if (userId === this.props.currentUser.userId) {
				return (
					<div className="content">
							<button><Link to={`/cards/edit/${id}`}>Edit Poll</Link></button>
							<button><Link to={`/cards/delete/${id}`}>Delete Poll</Link></button>
					</div>
				)
			} else {
				return (
					<div>
						<button>Answer this poll!</button>
					</div>
				)
			}
		}

	}

	render() {
		let { question, answers, type, id, userId } = this.props.card;

		return (
			<div className="ui card">
				<Link to={`cards/${id}`}>
					<div className="content">
						<h6>{`Type: ${type}`}</h6>
						<h2 className="header">{question}</h2>
						
					</div>
					<div className="content">
						{ this.renderAnswers(answers)}
					</div>
				</Link>
				{this.renderOptions(id, userId)}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		currentUser: state.auth.currentUser
	}
}

export default connect(mapStateToProps)(CardListPreview);

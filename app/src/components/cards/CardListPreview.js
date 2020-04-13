import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../style/styles.scss';


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
					<div className="extra content">
						<div className="ui two buttons">
							<button className="ui button green"><Link to={`/cards/edit/${id}`}>Edit Poll</Link></button>
							<button className="ui button red"><Link to={`/cards/delete/${id}`}>Delete Poll</Link></button>
						</div>
					</div>
				)
			} else {
				return (
					<div className="extra content">
						<div className="ui two buttons">
							<button className="ui button green"><Link to={`/cards/show/${id}`}>Answer this Poll!</Link></button>
						</div>
					</div>
				)
			}
		}

	}

	render() {
		let { question, answers, type, _id, userId } = this.props.card;
		return (
			<div className="ui card">
				<Link to={`cards/${_id}`}>
					<div className="content">
						<h6>{`Type: ${type}`}</h6>
						<h2 className="header">{question}</h2>
						
					</div>
					<div className="content">
						{ this.renderAnswers(answers)}
					</div>
				</Link>
				{this.renderOptions(_id, userId)}
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

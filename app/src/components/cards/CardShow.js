import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCard, submitAnswer } from '../../actions/cardActions';
import { isLoggedIn } from '../../actions/authActions';

import CardChartPie from './CardChartPie';
// import { isCurrentUser } from '../../_helpers/userHelpers';

class CardShow extends React.Component {
	componentDidMount() {
		this.props.fetchCard(this.props.match.params.id);
		this.props.isLoggedIn();
	}

	answerSubmit = (card, answerIdx) => {
		this.props.submitAnswer(card, answerIdx)
		// this.forceUpdate();
	}

	renderAnswers = () => {
		let disabled = this.props.card.userId === this.props.currentUser._id ? true : false;

		return this.props.card.answers.map((answer, idx) => {
			return <li key={idx}><button disabled={disabled} className="ui button primary" onClick={() => this.answerSubmit(this.props.card, idx) }>{answer.answer}</button></li>
		})
	}

	renderOptions = (currentUser) => {
		let id = this.props.card._id;
		if (this.props.card.userId === this.props.currentUser._id) {
			return (
				<div>You created this poll. Would you like to <Link style={{color: 'blue'}} to={`/cards/edit/${id}`}>Edit</Link> or <Link style={{color: 'blue'}} to={`/cards/delete/${id}`}>Delete</Link> it?</div>
			)
		};
	}

	render() {
		if (!this.props.card || !this.props.currentUser) {
			return <div>Loading...</div>
		}
		console.log(this.props.card, this.props.currentUser)
		return (
			<div>
				<div>
					<CardChartPie card={this.props.card} />
					<h3>Question: {this.props.card.question}</h3>
					
					{ this.renderOptions(this.props.currentUser) }
					<ul>
						{this.renderAnswers(this.props.currentUser)}
					</ul>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state, getOwnProps) => {
	return {
		card: state.cards[getOwnProps.match.params.id],
		currentUser: state.auth.currentUser
	}
}

export default connect(mapStateToProps, { fetchCard, submitAnswer, isLoggedIn })(CardShow);

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCards } from '../../actions';

import CardListPreview from './CardListPreview';


class CardList extends React.Component {
	componentDidMount() {
		this.props.fetchCards();
	}

	componentDidUpdate() {
		this.props.fetchCards();
	}

	renderUserCards = () => {
		if (!this.props.cards.length) {
			return <div>Add some polls!</div>
		}

		if (this.props.logState) {
			let { userId } = this.props.currentUser;
			const userCards = this.props.cards.filter((card) => card.userId === userId)
			return userCards.map((card) => {
				return (
					<CardListPreview className="ui cards" card={ card } key = { card._id } />
				)
			})
		}
	}

	renderOtherCards = () => {
		if (!this.props.cards.length) {
			return <div>Add some polls!</div>
		}

		const otherCards = this.props.logState ? this.props.cards.filter((card) => card.userId !== this.props.currentUser.userId) : this.props.cards

		return otherCards.map((card) => {
			return (
				<CardListPreview className="ui cards" card={ card } key = { card._id } />
			)
		})

	}


	render() {
		if (this.props.logState) {
			return (
				<div>
					<div>
						<Link to="/cards/create">
							<i className="plus square outline icon"></i>
							Create New Poll
						</Link>
					</div>	
					<div className="ui segment">
						<h2>Your Polls</h2>
						<div className="ui three stackable cards">
							{this.renderUserCards()}
						</div>
					</div>
					<div className="ui segment">
						<h2>Take These Polls</h2>
						<div className="ui three stackable cards">
							{this.renderOtherCards()}
						</div>
					</div>
				</div>
			)
		}

		return (
			<div>
				<h2>Log In With the Following Test Credentials</h2>
				<ul>
					<li key="user123">Username: user123, Password: password123</li>
					<li key="user456">Username: user456, Password: password456</li>
				</ul>
			</div>
		)

	}
}

const mapStateToProps = (state) => {
	return {
		cards: Object.values(state.cards), //using Object.values creates an array over an object property values
		currentUser: state.auth.currentUser,
		logState: state.auth.logState
	}
}

export default connect(mapStateToProps, { fetchCards })(CardList);

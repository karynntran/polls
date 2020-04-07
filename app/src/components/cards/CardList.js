import React from 'react';
import { connect } from 'react-redux';
import { fetchCards } from '../../actions';

import CardListPreview from './CardListPreview';


class CardList extends React.Component {
	componentDidMount() {
		this.props.fetchCards();
	}

	renderCards = () => {
		if (!this.props.cards) {
			return <div>Loading...</div>
		}

		return this.props.cards.map((card) => {
			return (
				<CardListPreview className="ui cards" card={ card } key = { card.id }
 />
			)
		})
	}

	render() {
		return (
			<div>
				{this.renderCards()}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		cards: Object.values(state.cards) //using Object.values creates an array over an object property values
	}
}

export default connect(mapStateToProps, { fetchCards })(CardList);

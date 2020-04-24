import React from 'react';
import { connect } from 'react-redux';
import { fetchCard, deleteCard } from '../../actions/cardActions';
import history from '../../history';

class CardDelete extends React.Component {
	componentDidMount() {
		this.props.fetchCard(this.props.match.params.id)
	}

	onDeleteClick = () => {
		this.props.deleteCard(this.props.match.params.id)
		history.push('/');
	}

	render() {
		if (!this.props.card) {
			return <div>Loading...</div>
		}
		return (
			<div>
				<h1>{`Delete "${this.props.card.question}"?`}</h1>
				<div>
					<button onClick={() => this.onDeleteClick()}>Delete</button>
					<button onClick={() => history.push("/")}>Cancel</button>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state, getOwnProps) => {
	return {
		card: state.cards[getOwnProps.match.params.id]
	}
}

export default connect(mapStateToProps, { fetchCard, deleteCard })(CardDelete);

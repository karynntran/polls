import React from 'react';
import { connect } from 'react-redux';
import { fetchCard } from '../../actions';

class CardShow extends React.Component {
	componentDidMount() {
		this.props.fetchCard(this.props.match.params.id);
	}

	render() {
		return (
			<div>
				<div>
					<h2>{this.props.card.question}</h2>
					<h3>{this.props.card.answers}</h3>
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

export default connect(mapStateToProps, { fetchCard })(CardShow);

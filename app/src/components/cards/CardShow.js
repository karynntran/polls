import React from 'react';
import { connect } from 'react-redux';
import { fetchCard } from '../../actions';
import CardChartPie from './CardChartPie';

class CardShow extends React.Component {
	componentDidMount() {
		this.props.fetchCard(this.props.match.params.id);
	}

	renderAnswers = () => {
		return this.props.card.answers.map((answer, idx) => {
			return <li key={idx}>{answer.answer}</li>
		})
	}

	render() {
		console.log(this.props.card)
		if (!this.props.card) {
			return <div>Loading</div>
		}
		return (
			<div>
				<div>
					<CardChartPie />
					<h2>{this.props.card.question}</h2>
					<ul>
						{this.renderAnswers()}
					</ul>
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

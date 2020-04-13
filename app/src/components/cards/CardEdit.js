import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchCard, editCard } from '../../actions';
import CardForm from './CardForm';

class CardEdit extends React.Component {
	componentDidMount() {
		this.props.fetchCard(this.props.match.params.id)
	}

	onSubmit = formValues => {
		console.log('formValues', formValues, this.props.match.params.id)

		this.props.editCard(formValues, this.props.match.params.id);
	}

	render() {
		if (!this.props.card) {
			return <div>Loading...</div>
		}
		return (
			<div>
				<h3>Edit A Poll</h3>
				<CardForm onSubmit={this.onSubmit} initialValues={_.pick(this.props.card, 'question', 'answers', 'type')} />
			</div>
		)
	}
}


const mapStateToProps = (state, ownProps) => {
	return {
		card: state.cards[ownProps.match.params.id]
	}
}


export default connect(mapStateToProps, { fetchCard, editCard })(CardEdit);

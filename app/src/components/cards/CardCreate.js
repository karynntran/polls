import React from 'react';
import { connect } from 'react-redux';
import { createCard } from '../../actions';
import CardForm from './CardForm';

class CardCreate extends React.Component {
	onSubmit = formValues => {
		this.props.createCard(formValues);
	}

	render() {
		return (
			<div>
				<h3>Create A Poll</h3>
				<CardForm onSubmit={this.onSubmit} />
			</div>
		)
	}
}


export default connect(null, { createCard })(CardCreate);

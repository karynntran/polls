import React from 'react';
import { connect } from 'react-redux';
import { createCard } from '../../actions/cardActions';
import CardForm from './CardForm';

class CardCreate extends React.Component {
	onSubmit = (formValues) => {
		this.props.createCard(formValues, this.props.currentUser._id);
	}

	render() {
		return (
			<div>
				<h3>Create A Poll</h3>
				<CardForm onSubmit={this.onSubmit}/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.auth.currentUser
	}
}

export default connect(mapStateToProps, { createCard })(CardCreate);

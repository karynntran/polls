import React from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';

// import localStorage from '../../localStorage';


import { logIn, logOut, isLoggedIn } from '../../actions';


//create a form with login and logout
//create a button
//when submitted, check the userDB to see if a user matches password
//error handling

class TestAuthForm extends React.Component {
	componentDidMount() {
		this.props.isLoggedIn();

	}

	handleLogOut = () => {
		localStorage.setItem('user', null)
		this.props.logOut();
		this.props.reset();
	}

	onSubmit = formValues => {
		this.props.logIn(formValues);
	}

	renderInput = ({ input, label, messageStatus }) => {
		return (
			<div className="field">
				<label>{label}</label>
				<input {...input } autoComplete="off" />
			</div>
		)
	}

	renderUserActions = (status) => {
		if (status) {
			return <button onClick={() => this.handleLogOut()}>Log Out</button>
		} else {
			return (
				<form className= "ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
					<Field name="username" component={this.renderInput} label="Username:" />
					<Field name="password" component={this.renderInput} label="Password:" />
					<div>{this.props.message}</div>
					<button className="ui button primary">Submit</button>
				</form>
			)

		}
	}

	render() {
		console.log(this.props)
		return (
			<div>{this.renderUserActions(this.props.logStatus)}</div>
		)
	}
}



TestAuthForm = connect(
	state => ({
		logStatus: state.auth.logState,
		message: state.auth.message,
		currentUser: state.auth.currentUser
	}), {
		logIn,
		logOut,
		isLoggedIn
	}
)(TestAuthForm)


export default reduxForm({ form: 'testAuthForm' })(TestAuthForm)

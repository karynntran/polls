import React from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';

import { logIn, logOut } from '../../actions';

//create a form with login and logout
//create a button
//when submitted, check the userDB to see if a user matches password
//error handling

class TestAuthForm extends React.Component {
	componentDidMount() {
		// this.props.getUsers();
	}


	handleLogOut = () => {
		this.props.logOut();
		this.props.reset();
	}

	onSubmit = formValues => {
		console.log(formValues)
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
		console.log('auth', this.props)
		return (
			<div>{this.renderUserActions(this.props.logStatus)}</div>
		)
	}
}

// const mapStateToProps = (state) => {
// 	return {
// 		users: Object.values(state.users),
// 		logStatus: state.auth.logState
// 	}
// }


// export default connect(mapStateToProps, { getUsers, logIn, logOut })(TestAuth);


// const selector = formValueSelector('testAuthForm')


TestAuthForm = connect(
	state => ({
		logStatus: state.auth.logState,
		message: state.auth.message
	}), {
		logIn,
		logOut
	}
)(TestAuthForm)


export default reduxForm({ form: 'testAuthForm' })(TestAuthForm)

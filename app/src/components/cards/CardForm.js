import React from 'react';
import { Field, reduxForm } from 'redux-form';



class CardForm extends React.Component {

	renderError = ({ error, touched }) => {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			)
		}
	}

	renderInput = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? 'error': ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete="off"></input>
				{this.renderError(meta)}
			</div>
		)
	}

	renderRadio = (fields) => {
		console.log(fields)
		return (
			<div>
				<label>Type</label>
				<label><input type="radio" value="single"/>Single</label>
				<label><input type="radio" value="multiple"/>Multiple</label>
				<label><input type="radio" value="rating"/>Rating</label>
			</div>
		)
	}

	onSubmission = formValues => {
		this.props.onSubmit(formValues) // passed props in 
	}

	render() {
		return (
			<form className = "ui form error" onSubmit={this.props.handleSubmit(this.onSubmission)}>
				<Field name="question" component={this.renderInput} label="Question" />
				<Field name="answers" component={this.renderInput} label="Answer Options"/>
        <div>

        </div>

				<button className="ui button primary">Submit</button>
				<button className="ui button red" onClick={() => this.props.reset()}>Clear Fields</button>

			</form>
		)
	}
}


const validate = values => {
	const errors = {};

	if (!values.question) {
		errors.question = "Enter a question"
	}

	if (!values.answers) {
		errors.answers = "Answer Options"
	}

	return errors;
}

export default reduxForm({ form: 'cardForm', validate })(CardForm)

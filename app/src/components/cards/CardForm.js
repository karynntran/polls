import React from 'react';
import { connect } from 'react-redux';
import {
	Field,
	FieldArray,
	reduxForm,
	formValueSelector
} from 'redux-form';
import history from '../../history';




class CardForm extends React.Component {
	state = { checked: true }

	renderError = ({ error, touched }) => {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			)
		}
	}

	renderQuestion = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? 'error': ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete="off"></input>
				{this.renderError(meta)}
			</div>
		)
	}

	renderAnswer = ({ input, meta, index }) => {
		const className = `field ui action button ${meta.error && meta.touched ? 'error': ''}`;
		return (
			<div className={className}>
				<input {...input} autoComplete="off"></input>
				<span>{this.renderError(meta)}</span>
			</div>
		)
	}

	renderAnswerFields = (fields, meta) => {
		return fields.map((answer, index) =>
			<div key={index}>
				<Field
					name={ `${answer}.answer` }
					component={this.renderAnswer}
					index={index}/>
				<button className="ui button" onClick={() => fields.remove(index)}>Remove Answer</button>
			</div>
		)
	}

	renderAnswersArray = ({ fields, meta, typeSelection }) => {
		if (typeSelection === 'rating') {
			fields.removeAll();
			return <div>Rating</div>
		}
		return (
			<div className="field">
				<label>Answers</label>
				{ this.renderAnswerFields(fields, meta) }
				<button className="ui button green" onClick={() => fields.push({})}>
					<i className="plus square outline icon"></i>
					Add Answer (Max 5)
				</button>
				<div>{meta.error}</div>
			</div>

		)

	}

	renderTypeField = ({ input, label }) => {
		return (
			<div className="ui radio">
				<input {...input} type="radio"></input>
				<label>{label}</label>
			</div>
		)
	}


	renderPublicField = ({ input, label }) => {
		return (
			<div className="ui checkbox">
				<input {...input} type="checkbox" checked={this.props.checkedStatus}></input>
				<label>{label}</label>
			</div>
		)
	}


	onSubmission = (formValues) => {
		this.props.onSubmit(formValues); // passed props in
		history.push('/')
	}

	render() {
		return (
			<form className = "ui form error" onSubmit={this.props.handleSubmit(this.onSubmission)}>
				<div className="field">
					<label>Type</label>
					<div className="inline fields">
						<Field name="type" component={this.renderTypeField} type="radio" label="Single" value="single"/>
						<Field name="type" component={this.renderTypeField} type="radio" label="MultiSelect" value="multi"/> 
						<Field name="type" component={this.renderTypeField} type="radio" label="Rating" value="rating"/> 
					</div>
				</div>
				<Field name="question" component={this.renderQuestion} label="Question" />
     			<FieldArray typeSelection={this.props.formType} name="answers" component={this.renderAnswersArray}/>
				<Field name="permissions.public" component={this.renderPublicField} label="Public" />
				<div>
				<button className="ui button primary">Submit</button>
				<button className="ui button red" onClick={() => this.props.reset()}>Clear Fields</button>
				</div>
			</form>
		)
	}
}


const validate = values => {
	const errors = {};

	if (!values.question) {
		errors.question = "Enter a question"
	}

	if (!values.types) {
		errors.types = "Choose a type"
	}

	if (values.type !== "rating") {
		if (!values.answers || !values.answers.length) {
			errors.answers = { _error: 'At least one answer must be entered' }
		} else {
			let answerArrayErrors = []
			values.answers.forEach((answer, idx) => {
				let answerErrors = {}
				if (!answer.answer) {
					// console.log(idx, answer, 'no answer')
					answerErrors.answer = "Fill in or remove field.";
				} else {
					answerErrors.answer = "";
				}
				answerArrayErrors[idx] = answerErrors;

			})

			if (answerArrayErrors.length) {
				errors.answers = answerArrayErrors;
			}
		}
	}


	return errors;
}

const selector = formValueSelector('cardForm')


CardForm = connect(
	state => ({
		formType: selector(state, 'type'),
		checkedStatus: selector(state, 'permissions.public')
	})
)(CardForm)


export default reduxForm({ form: 'cardForm', enableReinitialize: true, validate })(CardForm)

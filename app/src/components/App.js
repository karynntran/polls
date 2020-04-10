import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history';

import './style/styles.scss';

import Header from './Header';
import CardList from './cards/CardList';
import CardCreate from './cards/CardCreate';
import CardEdit from './cards/CardEdit';
import CardDelete from './cards/CardDelete';
import CardShow from './cards/CardShow';

class App extends React.Component {

	render() {
		return (
			<div className="ui container" style={{backgroundColor: this.props.backgroundColor}}>
				<Router history={history}>
					<div>
					<Header className="ui divider"/>
					<Switch>
						<Route path="/" exact component={CardList} />
						<Route path="/cards/create" exact component={CardCreate} />
						<Route path="/cards/edit/:id" exact component={CardEdit} />
						<Route path="/cards/delete/:id" exact component={CardDelete} />
						<Route path="/cards/:id" exact component={CardShow} />
					</Switch>
					</div>
				</Router>		
			</div>
		)
	}
}


export default App;

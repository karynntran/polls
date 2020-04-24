import React from 'react';
import { Chart } from 'react-google-charts';

const renderData = (answers) => {
	let answerArr = Object.values(answers);
	let title = ['Answers', 'Count'];
	let options = [];
	for (var answer of answerArr) {
		options.push([answer.answer, answer.count])
	}
	return [title, ...options];
}

const CardChartPie = ({ card }) => {
	return (
		<div className = { "my-pretty-chart-container" } >
		<Chart
			width={'500px'}
			height={'300px'}
			chartType="PieChart"
			loader={<div>Loading Chart</div>}
			data={ renderData(card.answers) }
			options={{
					legend: 'none',
					pieSliceText: 'label',
					title: card.question,
					pieStartAngle: 100,
				}}/> 
		</div>
	);
}

export default CardChartPie;

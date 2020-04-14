import React from 'react';
import { Chart } from 'react-google-charts';

class CardChartPie extends React.Component {
	render() {
		return (
			<div className={"my-pretty-chart-container"}>
			<Chart
				width={'500px'}
				height={'300px'}
				chartType="PieChart"
				loader={<div>Loading Chart</div>}
				data={[
					['Language', 'Speakers (in millions)'],
					['German', 5.85],
					['French', 1.66],
					['Italian', 0.316],
					['Romansh', 0.0791],
					]}
				options={{
						legend: 'none',
						pieSliceText: 'label',
						title: 'Swiss Language Use (100 degree rotation)',
						pieStartAngle: 100,
					}}
				rootProps={{ 'data-testid': '4' }}/>
      </div>
		);
	}
}

export default CardChartPie;

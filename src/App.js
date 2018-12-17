import React, { Component } from 'react';
import Calendar from './components/Calendar';

class App extends Component {
	constructor() {
		super();
		this.state = {
			mode: 'one',
			markings: [],
			dates: []
		};
	}

	componentWillMount() {
		this.setState(this.initCalendarState);
	}

	initCalendarState = () => ({
		mode: 'one',
		markings: [
			{ rule: 'date', date: '2018/12/16', label: '생일', color: '#00ffff' },
			{
				rule: 'period',
				start: '2018/12/20',
				end: '2018/12/25',
				label: '휴가',
				color: '#ff0000'
			},
			{
				rule: 'day',
				start: '2019/01/01',
				end: '2019/01/30',
				day: 'MON',
				label: '월요병',
				color: '#ff00ff'
			}
		]
	});

	getDates = returnDates => {
		this.setState({ dates: returnDates });
	};

	render() {
		const { mode, markings, dates } = this.state;
		return (
			<div className="App">
				<Calendar
					mode={mode}
					markings={markings}
					getDates={this.getDates}
					isActive={false}
				/>
				<div>{dates}</div>
			</div>
		);
	}
}

export default App;

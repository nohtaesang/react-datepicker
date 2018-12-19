import React, { Component } from 'react';
import Calendar from './components/Calendar';
import './components/calendar.css';

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
		mode: { type: 'one', label: ['selected'], className: ['selected'] },
		markings: [
			// 특정 날 one-date, 특정 일date, 특정 요일day, 기간 period, 기간 내 일 period-date, 기간 내 요일 period-day
			{
				type: 'one-date',
				date: '2019/01/05',
				label: 'one-date',
				className: 'one-date'
			},
			{
				type: 'repetition-date',
				date: '05',
				label: 'repetition-date',
				className: 'repetition-date'
			},
			{
				type: 'repetition-day',
				day: '1',
				label: 'repetition-day',
				className: 'repetition-day'
			},
			{
				type: 'period',
				startDate: '2018/02/01',
				endDate: '2018/03/01',
				label: 'period',
				className: 'period'
			},
			{
				type: 'period-date',
				startDate: '2018/03/02',
				endDate: '2018/06/30',
				date: '09',
				label: 'period-date',
				className: 'period-date'
			},
			{
				type: 'period-day',
				startDate: '2018/07/01',
				endDate: '2018/10/01',
				day: '3',
				label: '수요 데이',
				className: 'period-wed'
			}
		]
	});

	getDates = returnDates => {
		this.setState({ dates: returnDates });
	};

	render() {
		const { mode, markings, dates } = this.state;
		console.log(markings);
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

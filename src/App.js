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
		mode: { type: 'one', tdClassName: 'selected', label: '선택됨', labelClassName: 'selected' },
		markings: [
			{
				type: 'repetition-date',
				date: '08/15',
				dateClassName: 'date-red',
				label: '광복절',
				labelClassName: 'korea'
			},
			{
				type: 'repetition-day',
				day: '0',
				dateClassName: 'date-red'
			},
			{
				type: 'one-date',
				date: '2019/01/05',
				dateClassName: 'date-purple',
				label: '생일',
				labelClassName: 'my-birth-day'
			},
			{
				type: 'period',
				startDate: '2018/11/29',
				endDate: '2018/12/07',
				label: '중간고사',
				labelClassName: 'hell'
			},
			{
				type: 'period-date',
				startDate: '2018/10/01',
				endDate: '2018/03/30',
				date: '09',
				label: '9일',
				labelClassName: 'nine'
			},
			{
				type: 'period-day',
				startDate: '2018/11/01',
				endDate: '2018/2/30',
				day: '3',
				label: '수요일',
				labelClassName: 'wed'
			}
		]
	});

	getDates = (returnDates) => {
		this.setState({ dates: returnDates });
	};

	render() {
		const { mode, markings, dates } = this.state;
		return (
			<div className="App">
				<Calendar mode={mode} markings={markings} getDates={this.getDates} isActive={false} />
				<div>{dates}</div>
			</div>
		);
	}
}

export default App;

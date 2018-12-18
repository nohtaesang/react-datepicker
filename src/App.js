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
			// 특정 날 one-date, 특정 일date, 특정 요일day, 기간 period, 기간 내 일 period-date, 기간 내 요일 period-day
			{ type: 'one-date', date: '2019/01/05', label: '생일', className: [ 'my-birthday' ] },
			{ type: 'date', date: '05', label: '생일 일', className: [ 'my-birthday-day' ] },
			{ type: 'day', day: 'MON', label: '월요병', className: [ 'monday-disease' ] },
			{ type: 'period', startDate: '2018/02/01', endData: '2018/03/01', label: '기간', className: [ 'period' ] },
			{
				type: 'period-date',
				startDate: '2018/03/02',
				endData: '2018/06/30',
				date: '05',
				label: '생일일',
				className: [ 'period-birthday' ]
			},
			{
				type: 'period-day',
				startDate: '2018/07/01',
				endData: '2018/10/01',
				day: 'WED',
				label: '수요 데이',
				className: [ 'period-wed' ]
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

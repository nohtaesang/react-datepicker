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
		// mode: { type: 'one', tdClassName: 'selected' } // 하루
		// mode: {
		// 	// 하루 이상
		// 	type: 'multi',
		// 	tdClassName: 'selected'
		// }
		// mode: {
		// 	// 기간
		// 	type: 'period',
		// 	startClassName: 'start-selected',
		// 	endClassName: 'end-selected',
		// 	tdClassName: 'selected'
		// }
		markings: [
			// {
			// 	type: 'repetition-date',
			// 	date: '12/25',
			// 	dateClassName: 'holiday',
			// 	label: 'X-mas',
			// 	labelClassName: 'x-mas'
			// }

			// {
			// 	type: 'repetition-day',
			// 	day: '0',
			// 	dateClassName: 'holiday'
			// }
			// {
			// 	type: 'one-date', // 특정 날짜
			// 	date: '2019/01/05',
			// 	dateClassName: 'date-orange',
			// 	label: '생일',
			// 	labelClassName: 'my-birth-day'
			// }
			//여기부터 스샷 차례
			{
				type: 'period', // 특정 기간
				startDate: '2018/12/05',
				endDate: '2018/12/11',
				label: '중간고사',
				labelClassName: 'exam'
			}
			// 	{
			// 		type: 'period-date', // 특정 기간 동안의 날짜
			// 		startDate: '2018/11/01',
			// 		endDate: '2018/12/15',
			// 		date: '09',
			// 		label: '9일',
			// 		labelClassName: 'nine'
			// 	},
			// 	{
			// 		type: 'period-day', // 특정 기간 동안의 요일
			// 		startDate: '2018/11/01',
			// 		endDate: '2018/12/15',
			// 		day: '3',
			// 		label: '수요일',
			// 		labelClassName: 'wed'
			// 	}
		]
	});

	getDates = returnDates => {
		console.log(returnDates);
		this.setState({ dates: returnDates });
	};

	render() {
		const { mode, markings, dates } = this.state;
		return (
			<div className="App">
				<Calendar mode={mode} markings={markings} getDates={this.getDates} isActive={false} />
			</div>
		);
	}
}

export default App;

# React calendar component ( 2018.12.26 )
<hr>

## Example 
http://ec2-54-89-58-158.compute-1.amazonaws.com
<hr>

## Usage
<pre>
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
		// mode: { type: 'one', tdClassName: 'selected' }, // 하루
		mode: {
			// 하루 이상
			type: 'multi',
			tdClassName: 'selected'
		},
		// mode: {
		// 	// 기간
		// 	type: 'period',
		// 	startClassName: 'start-selected',
		// 	endClassName: 'end-selected',
		// 	tdClassName: 'selected'
		// },
		markings: [
			{
				type: 'repetition-date', // 날짜 반복
				date: '12/25',
				dateClassName: 'holiday',
				label: 'X-mas',
				labelClassName: 'korea'
			},
			{
				type: 'repetition-day', // 요일 반복
				day: '0',
				dateClassName: 'holiday'
			},
			{
				type: 'one-date', // 특정 날짜
				date: '2019/01/05',
				dateClassName: 'date-purple',
				label: '생일',
				labelClassName: 'my-birth-day'
			},
			{
				type: 'period', // 특정 기간
				startDate: '2018/12/05',
				endDate: '2018/12/11',
				label: '중간고사',
				labelClassName: 'exam'
			},
			{
				type: 'period-date', // 특정 기간 동안의 날짜
				startDate: '2018/11/01',
				endDate: '2018/12/15',
				date: '09',
				label: '9일',
				labelClassName: 'nine'
			},
			{
				type: 'period-day', // 특정 기간 동안의 요일
				startDate: '2018/11/01',
				endDate: '2018/12/15',
				day: '3',
				label: '수요일',
				labelClassName: 'wed'
			}
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
				{/* {dates.length !== 0
					? dates.map((a, i) => {
							return <div key={i}>{`${a.getFullYear()} ${a.getMonth()} ${a.getDate()}`}</div>;
					  })
					: null} */}
			</div>
		);
	}
}

export default App;
</pre>

### mode
<ol>
  <li>one</li>
  <img src="https://user-images.githubusercontent.com/31440203/50450157-6ca0ad00-096f-11e9-9c77-ace525f25bf7.PNG">
  <pre>mode:{
    type: 'one'
    tdClassName: 'selected' 
  }</pre>
  <li>multi</li>
   <img src="https://user-images.githubusercontent.com/31440203/50450159-6e6a7080-096f-11e9-9793-d643497692f7.PNG">
  <pre>mode:{
    type: 'multi'
    tdClassName: 'selected' 
  }</pre>
  <li>period</li>
   <img src="https://user-images.githubusercontent.com/31440203/50450160-6f9b9d80-096f-11e9-8f50-8b62e6f9dc1a.PNG">
  <pre>mode:{
    type: 'period'
    tdClassName: 'selected' 
    startClassName: 'start-selected'
    endClassName: 'end-selected'
  }</pre>
</ol>

### markings
<ol>
  <li>repetition-date</li>
  <li>repetition-day</li>
  <li>one-date</li>
  <li>period</li>
  <li>period-date</li>
  <li>period-day</li>
</ol>
<pre>
dgasdg
</pre>

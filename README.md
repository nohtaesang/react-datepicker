수정중...
# React date-picker component ( 2018.12.26 )

## Example
```
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
		 mode: { type: 'one', tdClassName: 'selected' }, 
		 markings: [
			{
				type: 'repetition-date', 
				date: '12/25',
				dateClassName: 'holiday',
				label: 'X-Mas',
				labelClassName: 'x-mas'
			},
			{
				type: 'repetition-day', 
				day: '0',
				dateClassName: 'holiday'
			},
			{
				type: 'one-date', 
				date: '2019/01/05',
				dateClassName: 'date-orange',
				label: '생일',
				labelClassName: 'my-birth-day'
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
			</div>
		);
	}
}
export default App;
```

<img width="363" alt="2018-12-27 3 45 55" src="https://user-images.githubusercontent.com/31440203/50469419-a4e7d000-09ef-11e9-8e5a-e67d636e8426.png">


### mode
#### 날짜를 선택하는 방식을 정할 수 있다 (one, multi, period)
<ol>
  <li>one: 특정 날짜를 선택할 수 있다</li>	
  <code>mode: { type: 'one', tdClassName: 'selected' }</code>
	<br>
	<img width="365" alt="2018-12-27 3 46 27" src="https://user-images.githubusercontent.com/31440203/50469422-a618fd00-09ef-11e9-97f3-93260f396ad1.png">
	<br>
	<img width="275" alt="2018-12-27 3 46 45" src="https://user-images.githubusercontent.com/31440203/50469424-a6b19380-09ef-11e9-813e-e6ecf66bc935.png">
	<br>
	<img width="207" alt="2018-12-27 3 52 35" src="https://user-images.githubusercontent.com/31440203/50469445-bc26bd80-09ef-11e9-9e33-bdf8ac69ec56.png">
	<br>
  <li>multi: 다수의 날짜를 선택할 수 있다</li>
  <code>mode: { type: 'multi', tdClassName: 'selected' }</code>
	<br>
	<img width="363" alt="2018-12-27 3 48 32" src="https://user-images.githubusercontent.com/31440203/50469430-add8a180-09ef-11e9-95cb-e1b8f2e25d81.png">
	<br>
	<img width="278" alt="2018-12-27 3 48 46" src="https://user-images.githubusercontent.com/31440203/50469432-b16c2880-09ef-11e9-9d63-1f3e1ce91c4b.png">
 
  <li>period: 특정 기간을 선택할 수 있다</li>
  <code>mode:{ type: 'period', startClassName: 'start-selected', endClassName: 'end-selected', tdClassName: 'selected' }</code>
  <br>
  <img width="359" alt="2018-12-27 3 52 59" src="https://user-images.githubusercontent.com/31440203/50469436-b6c97300-09ef-11e9-9282-3be97e960417.png">
  <br>
  <img width="375" alt="2018-12-27 3 53 07" src="https://user-images.githubusercontent.com/31440203/50469441-b9c46380-09ef-11e9-81a5-10a513d4b9ee.png">
  <br>
  <img width="211" alt="2018-12-27 3 52 39" src="https://user-images.githubusercontent.com/31440203/50469448-bdf08100-09ef-11e9-9eba-4801fbf223c5.png">
  <br>
</ol>

### markings
#### 캘린더에 미리 디자인을 적용할 수 (repetition-date, repetition-day, one-date, period, period-date, period-day)
<ol>
  <li>repetition-date: 연도와 상관 없이 특정 월, 일에 맞는 날짜를 선택한다</li>
	<code>
	markings:[{ type: 'repetition-date', date: '12/25', dateClassName: 'holiday', label: 'X-Mas', labelClassName: 'x-mas'}]
	</code>
	
  <li>repetition-day: 특정 요일에 맞는 날짜를 선택한다</li>
  	<code>
	markings:[{ type: 'repetition-day', day: '0', dateClassName: 'holiday'}]
	</code>
  	
  
  <li>one-date: 연, 월, 일에 맞는 날짜를 선택한다</li>
  	<code>
	markings:[{ type: 'one-date', date: '2019/01/05', dateClassName: 'date-orange', label: '생일', labelClassName: 'my-birth-day'}]
	</code>
  
  <li>period: 특정 기간을 선택한다</li>
  	<code>
	markings:[{ type: 'period', startDate: '2018/12/05', endDate: '2018/12/11', label: 'Exam', labelClassName: 'exam'}]
	</code>
  
  <li>period-date: 특정 기간 동안에 특정 일과 일치하는 날짜를 선택한다</li>
  	<code>
  	markings:[{ type: 'period-date', startDate: '2018/11/01', endDate: '2018/12/15', date: '09', label: '9일', labelClassName: 'nine'}]
  	</code>
  <li>period-day: 특정 기간 동안에 특정 요일과 일치하는 날짜를 선택한다</li>
  	<code>
	markings:[{ type: 'period-day', startDate: '2018/11/01', endDate: '2018/12/15', day: '3',label: '수요일',labelClassName: 'wed'}]
	</code>

</ol>

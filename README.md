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
				label: 'X-mas',
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
				dateClassName: 'date-purple',
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

### mode
#### 날짜를 선택하는 방식을 정할 수 있다
<ol>
  <li>one: 특정 날짜를 선택할 수 있다</li>	
  <code>mode: { type: 'one', tdClassName: 'selected' }</code>
		 

  <li>multi: 다수의 날짜를 선택할 수 있다</li>
  <code>mode: { type: 'multi', tdClassName: 'selected' }</code>
 
  <li>period: 특정 기간을 선택할 수 있다</li>
  <code>mode:{ type: 'period', startClassName: 'start-selected', endClassName: 'end-selected', tdClassName: 'selected' }</code>
  
</ol>

### markings
<ol>
  <li>repetition-date</li>
	<code>
	markings:[{ type: 'repetition-date', date: '12/25', dateClassName: 'holiday', label: 'X-Mas', labelClassName: 'x-mas'}]
	</code>
	
  <li>repetition-day</li>
  	<code>
	markings:[{ type: 'repetition-day', day: '0', dateClassName: 'holiday'}]
	</code>
  	
  
  <li>one-date</li>
  	<code>
	markings:[{ type: 'one-date', date: '2019/01/05', dateClassName: 'date-orange', label: '생일', labelClassName: 'my-birth-day'}]
	</code>
  
  <li>period</li>
  	<code>
	markings:[{ type: 'period', startDate: '2018/12/05', endDate: '2018/12/11', label: 'Exam', labelClassName: 'exam'}]
	</code>
  
  <li>period-date</li>
  	<code>
  	markings:[{ type: 'period-date', startDate: '2018/11/01', endDate: '2018/12/15', date: '09', label: '9일', labelClassName: 'nine'}]
  	</code>
  <li>period-day</li>
  	<code>
	markings:[{ type: 'period-day', startDate: '2018/11/01', endDate: '2018/12/15', day: '3',label: '수요일',labelClassName: 'wed'}]
	</code>

</ol>

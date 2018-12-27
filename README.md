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
#### 캘린더에 미리 디자인을 적용할 수 있다 (repetition-date, repetition-day, one-date, period, period-date, period-day)
<ol>
  <li>repetition-date: 연도와 상관 없이 특정 월, 일에 맞는 날짜를 선택한다</li>
	<code>
	markings:[{ type: 'repetition-date', date: '12/25', dateClassName: 'holiday', label: 'X-Mas', labelClassName: 'x-mas'}]
	</code>
	<br>
	<img width="365" alt="2018-12-27 4 05 17" src="https://user-images.githubusercontent.com/31440203/50470069-8f27da00-09f2-11e9-9151-2a9664b2ffb3.png">
	<br>
	<img width="197" alt="2018-12-27 4 06 16" src="https://user-images.githubusercontent.com/31440203/50470071-90590700-09f2-11e9-91e5-9e3ef040129f.png">
	<br>
	<img width="285" alt="2018-12-27 4 05 41" src="https://user-images.githubusercontent.com/31440203/50470073-918a3400-09f2-11e9-88be-fe6727af3ce3.png">
	<br>
	
  <li>repetition-day: 특정 요일에 맞는 날짜를 선택한다</li>
  	<code>
	markings:[{ type: 'repetition-day', day: '0', dateClassName: 'holiday'}]
	</code>
	<br>
	<img width="362" alt="2018-12-27 4 06 48" src="https://user-images.githubusercontent.com/31440203/50470077-9818ab80-09f2-11e9-907c-aa4657fc9935.png">
	<br>
  	
  
  <li>one-date: 연, 월, 일에 맞는 날짜를 선택한다</li>
  	<code>
	markings:[{ type: 'one-date', date: '2019/01/05', dateClassName: 'date-orange', label: '생일', labelClassName: 'my-birth-day'}]
	</code>
	<br>
	<img width="358" alt="2018-12-27 4 09 54" src="https://user-images.githubusercontent.com/31440203/50470081-9d75f600-09f2-11e9-8ac3-c3711d8abd92.png">
	<br>
  
  <li>period: 특정 기간을 선택한다</li>
  	<code>
	markings:[{ type: 'period', startDate: '2018/12/05', endDate: '2018/12/11', label: 'Exam', labelClassName: 'exam'}]
	</code>
	<br>
	<img width="362" alt="2018-12-27 4 08 24" src="https://user-images.githubusercontent.com/31440203/50470099-a666c780-09f2-11e9-8a77-10d0c70b2a0e.png">
	<br>
  
  <li>period-date: 특정 기간 동안에 특정 일과 일치하는 날짜를 선택한다</li>
  	<code>
  	markings:[{ type: 'period-date', startDate: '2018/11/01', endDate: '2018/12/15', date: '09', label: '9일', labelClassName: 'nine'}]
  	</code>
	<br>
	<img width="360" alt="2018-12-27 4 11 09" src="https://user-images.githubusercontent.com/31440203/50470089-a1097d00-09f2-11e9-9dd3-e37cee5f14a2.png">
	<br>
	<img width="360" alt="2018-12-27 4 11 20" src="https://user-images.githubusercontent.com/31440203/50470096-a49d0400-09f2-11e9-8cba-feac812e5dfc.png">
	<br>
	
  <li>period-day: 특정 기간 동안에 특정 요일과 일치하는 날짜를 선택한다</li>
  	<code>
	markings:[{ type: 'period-day', startDate: '2018/11/01', endDate: '2018/12/15', day: '3',label: '수요일',labelClassName: 'wed'}]
	</code>
	<br>
	<img width="360" alt="2018-12-27 4 12 15" src="https://user-images.githubusercontent.com/31440203/50470103-a797f480-09f2-11e9-9862-3f760f82d01f.png">
	<br>

  <li> 모두 적용한 형태</li>
  	<br>
  	<img width="363" alt="2018-12-27 4 12 50" src="https://user-images.githubusercontent.com/31440203/50470105-a8c92180-09f2-11e9-87b1-2cb8959b3768.png">
  	<br>

</ol>

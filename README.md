# React calendar component ( 2018.12.26 )
<hr>

## Example 
http://ec2-54-89-58-158.compute-1.amazonaws.com
<hr>

## Usage
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
<ol>
  <li>one</li>
  <img src="https://user-images.githubusercontent.com/31440203/50450157-6ca0ad00-096f-11e9-9c77-ace525f25bf7.PNG">
<code>
  mode:{
    type: 'one'
    tdClassName: 'selected' 
  }
</code>
<img src="https://user-images.githubusercontent.com/31440203/50450162-71fdf780-096f-11e9-8e94-d32cdf971c64.PNG">

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

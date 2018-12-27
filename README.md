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
<ol>
  <li>one</li>	
	<pre> mode: { 
		type: 'one', 
		tdClassName: 'selected' 
		} </pre>
		 

  <li>multi</li>
  	<pre> mode: { 
		type: 'multi', 
		tdClassName: 'selected' 
		} </pre>
 
  <li>period</li>
  <pre>	mode:{ 
  		type: 'period', 
		startClassName: 'start-selected', 
		endClassName: 'end-selected', 
		tdClassName: 'selected' 
		}</pre>
  
</ol>

### markings
<ol>
  <li>repetition-date</li>
	<pre>markings:[{
			type: 'repetition-date',
			date: '12/25',
		 	dateClassName: 'holiday',
		 	label: 'X-Mas',
			labelClassName: 'x-mas'
		 }]</pre>
	
  <li>repetition-day</li>
  
  <li>one-date</li>
  
  <li>period</li>
  
  <li>period-date</li>
  
  <li>period-day</li>

</ol>

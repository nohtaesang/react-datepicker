수정중...
# React date-picker component ( 2018.12.26 )

## Example 
http://ec2-54-89-58-158.compute-1.amazonaws.com


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

  <li>multi</li>
 
  <li>period</li>
  
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

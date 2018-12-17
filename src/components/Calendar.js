import React, { Component } from 'react';

class Calendar extends Component {
	constructor() {
		super();
		this.state = {
			isLoading: false,
			mode: '',
			markings: [],
			selectedDates: [],
			isActive: false,
			curDate: '',
			curCalendar: {}
		};
	}

	// 초기화
	componentWillMount() {
		this.initCalendarState()
			.then(() => {
				this.setCurCalendar();
			})
			.then(() => {
				this.setState({ isLoading: true });
			});
	}

	initCalendarState = () => new Promise((resolve, reject) => {
		const { mode = 'one', markings = [], isActive = true } = this.props;
		const curDate = new Date();
		this.setState({
			mode,
			markings,
			isActive,
			curDate
		});
		resolve(true);
	});

	returnSelectedDates = () => new Promise((resolve, reject) => {
		const { dates } = this.state;
		this.props.getDates(dates);
		resolve(true);
	});

	resetSelectedDates = () => new Promise((resolve, reject) => {
		this.setState({
			selectedDates: []
		});
	});

	toggleIsActive = () => new Promise((resolve, reject) => {
		const { isActive } = this.state;
		this.setState({
			isActive: !isActive
		});
	});

	changeMode = mode => new Promise((resolve, reject) => {
		this.setState({
			mode
		});
	});

	clickDate = async e => {
		console.log(e.target.name);
	};

	clickChangeDate = async (type, value) => {
		const { curDate } = this.state;
		let newDate;
		if (type === 'year') {
			newDate = new Date(
				curDate.getFullYear() + value,
				curDate.getMonth(),
				curDate.getDate()
			);
		} else {
			newDate = new Date(
				curDate.getFullYear(),
				curDate.getMonth() + value,
				curDate.getDate()
			);
		}

		await this.changeDate(newDate);
		await this.setCurCalendar();
	};

	changeDate = newDate => new Promise((resolve, reject) => {
		this.setState({
			curDate: newDate
		});
		resolve(true);
	});

	resetCurDate = () => {
		const curDate = new Date();
		this.setState({
			curDate
		});

		this.setCurCalendar();
	};

	setCurCalendar = () => new Promise((resolve, reject) => {
		const { curDate } = this.state;
		const curYear = curDate.getFullYear();
		const curMonth = curDate.getMonth();
		const beforeFirstDate = new Date(curYear, curMonth, 0);
		const firstDate = new Date(curYear, curMonth, 1);
		const lastDate = new Date(curYear, curMonth + 1, 0);
		let curCalendar = [];
		let offset = firstDate.getDay();
		while (offset) {
			offset -= 1;
			curCalendar = curCalendar.concat([
				`<td>${beforeFirstDate.getDate() - offset}</td>`
			]);
		}

		while (offset < lastDate.getDate()) {
			curCalendar = curCalendar.concat([
				`<td>${firstDate.getDate() + offset}</td>`
			]);
			offset += 1;
		}
		offset = lastDate.getDay();
		let offset2 = 1;
		while (offset < 6) {
			curCalendar = curCalendar.concat([`<td>${offset2}</td>`]);
			offset2 += 1;
			offset += 1;
		}
		const trNum = Math.floor(curCalendar.length / 7);
		let table =				'<tr><td>일</td><td>월</td><td>화</td><td>수</td><td>목</td><td>금</td><td>토</td></tr>';
		for (let i = 0; i < trNum; i += 1) {
			table += '<tr>';
			for (let j = 0; j < 7; j += 1) {
				table += curCalendar[i * 7 + j];
			}
			table += '</tr>';
		}

		this.setState({
			curCalendar: table
		});
		resolve(true);
	});

	render() {
		const { isLoading, curDate, curCalendar } = this.state;

		return (
			<div className="Calendar">
				<button type="button" id="toggleCalendar" onClick={this.toggleIsActive}>
					{'toggleCalendar'}
				</button>
				<button
					type="button"
					id="resetSelectedDates"
					onClick={this.resetSelectedDates}
				>
					{'resetSelectedDates'}
				</button>
				<div id="Calendar">
					<button
						type="button"
						id="prevCurYear"
						onClick={() => this.clickChangeDate('year', -1)}
					>
						{'prevCurYear'}
					</button>
					<p>{curDate.getFullYear()}</p>
					<button
						type="button"
						id="nextCurYear"
						onClick={() => this.clickChangeDate('year', 1)}
					>
						{'nextCurYear'}
					</button>
					<button
						type="button"
						id="prevCurMonth"
						onClick={() => this.clickChangeDate('month', -1)}
					>
						{'prevCurMonth'}
					</button>
					<p>{curDate.getMonth() + 1}</p>
					<button
						type="button"
						id="nextCurMonth"
						onClick={() => this.clickChangeDate('month', 1)}
					>
						{'nextCurMonth'}
					</button>
					<button type="button" id="resetCurDate" onClick={this.resetCurDate}>
						{'resetCurDate'}
					</button>
					{isLoading ? (
						<table dangerouslySetInnerHTML={{ __html: curCalendar }} />
					) : null}

					<button
						type="button"
						id="returnSelectedDates"
						onClick={this.returnSelectedDates}
					>
						{'returnSelectedDates'}
					</button>
				</div>
			</div>
		);
	}
}

export default Calendar;

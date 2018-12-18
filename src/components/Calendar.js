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
			curDate: new Date(),
			firstDate: '',
			lastDate: '',
			curCalendarDates: [],
			isChangingDate: false
		};
	}

	componentWillMount() {
		this.init();
	}

	// 초기화 함수
	init = async () => {
		await this.loadCalendarProps();
		await this.resetCurDate();
		await this.getFirstAndLastDate();
		await this.setCurCalendarDates();
		await this.applyRules();

		this.setState({ isLoading: true });
	};

	// 부모 컴포넌트로 부터 속성 받아오기
	loadCalendarProps = () =>
		new Promise((resolve, reject) => {
			const { mode = 'one', markings = [], isActive = true } = this.props;
			this.setState({
				mode,
				markings,
				isActive
			});
			resolve(true);
		});

	// curDate를 오늘 날짜로 초기화 하기
	resetCurDate = () =>
		new Promise((resolve, reject) => {
			this.setState({
				curDate: new Date()
			});
			resolve(true);
		});

	// selectedDates를 부모 컴포넌트로 리턴하기
	returnSelectedDates = () =>
		new Promise((resolve, reject) => {
			this.props.getDates(this.state);
			resolve(true);
		});

	// selectedDates 초기화 하기
	resetSelectedDates = () =>
		new Promise((resolve, reject) => {
			this.setState({
				selectedDates: []
			});
		});

	// isActive 상태 바꾸기
	toggleIsActive = () =>
		new Promise((resolve, reject) => {
			const { isActive } = this.state;
			this.setState({
				isActive: !isActive
			});
			resolve(true);
		});

	// mode 바꾸기
	changeMode = (mode) =>
		new Promise((resolve, reject) => {
			this.setState({
				mode
			});
			resolve(true);
		});

	// TODO: date 클릭
	clickDate = async (e) => {
		console.log(e.target.name);
	};

	// curDate를 바꾸는 이벤트 (year, month)
	clickChangeDate = async (type, value) => {
		const { curDate } = this.state;
		let newDate = null;
		if (type === 'year') {
			newDate = new Date(curDate.getFullYear() + value, curDate.getMonth(), curDate.getDate());
		} else {
			newDate = new Date(curDate.getFullYear(), curDate.getMonth() + value, curDate.getDate());
		}

		await this.changeDate(newDate);
		await this.getFirstAndLastDate();
		await this.setCurCalendarDates();
		await this.applyRules();
	};

	// curDate를 바꿈
	changeDate = (newDate) =>
		new Promise((resolve, reject) => {
			if (!this.isChangingDate) {
				this.setState({
					curDate: newDate,
					isChangingDate: true
				});

				resolve(true);
			} else {
				reject();
			}
		});

	// FIXME: 1. getFirstAndLastDate, 2. setCurCalendarDates, 3. applyRule, 4. applySelected

	getFirstAndLastDate = () =>
		new Promise((resolve, reject) => {
			const { curDate } = this.state;
			const curYear = curDate.getFullYear();
			const curMonth = curDate.getMonth();
			let firstDate = new Date(curYear, curMonth, 1);
			firstDate = new Date(curYear, curMonth, -firstDate.getDay() + 1);
			let lastDate = new Date(curYear, curMonth + 1, 0);
			lastDate = new Date(curYear, curMonth + 1, 6 - lastDate.getDay());

			this.setState({
				firstDate,
				lastDate
			});
			resolve(true);
		});

	setCurCalendarDates = () =>
		new Promise((resolve, reject) => {
			const { firstDate, lastDate } = this.state;
			let tempDate = new Date(firstDate);
			let curCalendarDates = [];
			let index = 0;
			while (true) {
				curCalendarDates = curCalendarDates.concat([
					{
						year: tempDate.getFullYear(),
						month: tempDate.getMonth(),
						date: tempDate.getDate(),
						day: tempDate.getDay(),
						className: [ 'date' ],
						label: []
					}
				]);

				tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate() + 1);

				if (tempDate.getMonth() === lastDate.getMonth() && tempDate.getDate() === lastDate.getDate()) {
					curCalendarDates = curCalendarDates.concat([
						{
							year: tempDate.getFullYear(),
							month: tempDate.getMonth(),
							date: tempDate.getDate(),
							day: tempDate.getDay(),
							className: [ 'date' ],
							label: []
						}
					]);
					break;
				}
			}
			this.setState({
				curCalendarDates
			});
			resolve(true);
		});

	applyRules = () =>
		new Promise((resolve, reject) => {
			const { markings, firstDate, lastDate, curCalendarDates } = this.state;
			for (let i = 0; i < markings.length; i += 1) {
				const rule = markings[i];
				if (rule.type === 'one-date') {
					const year = Math.floor(rule.date.slice(0, 4));
					const month = Math.floor(rule.date.slice(5, 7));
					const date = Math.floor(rule.date.slice(8, 10));
					const ruleDate = new Date(year, month - 1, date);
					if (firstDate.getTime() <= ruleDate.getTime() && lastDate.getTime() >= ruleDate.getTime()) {
						for (let j = 0; j < curCalendarDates.length; j += 1) {
							if (curCalendarDates[j].month === month - 1 && curCalendarDates[j].date === date) {
								curCalendarDates[j].className = curCalendarDates[j].className.concat(rule.className);
								curCalendarDates[j].label = curCalendarDates[j].label.concat(rule.label);
								break;
							}
						}
					}
				} else if (rule.type === 'date') {
					const date = Math.floor(rule.date);
				} else if (rule.type === 'day') {
					const { day } = rule;
				} else if (rule.type === 'period') {
					const startYear = Math.floor(rule.startDate.slice(0, 4));
					const startMonth = Math.floor(rule.startDate.slice(5, 7));
					const startDate = Math.floor(rule.startDate.slice(8, 10));
					const startDateObject = new Date(startYear, startMonth, startDate);
					const endYear = Math.floor(rule.endDate.slice(0, 4));
					const endMonth = Math.floor(rule.endDate.slice(5, 7));
					const endDate = Math.floor(rule.endDate.slice(8, 10));
					const endDateObject = new Date(endYear, endMonth, endDate);
				} else if (rule.type === 'period-date') {
				} else if (rule.type === 'period-day') {
				}
			}
			resolve(true);
		});

	// TODO: DELETE
	// setCurCalendar = () =>
	// 	new Promise((resolve, reject) => {
	// 		const { curDate } = this.state;
	// 		const curYear = curDate.getFullYear();
	// 		const curMonth = curDate.getMonth();
	// 		const beforeFirstDate = new Date(curYear, curMonth, 0);
	// 		const firstDate = new Date(curYear, curMonth, 1);
	// 		const lastDate = new Date(curYear, curMonth + 1, 0);
	// 		let curCalendar = [];
	// 		let offset = firstDate.getDay();
	// 		while (offset) {
	// 			offset -= 1;
	// 			curCalendar = curCalendar.concat([ `<td>${beforeFirstDate.getDate() - offset}</td>` ]);
	// 		}

	// 		while (offset < lastDate.getDate()) {
	// 			curCalendar = curCalendar.concat([ `<td>${firstDate.getDate() + offset}</td>` ]);
	// 			offset += 1;
	// 		}
	// 		offset = lastDate.getDay();
	// 		let offset2 = 1;
	// 		while (offset < 6) {
	// 			curCalendar = curCalendar.concat([ `<td>${offset2}</td>` ]);
	// 			offset2 += 1;
	// 			offset += 1;
	// 		}
	// 		const trNum = Math.floor(curCalendar.length / 7);
	// 		let table = '<tr><td>일</td><td>월</td><td>화</td><td>수</td><td>목</td><td>금</td><td>토</td></tr>';
	// 		for (let i = 0; i < trNum; i += 1) {
	// 			table += '<tr>';
	// 			for (let j = 0; j < 7; j += 1) {
	// 				table += curCalendar[i * 7 + j];
	// 			}
	// 			table += '</tr>';
	// 		}

	// 		this.setState({
	// 			curCalendar: table
	// 		});
	// 		resolve(true);
	// 	});

	render() {
		const { isLoading, curDate } = this.state;
		return (
			<div className="Calendar">
				<button type="button" id="toggleCalendar" onClick={this.toggleIsActive}>
					{'toggleCalendar'}
				</button>
				<button type="button" id="resetSelectedDates" onClick={this.resetSelectedDates}>
					{'resetSelectedDates'}
				</button>
				<div id="Calendar">
					<button type="button" id="prevCurYear" onClick={() => this.clickChangeDate('year', -1)}>
						{'prevCurYear'}
					</button>
					<p>{curDate.getFullYear()}</p>
					<button type="button" id="nextCurYear" onClick={() => this.clickChangeDate('year', 1)}>
						{'nextCurYear'}
					</button>
					<button type="button" id="prevCurMonth" onClick={() => this.clickChangeDate('month', -1)}>
						{'prevCurMonth'}
					</button>
					<p>{curDate.getMonth() + 1}</p>
					<button type="button" id="nextCurMonth" onClick={() => this.clickChangeDate('month', 1)}>
						{'nextCurMonth'}
					</button>
					<button type="button" id="resetCurDate" onClick={this.resetCurDate}>
						{'resetCurDate'}
					</button>
					{/* {isLoading ? <table dangerouslySetInnerHTML={{ __html: curCalendar }} /> : null} */}

					<button type="button" id="returnSelectedDates" onClick={this.returnSelectedDates}>
						{'returnSelectedDates'}
					</button>
				</div>
			</div>
		);
	}
}

export default Calendar;

import React, { Component } from 'react';
// TODO:
// YYYY/MM/DD 형식을 date로 반환하는 함수 만들기
// date객체를 인자로 받아 크기를 비교하는 함수 만들기

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

	// TODO: date 클릭. MODE에 따른 분기 필요
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
			while (tempDate.getMonth() !== lastDate.getMonth() || tempDate.getDate() !== lastDate.getDate()) {
				curCalendarDates = curCalendarDates.concat([
					{
						date: tempDate,
						className: [ 'date' ],
						label: []
					}
				]);
				tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate() + 1);
			}
			curCalendarDates = curCalendarDates.concat([
				{
					date: tempDate,
					className: [ 'date' ],
					label: []
				}
			]);

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
					const ruleDate = new Date(
						Math.floor(rule.date.slice(0, 4)),
						Math.floor(rule.date.slice(5, 7)) - 1,
						Math.floor(rule.date.slice(8, 10))
					);

					if (firstDate.getTime() <= ruleDate.getTime() && lastDate.getTime() >= ruleDate.getTime()) {
						for (let j = 0; j < curCalendarDates.length; j += 1) {
							if (curCalendarDates[j].date.getTime() === ruleDate.getTime()) {
								curCalendarDates[j].className = curCalendarDates[j].className.concat(rule.className);
								curCalendarDates[j].label = curCalendarDates[j].label.concat(rule.label);
								break;
							}
						}
					}
				} else if (rule.type === 'repetition-date') {
					const date = Math.floor(rule.date);
					for (let j = 0; j < curCalendarDates.length; j += 1) {
						if (curCalendarDates[j].date.getDate() === date) {
							curCalendarDates[j].className = curCalendarDates[j].className.concat(rule.className);
							curCalendarDates[j].label = curCalendarDates[j].label.concat(rule.label);
						}
					}
				} else if (rule.type === 'repetition-day') {
					const day = Math.floor(rule.day);
					let index = 0;
					for (let j = 0; j < curCalendarDates.length; j += 1) {
						if (curCalendarDates[j].date.getDay() === day) {
							index = j;
							break;
						}
					}

					for (let j = index; j < curCalendarDates.length; j += 7) {
						curCalendarDates[j].className = curCalendarDates[j].className.concat(rule.className);
						curCalendarDates[j].label = curCalendarDates[j].label.concat(rule.label);
					}
				} else if (rule.type === 'period') {
					let startDate = new Date(
						Math.floor(rule.startDate.slice(0, 4)),
						Math.floor(rule.startDate.slice(5, 7)) - 1,
						Math.floor(rule.startDate.slice(8, 10))
					);

					let endDate = new Date(
						Math.floor(rule.endDate.slice(0, 4)),
						Math.floor(rule.endDate.slice(5, 7)) - 1,
						Math.floor(rule.endDate.slice(8, 10))
					);
					if (startDate.getTime() > lastDate.getTime() || endDate.getTime() < firstDate.getTime()) {
						continue;
					}
					if (startDate.getTime() < firstDate.getTime()) {
						startDate = firstDate;
					}
					if (endDate.getTime() > lastDate.getTime()) {
						endDate = lastDate;
					}

					for (let j = 0; j < curCalendarDates.length; j += 1) {
						if (curCalendarDates[j].date.getTime() > endDate.getTime()) break;
						if (curCalendarDates[j].date.getTime() >= startDate.getTime()) {
							curCalendarDates[j].className = curCalendarDates[j].className.concat(rule.className);
							curCalendarDates[j].label = curCalendarDates[j].label.concat(rule.label);
						}
					}
				} else if (rule.type === 'period-date') {
					let startDate = new Date(
						Math.floor(rule.startDate.slice(0, 4)),
						Math.floor(rule.startDate.slice(5, 7)) - 1,
						Math.floor(rule.startDate.slice(8, 10))
					);
					let endDate = new Date(
						Math.floor(rule.endDate.slice(0, 4)),
						Math.floor(rule.endDate.slice(5, 7)) - 1,
						Math.floor(rule.endDate.slice(8, 10))
					);
					if (startDate.getTime() > lastDate.getTime() || endDate.getTime() < firstDate.getTime()) {
						continue;
					}
					if (startDate.getTime() < firstDate.getTime()) {
						startDate = firstDate;
					}
					if (endDate.getTime() > lastDate.getTime()) {
						endDate = lastDate;
					}

					const date = Math.floor(rule.date);
					for (let j = 0; j < curCalendarDates.length; j += 1) {
						if (curCalendarDates[j].date.getTime() > endDate.getTime()) break;
						if (curCalendarDates[j].date.getTime() >= startDate.getTime()) {
							if (curCalendarDates[j].date.getDate() === date) {
								curCalendarDates[j].className = curCalendarDates[j].className.concat(rule.className);
								curCalendarDates[j].label = curCalendarDates[j].label.concat(rule.label);
							}
						}
					}
				} else if (rule.type === 'period-day') {
					let startDate = new Date(
						Math.floor(rule.startDate.slice(0, 4)),
						Math.floor(rule.startDate.slice(5, 7)) - 1,
						Math.floor(rule.startDate.slice(8, 10))
					);

					let endDate = new Date(
						Math.floor(rule.endDate.slice(0, 4)),
						Math.floor(rule.endDate.slice(5, 7)) - 1,
						Math.floor(rule.endDate.slice(8, 10))
					);
					if (startDate.getTime() > lastDate.getTime() || endDate.getTime() < firstDate.getTime()) {
						continue;
					}
					if (startDate.getTime() < firstDate.getTime()) {
						startDate = firstDate;
					}
					if (endDate.getTime() > lastDate.getTime()) {
						endDate = lastDate;
					}
					const day = Math.floor(rule.day);
					for (let j = 0; j < curCalendarDates.length; j += 1) {
						if (curCalendarDates[j].date.getTime() > endDate.getTime()) break;
						if (curCalendarDates[j].date.getTime() >= startDate.getTime()) {
							if (curCalendarDates[j].date.getDay() === day) {
								curCalendarDates[j].className = curCalendarDates[j].className.concat(rule.className);
								curCalendarDates[j].label = curCalendarDates[j].label.concat(rule.label);
							}
						}
					}
				}
			}
			resolve(true);
		});

	render() {
		const { isLoading, curDate, curCalendarDates } = this.state;
		console.log(curCalendarDates);
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

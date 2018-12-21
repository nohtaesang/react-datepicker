import React, { Component } from 'react';
import Cell from './Cell';
// TODO:
// TODO: YYYY/MM/DD 형식을 date로 반환하는 함수 만들기
// TODO: date객체를 인자로 받아 크기를 비교하는 함수 만들기
// FIXME: 우선순위
// TODO:
// 1. Calendara render 하기 (년, 월, 버튼, 날짜)
// 2. 기본 라인 CSS 형성하기
// 3. clickDate 구현하기. mode에 따라서 다르게 작동
// 3-1: one: 클릭 시 한개의 값만 유지 (클래스 네임, 라벨)
// 3-2: 이상: 클릭 시 배열에서 검색 후 추가, 삭제 (클래스 네임, 라벨(배열로 받아올 시, 인덱스 순서대로. 배열 초과시 기본 값으로(무엇을 기본값으로 할까?)))
// 3-3: period: 클릭은 1~2. 시작과 끝. 다시 선택하면 시작부터 (클래스 네임(시작, 중간, 끝), 라벨(시작, 끝))

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
			isChangingDate: false,
			curSelectedDateIndex: null
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

	// selectedDates 초기화 하기
	resetSelectedDates = () =>
		new Promise((resolve, reject) => {
			this.setState({
				selectedDates: []
			});
		});

	// selectedDates를 부모 컴포넌트로 리턴하기
	returnSelectedDates = () =>
		new Promise((resolve, reject) => {
			this.props.getDates(this.state);
			resolve(true);
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
			const { curDate, firstDate, lastDate } = this.state;
			const curMonth = curDate.getMonth();
			let tempDate = new Date(firstDate);
			let curCalendarDates = [];
			while (tempDate.getMonth() !== lastDate.getMonth() || tempDate.getDate() !== lastDate.getDate()) {
				if (curMonth === tempDate.getMonth()) {
					curCalendarDates = curCalendarDates.concat([
						{
							date: tempDate,
							tdClassName: [],
							dateClassName: [ 'date' ],
							label: [],
							labelClassName: [ 'label' ]
						}
					]);
				} else {
					curCalendarDates = curCalendarDates.concat([
						{
							date: tempDate,
							tdClassName: [ 'nonThisMonth' ],
							dateClassName: [ 'date' ],
							label: [],
							labelClassName: [ 'label' ]
						}
					]);
				}

				tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate() + 1);
			}
			if (curMonth === tempDate.getMonth()) {
				curCalendarDates = curCalendarDates.concat([
					{
						date: tempDate,
						tdClassName: [],
						dateClassName: [ 'date' ],
						label: [],
						labelClassName: [ 'label' ]
					}
				]);
			} else {
				curCalendarDates = curCalendarDates.concat([
					{
						date: tempDate,
						tdClassName: [ 'nonThisMonth' ],
						dateClassName: [ 'date' ],
						label: [],
						labelClassName: [ 'label' ]
					}
				]);
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
					const ruleDate = new Date(
						Math.floor(rule.date.slice(0, 4)),
						Math.floor(rule.date.slice(5, 7)) - 1,
						Math.floor(rule.date.slice(8, 10))
					);

					if (firstDate.getTime() <= ruleDate.getTime() && lastDate.getTime() >= ruleDate.getTime()) {
						for (let j = 0; j < curCalendarDates.length; j += 1) {
							if (curCalendarDates[j].date.getTime() === ruleDate.getTime()) {
								curCalendarDates[j].dateClassName = curCalendarDates[j].dateClassName.concat([
									rule.dateClassName
								]);
								curCalendarDates[j].label = curCalendarDates[j].label.concat([ rule.label ]);
								curCalendarDates[j].labelClassName = curCalendarDates[j].labelClassName.concat([
									rule.labelClassName
								]);
								break;
							}
						}
					}
				} else if (rule.type === 'repetition-date') {
					const month = Math.floor(rule.date.slice(0, 2) - 1);
					const date = Math.floor(rule.date.slice(3, 5));

					for (let j = 0; j < curCalendarDates.length; j += 1) {
						if (
							curCalendarDates[j].date.getMonth() === month &&
							curCalendarDates[j].date.getDate() === date
						) {
							curCalendarDates[j].dateClassName = curCalendarDates[j].dateClassName.concat(
								rule.dateClassName
							);
							curCalendarDates[j].label = curCalendarDates[j].label.concat(rule.label);
							curCalendarDates[j].labelClassName = curCalendarDates[j].labelClassName.concat(
								rule.labelClassName
							);
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
						curCalendarDates[j].dateClassName = curCalendarDates[j].dateClassName.concat(
							rule.dateClassName
						);
						curCalendarDates[j].label = curCalendarDates[j].label.concat(rule.label);
						curCalendarDates[j].labelClassName = curCalendarDates[j].labelClassName.concat(
							rule.labelClassName
						);
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
							curCalendarDates[j].dateClassName = curCalendarDates[j].dateClassName.concat(
								rule.dateClassName
							);
							curCalendarDates[j].label = curCalendarDates[j].label.concat(rule.label);
							curCalendarDates[j].labelClassName = curCalendarDates[j].labelClassName.concat(
								rule.labelClassName
							);
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
								curCalendarDates[j].dateClassName = curCalendarDates[j].dateClassName.concat(
									rule.dateClassName
								);
								curCalendarDates[j].label = curCalendarDates[j].label.concat(rule.label);
								curCalendarDates[j].labelClassName = curCalendarDates[j].labelClassName.concat(
									rule.labelClassName
								);
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
								curCalendarDates[j].dateClassName = curCalendarDates[j].dateClassName.concat(
									rule.dateClassName
								);
								curCalendarDates[j].label = curCalendarDates[j].label.concat(rule.label);
								curCalendarDates[j].labelClassName = curCalendarDates[j].labelClassName.concat(
									rule.labelClassName
								);
							}
						}
					}
				}
			}
			resolve(true);
		});

	applySelectedDate = () =>
		new Promise((resolve, reject) => {
			const { mode, curCalendarDates, selectedDates } = this.state;
			if (mode.type === 'one') {
				if (selectedDates.length === 0) return;

				for (let i = 0; i < curCalendarDates.length; i += 1) {
					if (curCalendarDates[i].date.getTime() === selectedDates[0].date.getTime()) {
						curCalendarDates[i].tdClassName = curCalendarDates[i].tdClassName.concat(mode.tdClassName);
						break;
					}
				}
			}

			resolve(true);
		});

	getCurSelectedDateIndex = async (index) => {
		const { mode, selectedDates, curCalendarDates, curSelectedDateIndex } = this.state;

		if (mode.type === 'one') {
			if (selectedDates.length === 0) {
				// 선택된 date가 없을 경우
				this.setState({
					selectedDates: [ curCalendarDates[index] ]
				});
				curCalendarDates[index].tdClassName = curCalendarDates[index].tdClassName.concat(mode.tdClassName);
			} else if (selectedDates[0].date.getTime() === curCalendarDates[index].date.getTime()) {
				// 선택한 date가 이미 선택된 date 일 경우
				curCalendarDates[index].tdClassName.splice(
					curCalendarDates[index].tdClassName.indexOf(mode.tdClassName),
					1
				);
				this.setState({
					selectedDates: []
				});
			} else {
				// 선택한 date가 이미 선택된 date와 다를 경우
				for (let i = 0; i < curCalendarDates.length; i += 1) {
					const beforeSelectedDateIndex = curCalendarDates[i].tdClassName.indexOf(mode.tdClassName);
					if (beforeSelectedDateIndex !== -1) {
						curCalendarDates[i].tdClassName.splice(
							curCalendarDates[i].tdClassName.indexOf(mode.tdClassName),
							1
						);
						break;
					}
				}

				curCalendarDates[index].tdClassName = curCalendarDates[index].tdClassName.concat(mode.tdClassName);

				this.setState({
					selectedDates: [ curCalendarDates[index] ]
				});
			}
		}
	};

	// curDate를 바꾸는 이벤트 (year, month)
	clickChangeDate = async (type, value) => {
		if (!this.state.isLoading) {
			return;
		}
		this.setState({ isLoading: false });
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
		await this.applySelectedDate();

		this.setState({ isLoading: true });
	};

	clickResetCurDate = async () => {
		await this.resetCurDate();
		await this.getFirstAndLastDate();
		await this.setCurCalendarDates();
		await this.applyRules();
	};

	render() {
		const { isLoading, curDate, curCalendarDates, curSelectedDateIndex } = this.state;
		const rowNum = new Array(curCalendarDates.length / 7).fill(null);

		return (
			<div className="nohCalendar">
				<div className="yearAndMonth">
					<button type="button" id="prevCurMonth" onClick={() => this.clickChangeDate('month', -1)}>
						{'<'}
					</button>
					<div>{`${curDate.getFullYear()} /  ${curDate.getMonth() + 1}`}</div>
					<button type="button" id="nextCurMonth" onClick={() => this.clickChangeDate('month', 1)}>
						{'>'}
					</button>
				</div>
				<div className="calendar">
					<table>
						<tbody>
							<tr>
								<td>SUN</td>
								<td>MON</td>
								<td>TUE</td>
								<td>WED</td>
								<td>THU</td>
								<td>FRI</td>
								<td>SAT</td>
							</tr>
							{rowNum.map((a, i) => (
								<tr key={i}>
									<Cell
										info={curCalendarDates[i * 7]}
										index={i * 7}
										getCurSelectedDateIndex={this.getCurSelectedDateIndex}
									/>
									<Cell
										info={curCalendarDates[i * 7 + 1]}
										index={i * 7 + 1}
										getCurSelectedDateIndex={this.getCurSelectedDateIndex}
									/>
									<Cell
										info={curCalendarDates[i * 7 + 2]}
										index={i * 7 + 2}
										getCurSelectedDateIndex={this.getCurSelectedDateIndex}
									/>
									<Cell
										info={curCalendarDates[i * 7 + 3]}
										index={i * 7 + 3}
										getCurSelectedDateIndex={this.getCurSelectedDateIndex}
									/>
									<Cell
										info={curCalendarDates[i * 7 + 4]}
										index={i * 7 + 4}
										getCurSelectedDateIndex={this.getCurSelectedDateIndex}
									/>
									<Cell
										info={curCalendarDates[i * 7 + 5]}
										index={i * 7 + 5}
										getCurSelectedDateIndex={this.getCurSelectedDateIndex}
									/>
									<Cell
										info={curCalendarDates[i * 7 + 6]}
										index={i * 7 + 6}
										getCurSelectedDateIndex={this.getCurSelectedDateIndex}
									/>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="option">
					<button type="button" id="resetCurDate" onClick={this.clickResetCurDate}>
						{'resetCurDate'}
					</button>

					<button type="button" id="returnSelectedDates" onClick={this.returnSelectedDates}>
						{'returnSelectedDates'}
					</button>
				</div>
			</div>
		);
	}
}

export default Calendar;

import React, { Component } from 'react';
import Cell from './Cell';

class Calendar extends Component {
	constructor() {
		super();
		this.state = {
			isActive: false,
			mode: '',
			markings: [],
			curDate: new Date(),
			curCalendarDates: [],
			selectedDates: []
		};
	}

	componentWillMount() {
		this.init();
	}

	// 초기화 함수
	init = async () => {
		await this.loadProps();
		await this.buildCalendar(new Date());
	};

	// 부모 컴포넌트로 부터 속성 받아오기
	loadProps = () =>
		new Promise((resolve, reject) => {
			const { mode = 'one', markings = [], isActive = true } = this.props;
			this.setState({
				mode,
				markings,
				isActive
			});
			resolve(true);
		});

	// FIXME: 최적화
	// 켈린더 만들기
	buildCalendar = newDate =>
		new Promise((resolve, reject) => {
			const { markings, mode, selectedDates } = this.state;
			// 1. 달력의 첫 날과 마지막 날을 구한다.
			const curDate = newDate;
			const curYear = curDate.getFullYear();
			const curMonth = curDate.getMonth();
			let firstDate = new Date(curYear, curMonth, 1);
			firstDate = new Date(curYear, curMonth, -firstDate.getDay() + 1);
			let lastDate = new Date(curYear, curMonth + 1, 0);
			lastDate = new Date(curYear, curMonth + 1, 6 - lastDate.getDay());

			// 2. 첫 날과 마지막 날을 이용하여 달력을 구성한다.
			let tempDate = new Date(firstDate);
			let curCalendarDates = [];
			while (tempDate.getMonth() !== lastDate.getMonth() || tempDate.getDate() !== lastDate.getDate()) {
				if (curMonth === tempDate.getMonth()) {
					curCalendarDates = curCalendarDates.concat([
						{
							date: tempDate,
							tdClassName: [],
							dateClassName: ['date'],
							label: [],
							labelClassName: ['label']
						}
					]);
				} else {
					curCalendarDates = curCalendarDates.concat([
						{
							date: tempDate,
							tdClassName: ['nonThisMonth'],
							dateClassName: ['date'],
							label: [],
							labelClassName: ['label']
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
						dateClassName: ['date'],
						label: [],
						labelClassName: ['label']
					}
				]);
			} else {
				curCalendarDates = curCalendarDates.concat([
					{
						date: tempDate,
						tdClassName: ['nonThisMonth'],
						dateClassName: ['date'],
						label: [],
						labelClassName: ['label']
					}
				]);
			}

			// 3. props에서 정한 rule을 적용한다.
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
								curCalendarDates[j].label = curCalendarDates[j].label.concat([rule.label]);
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

			// 4. selectedDates를 적용한다
			if (selectedDates.length !== 0) {
				if (mode.type === 'one') {
					for (let i = 0; i < curCalendarDates.length; i += 1) {
						if (curCalendarDates[i].date.getTime() === selectedDates[0].date.getTime()) {
							curCalendarDates[i].tdClassName = curCalendarDates[i].tdClassName.concat(mode.tdClassName);

							break;
						}
					}
				} else if (mode.type === 'multi') {
					if (
						selectedDates[0].getTime() > lastDate.getTime() ||
						selectedDates[selectedDates.length - 1].getTime() < firstDate.getTime()
					) {
					} else {
						let index = 0;
						for (let i = 0; i < curCalendarDates.length; i += 1) {
							if (index === selectedDates.length) break;
							for (let j = index; j < selectedDates.length; j += 1) {
								if (curCalendarDates[i].date.getTime() === selectedDates[j].getTime()) {
									curCalendarDates[i].tdClassName = curCalendarDates[i].tdClassName.concat(
										mode.tdClassName
									);
									index = j + 1;
								}
							}
						}
					}
				} else if (mode.type === 'period') {
					if (selectedDates.length === 2) {
						if (
							selectedDates[0].getTime() > lastDate.getTime() ||
							selectedDates[1].getTime() < firstDate.getTime()
						) {
						} else {
							for (let i = 0; i < curCalendarDates.length; i += 1) {
								if (curCalendarDates[i].date.getTime() >= selectedDates[0].getTime()) {
									if (curCalendarDates[i].date.getTime() > selectedDates[1].getTime()) break;
									curCalendarDates[i].tdClassName = curCalendarDates[i].tdClassName.concat(
										mode.tdClassName
									);
									if (curCalendarDates[i].date.getTime() === selectedDates[0].getTime()) {
										curCalendarDates[i].tdClassName = curCalendarDates[i].tdClassName.concat(
											mode.startClassName
										);
									}
									if (curCalendarDates[i].date.getTime() === selectedDates[1].getTime()) {
										curCalendarDates[i].tdClassName = curCalendarDates[i].tdClassName.concat(
											mode.endClassName
										);
									}
								}
							}
						}
					}
				}
			}

			this.setState({
				curDate,
				curCalendarDates
			});
			resolve(true);
		});

	// FIXME: 최적화
	// curDate를 바꾸는 이벤트 (year, month)
	clickChangeDate = async (type, value) => {
		const { curDate } = this.state;
		let newDate = null;
		if (type === 'year') {
			newDate = new Date(curDate.getFullYear() + value, curDate.getMonth(), curDate.getDate());
		} else {
			newDate = new Date(curDate.getFullYear(), curDate.getMonth() + value, curDate.getDate());
		}

		await this.buildCalendar(newDate);
	};

	// FIXME: 최적화
	// date cell을 클릭하여 selectedDates 를 수정한다.
	clickDate = async index => {
		const { mode, selectedDates, curCalendarDates } = this.state;

		if (mode.type === 'one') {
			if (selectedDates.length === 0) {
				// 선택된 date가 없을 경우
				curCalendarDates[index].tdClassName = curCalendarDates[index].tdClassName.concat(mode.tdClassName);
				this.setState({
					selectedDates: [curCalendarDates[index]]
				});
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
					selectedDates: [curCalendarDates[index]]
				});
			}
		} else if (mode.type === 'multi') {
			const curSelectedDate = curCalendarDates[index].date;
			if (selectedDates.length === 0) {
				// 선택된 date가 없을 경우
				curCalendarDates[index].tdClassName = curCalendarDates[index].tdClassName.concat(mode.tdClassName);
				selectedDates.push(curSelectedDate);
				this.setState({
					selectedDates
				});
			} else {
				// 선택한 date가 이미 선택된 date 일 경우
				const result = selectedDates.filter((d, i) => {
					if (d.getTime() === curSelectedDate.getTime()) {
						curCalendarDates[index].tdClassName.splice(
							curCalendarDates[index].tdClassName.indexOf(mode.tdClassName),
							1
						);

						selectedDates.splice(i, 1);
						return d;
					}
				});

				if (!result.length) {
					curCalendarDates[index].tdClassName = curCalendarDates[index].tdClassName.concat(mode.tdClassName);
					// 오름차순 삽입
					let i = 0;
					for (i = 0; i < selectedDates.length; i += 1) {
						if (selectedDates[i].getTime() > curSelectedDate.getTime()) {
							break;
						}
					}
					selectedDates.splice(i, 0, curSelectedDate);
				}
				this.setState({
					selectedDates
				});
			}
		} else if (mode.type === 'period') {
			const curSelectedDate = curCalendarDates[index].date;
			if (selectedDates.length === 0) {
				// 선택된 date가 없을 경우
				curCalendarDates[index].tdClassName = curCalendarDates[index].tdClassName.concat(mode.tdClassName);
				selectedDates.push(curSelectedDate);
				this.setState({
					selectedDates
				});
			} else if (selectedDates.length === 1) {
				// 선택한 date가 이미 선택된 date 일 경우
				if (selectedDates[0].getTime() === curSelectedDate.getTime()) {
					curCalendarDates[index].tdClassName.splice(
						curCalendarDates[index].tdClassName.indexOf(mode.tdClassName),
						1
					);

					selectedDates.splice(0, 1);
				} else {
					// 선택한 date가 이미 선택된 date와 다를 경우
					curCalendarDates[index].tdClassName = curCalendarDates[index].tdClassName.concat(mode.tdClassName);
					if (selectedDates[0].getTime() < curSelectedDate.getTime()) {
						selectedDates.push(curSelectedDate);
					} else {
						selectedDates.unshift(curSelectedDate);
					}

					for (let i = 0; i < curCalendarDates.length; i += 1) {
						if (curCalendarDates[i].date.getTime() > selectedDates[0].getTime()) {
							if (curCalendarDates[i].date.getTime() < selectedDates[1].getTime()) {
								curCalendarDates[i].tdClassName = curCalendarDates[i].tdClassName.concat(
									mode.tdClassName
								);
							}
						}
						if (curCalendarDates[i].date.getTime() === selectedDates[0].getTime()) {
							curCalendarDates[i].tdClassName = curCalendarDates[i].tdClassName.concat(
								mode.startClassName
							);
						}
						if (curCalendarDates[i].date.getTime() === selectedDates[1].getTime()) {
							curCalendarDates[i].tdClassName = curCalendarDates[i].tdClassName.concat(mode.endClassName);
							break;
						}
					}
				}

				this.setState({
					selectedDates
				});
			} else {
				for (let i = 0; i < curCalendarDates.length; i += 1) {
					if (curCalendarDates[i].date.getTime() >= selectedDates[0].getTime()) {
						if (curCalendarDates[i].date.getTime() <= selectedDates[1].getTime()) {
							curCalendarDates[i].tdClassName.splice(
								curCalendarDates[i].tdClassName.indexOf(mode.tdClassName),
								1
							);

							if (curCalendarDates[i].date.getTime() === selectedDates[0].getTime()) {
								curCalendarDates[i].tdClassName.splice(
									curCalendarDates[i].tdClassName.indexOf(mode.startClassName),
									1
								);
								console.log('z');
							}

							if (curCalendarDates[i].date.getTime() === selectedDates[1].getTime()) {
								curCalendarDates[i].tdClassName.splice(
									curCalendarDates[i].tdClassName.indexOf(mode.endClassName),
									1
								);
								break;
							}
						}
					}
				}
				selectedDates.splice(0, selectedDates.length);
				curCalendarDates[index].tdClassName = curCalendarDates[index].tdClassName.concat(mode.tdClassName);
				selectedDates.push(curSelectedDate);
				this.setState({
					selectedDates
				});
			}
		}
	};

	clickReturnSelectedDates = async () => {
		await this.props.getDates(this.state.selectedDates);
		await this.setState({
			isActive: false,
			selectedDates: []
		});
		await this.buildCalendar(new Date());
	};

	clickCloseCalendar = async () => {
		await this.setState({
			isActive: false,
			selectedDates: []
		});
		await this.buildCalendar(new Date());
	};

	render() {
		const { isActive, curDate, curCalendarDates, selectedDates } = this.state;
		const rowNum = new Array(curCalendarDates.length / 7).fill(null);

		return (
			<div>
				<button type="button" id="toggleCalendar" onClick={() => this.setState({ isActive: !isActive })}>
					C
				</button>
				{isActive ? (
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
												clickDate={this.clickDate}
											/>
											<Cell
												info={curCalendarDates[i * 7 + 1]}
												index={i * 7 + 1}
												clickDate={this.clickDate}
											/>
											<Cell
												info={curCalendarDates[i * 7 + 2]}
												index={i * 7 + 2}
												clickDate={this.clickDate}
											/>
											<Cell
												info={curCalendarDates[i * 7 + 3]}
												index={i * 7 + 3}
												clickDate={this.clickDate}
											/>
											<Cell
												info={curCalendarDates[i * 7 + 4]}
												index={i * 7 + 4}
												clickDate={this.clickDate}
											/>
											<Cell
												info={curCalendarDates[i * 7 + 5]}
												index={i * 7 + 5}
												clickDate={this.clickDate}
											/>
											<Cell
												info={curCalendarDates[i * 7 + 6]}
												index={i * 7 + 6}
												clickDate={this.clickDate}
											/>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className="option">
							<button type="button" id="returnSelectedDates" onClick={this.clickReturnSelectedDates}>
								{'Done'}
							</button>
							<button type="button" id="closeCalendar" onClick={this.clickCloseCalendar}>
								{'Cancel'}
							</button>
						</div>
					</div>
				) : null}
			</div>
		);
	}
}

export default Calendar;

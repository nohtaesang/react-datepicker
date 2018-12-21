import React, { Component } from 'react';

class Cell extends Component {
	constructor() {
		super();
	}

	// CLICK
	clickDate = () =>
		new Promise((resolve, reject) => {
			this.props.getCurSelectedDateIndex(this.props.index);
			resolve(true);
		});

	render() {
		const { date, dateClassName, label, labelClassName, tdClassName } = this.props.info;
		const { index } = this.props;
		return (
			<td className={tdClassName.join(' ')} name={index} onClick={() => this.clickDate(index)}>
				<div className={dateClassName.join(' ')}>{date.getDate()}</div>
				{label.map((l, i) => (
					<div className={`label ${labelClassName[i]}`} key={i}>
						{l}
					</div>
				))}
			</td>
		);
	}
}

export default Cell;

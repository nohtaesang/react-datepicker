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
		const { date, className, label } = this.props.info;
		const { index } = this.props;
		return (
			<td className="date" name={index} onClick={() => this.clickDate(index)}>
				<div className={className.join(' ')}>{date.getDate()}</div>
				{label.map((l, i) => (
					<div className="label" key={i}>
						{l}
					</div>
				))}
			</td>
		);
	}
}

export default Cell;

import React, { Component } from 'react';

class Cell extends Component {
	constructor() {
		super();
	}

	render() {
		const { date, className, label } = this.props.info;
		console.log(className);
		return (
			<td className="date">
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

import * as React from 'react';

interface IProps {
	text: string;
	value: number;
	increment: () => void;
	decrement: () => void;
}

export default class Counter extends React.Component<IProps> {
	public render() {
		return (
			<span>
				{this.props.text} {this.props.value}
				<button onClick={() => this.props.increment()}>+</button>
				<button onClick={() => this.props.decrement()} disabled={this.props.value === 0}>-</button>
			</span>
		);
	}
}

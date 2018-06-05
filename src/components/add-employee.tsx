import * as React from 'react';
import Counter from './counter';

interface IProps {
	onClick: (value: string, years: number) => void;
}

interface IState {
	totalYearsExperience: number;
}

export default class AddEmployee extends React.Component<IProps, IState> {
	public state: IState = {
		totalYearsExperience: 0
	};

	private input: HTMLInputElement;
	
	public render() {
		return (
			<div>
				<h3>Enter employee details</h3>
				<label htmlFor="fullName">Full name</label>
				<input id="fullName"
					ref={(node) => {
						this.input = node as HTMLInputElement;
					}}
					onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
						if (e.key === 'Enter') {
							this.onClick();
						}
					}}
				/>
				<br />
				<Counter 
					text="total years of experience"
					value={this.state.totalYearsExperience}
					increment={() => this.increment()}
					decrement={() => this.decrement()}
				/>
				<br />
				<button onClick={() => {
					this.onClick();
				}}>Add employee</button>
			</div>
		);
	}

	public increment() {
		const years =	this.state.totalYearsExperience;
		this.setState({totalYearsExperience: years + 1});
	}

	private decrement() {
		if (this.state.totalYearsExperience !== 0) {
			const years =	this.state.totalYearsExperience;
			this.setState({totalYearsExperience: years - 1});
		}
	}

	private onClick() {
		this.props.onClick(this.input.value, this.state.totalYearsExperience);
		this.input.value = '';
		this.setState({totalYearsExperience: 0});
	}
}

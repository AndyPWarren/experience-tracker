import * as React from 'react';
import Counter from './counter';

interface IProps {
	onClick: (value: string, years: number) => void;
}

interface IState {
	totalYearsExperience: number;
	name: string;
}

export default class AddEmployee extends React.Component<IProps, IState> {
	public state: IState = {
		totalYearsExperience: 0,
		name: ''
	};
	
	public render() {
		return (
			<form name="addEmployee" onSubmit={(e) => this.onSubmit(e)}>
				<h3>Enter employee details</h3>
				<label htmlFor="fullName">Full name</label>
				<input id="fullName"
					value={this.state.name}
					onChange={(event) => this.handleUserInput(event)}
					required={true}
				/>
				<br />
				<Counter 
					text="total years of experience"
					value={this.state.totalYearsExperience}
					increment={() => this.increment()}
					decrement={() => this.decrement()}
				/>
				<br />
				<button type="submit">Add employee</button>
			</form>
		);
	}

	private increment() {
		const years =	this.state.totalYearsExperience;
		this.setState({totalYearsExperience: years + 1});
	}

	private decrement() {
		if (this.state.totalYearsExperience !== 0) {
			const years =	this.state.totalYearsExperience;
			this.setState({totalYearsExperience: years - 1});
		}
	}

	private handleUserInput(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
  	const value = e.target.value;
  	this.setState({name: value});
	}

	private onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		this.props.onClick(this.state.name, this.state.totalYearsExperience);
		this.setState({totalYearsExperience: 0, name: ''});
	}
}

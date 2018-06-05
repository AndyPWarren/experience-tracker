import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Competencies from './competencies';
import AddCompetence from './add-competencies';
import { ICompetence } from '../store/reducers/competencies';

interface IProps {
	onClick: (value: string, years: number, competencies: ICompetence[]) => void;
}

interface IState {
	totalYearsExperience: number;
	name: string;
	competencies: ICompetence[];
}

const initialState: IState = {
	totalYearsExperience: 0,
	name: '',
	competencies: []
};

export default class AddEmployee extends React.Component<IProps, IState> {
	public state: IState = initialState;

	public render() {
		return (
			<form onSubmit={(e) => this.onSubmit(e)}>
				<h3>Enter employee details</h3>
				<TextField
					id="name"
					label="Name"
					value={this.state.name}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleUserInput(event as React.ChangeEvent<HTMLInputElement>)}
					margin="normal"
					required={true}
				/>
				<br />
				<TextField
					id="years"
					label="total years experience"
					value={this.state.totalYearsExperience}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						const value: number = parseInt(event.target.value, 10);
						if (value >= 0) {
							this.setState({ totalYearsExperience: value });
						}
					}}
					type="number"
					InputLabelProps={{
						shrink: true,
					}}
					margin="normal"
				/>
				<AddCompetence 
					maxYears={this.state.totalYearsExperience}
					onClick={(newCompetency) => {
						let newId = 1;
						if (this.state.competencies.length > 0) {
							newId = this.state.competencies[this.state.competencies.length - 1].id + 1;
						}
						const competencies = [
							...this.state.competencies,
							{
								id: newId,
								yearsExperience: newCompetency.years,
								title: newCompetency.title
							}
						];
						this.setState({
							...this.state,
							competencies
						});
					}}
				/>
				<Competencies competencies={this.state.competencies} />
				<br />
				<Button variant="raised" color="primary" type="submit">Add employee</Button>
			</form>
		);
	}

	private handleUserInput(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		const value = e.target.value;
		this.setState({ name: value });
	}

	private onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		this.props.onClick(
			this.state.name,
			this.state.totalYearsExperience,
			this.state.competencies
		);
		this.setState(initialState);
	}
}

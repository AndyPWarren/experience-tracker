import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ICompetence } from '../store/reducers/competencies';
import { Redirect } from 'react-router-dom';
import { IEmployee } from '../store/reducers/employees';
import UpdateCompetenciesTable from './competencies/update-competencies-table';

interface IProps {
	maxSimultaneousCompetencies: number;
	employee: IEmployee | null;
	onSubmit: (name: string, totalYears: number, competencies: ICompetence[]) => void;
}

interface IAddEmployeeState {
	totalYearsExperience: number;
	name: string;
	competencies: ICompetence[];
	total: number;
	redirect: boolean;
}

const initialState: IAddEmployeeState = {
	totalYearsExperience: 0,
	name: '',
	competencies: [],
	total: 0,
	redirect: false
};

export default class EmployeeForm extends React.Component<IProps, IAddEmployeeState> {
	public state: IAddEmployeeState = initialState;

	constructor(props: IProps) {
		super(props);
	}

	public componentWillMount() {
		if (this.props.employee) {
			this.setState({
				...this.state,
				name: this.props.employee.name,
				totalYearsExperience: this.props.employee.totalYearsExperience,
				competencies: this.props.employee.competencies
			});
		}
	}

	public render() {
		if (this.state.redirect === true) {
			return (
				<Redirect to={'/'} />
			);
		}
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
				<UpdateCompetenciesTable
					competencies={this.state.competencies}
					maxYears={this.state.totalYearsExperience}
					maxSimultaneousCompetencies={this.props.maxSimultaneousCompetencies}
					updateHandler={(competencies: ICompetence[]) => {
						this.setState({
							...this.state,
							competencies
						});
					}}
				/>
				<br />
				<Button variant="raised" color="primary" type="submit">Save employee</Button>
				<br />
				<Button
					variant="raised"
					color="secondary"
					type="button"
					onClick={() => this.redirect()}
				>
					Cancel</Button>
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
		this.props.onSubmit(
			this.state.name,
			this.state.totalYearsExperience,
			this.state.competencies
		);
		this.setState(initialState);
		this.redirect();
	}

	private redirect() {
		this.setState({ redirect: true });
	}
}

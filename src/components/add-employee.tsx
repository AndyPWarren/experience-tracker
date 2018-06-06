import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Competencies from './competencies';
import AddCompetence from './add-competencies';
import { ICompetence } from '../store/reducers/competencies';
import { connect } from 'react-redux';
import { IAddEmployee, addEmployee } from '../store/actions';
import { IState } from '../store/store';
import { Redirect } from 'react-router-dom';

interface IProps {
	maxSimultaneousCompetencies: number;
}

interface IAddEmployeeDispatchProps {
	addEmployee: (
		title: string,
		years: number,
		competencies: ICompetence[]) => IAddEmployee;
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

class AddEmployee extends React.Component<IProps & IAddEmployeeDispatchProps, IAddEmployeeState> {
	public state: IAddEmployeeState = initialState;

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
				<AddCompetence
					total={this.state.total}
					maxYears={this.state.totalYearsExperience}
					maxSimultaneousCompetencies={this.props.maxSimultaneousCompetencies}
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
						const total: number = competencies
							.map((c) => c.yearsExperience)
							.reduce((a, b) => a + b);

						this.setState({
							...this.state,
							competencies,
							total
						});
					}}
				/>
				<Competencies competencies={this.state.competencies} />
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
		this.props.addEmployee(
			this.state.name,
			this.state.totalYearsExperience,
			this.state.competencies
		);
		this.setState(initialState);
		this.redirect();
	}

	private redirect() {
		this.setState({redirect: true});
	}
}

export default connect(
	(state: IState) => {
		const props: IProps = {
			maxSimultaneousCompetencies: state.maxSimultaneousCompetencies
		};
		return props;
	},
 	{
		addEmployee
	}
)(AddEmployee);

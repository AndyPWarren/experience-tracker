import * as React from 'react';
import Button from '@material-ui/core/Button';
import { ICompetence } from '../../store/reducers/employees';
import { Redirect } from 'react-router-dom';
import { IEmployee } from '../../store/reducers/employees';
import UpdateCompetenciesTable from '../competencies/update-competencies-table';
import { TextField, Theme, withStyles, Typography } from '@material-ui/core';
import NumberInput from '../inputs/number-input';
import { checkMaxSimultaneous } from '../../services/competency-checker';
import IconError from '@material-ui/icons/Error';

interface IProps {
	maxSimultaneousCompetencies: number;
	employee: IEmployee | null;
	onSubmit: (name: string, totalYears: number, competencies: ICompetence[]) => void;
	previousCompetencies: string[];
	classes: any;
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

const styles = (theme: Theme) => ({
	button: {
		margin: theme.spacing.unit,
	},
	error: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: '10px',
	}
});
/**
 * Form for manipulating (adding/editing) a user
 *
 * @class EmployeeForm
 * @extends {React.Component<IProps, IAddEmployeeState>}
 */
class EmployeeForm extends React.Component<IProps, IAddEmployeeState> {
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
		const exceeds = checkMaxSimultaneous(
			this.state.competencies,
			this.state.totalYearsExperience,
			this.props.maxSimultaneousCompetencies
		);
		const min = exceeds === true ? this.state.totalYearsExperience : 0;
		return (
			<form onSubmit={(e) => this.onSubmit(e)}>
				<TextField
					id="name"
					label="Name"
					value={this.state.name}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleUserInput(event as React.ChangeEvent<HTMLInputElement>)}
					margin="normal"
					required={true}
				/>
				<br />
				<NumberInput
					value={this.state.totalYearsExperience}
					changeHandler={(value: number) => {
						this.setState({ totalYearsExperience: value });
					}}
					min={min}
					label="total years experience"
				/>
				{ exceeds &&
				<Typography variant="body1" className={this.props.classes.error}>
					<IconError color="error" />
					Competencies exceeds max simultaneous competencies constraint
				</Typography> }
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
					previousCompetencies={this.props.previousCompetencies}
					exceedsMaxSimultaneousCompetencies={exceeds}
				/>
				<br />
				<Button variant="raised" color="primary" type="submit">Save employee</Button>
				<Button
					className={this.props.classes.button}
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

export default withStyles(styles)(EmployeeForm);

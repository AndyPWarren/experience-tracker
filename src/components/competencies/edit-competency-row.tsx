import * as React from 'react';
import { ICompetence } from '../../store/reducers/competencies';
import { TableRow, TableCell, TextField, IconButton } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';

interface IProps {
	competency: ICompetence;
	completeHandler: (id: ICompetence) => void;
	deleteHandler: (id: number) => void;
	maxYears: number;
	total: number;
	maxSimultaneousCompetencies: number;
}

interface IState {
	competency: ICompetence;
	error: string;
}

export default class EditCompetencyRow extends React.Component<IProps, IState> {
	public state: IState = {
		competency: this.props.competency,
		error: ''
	};

	private titleInput: HTMLInputElement;

	public componentDidMount() {
		this.titleInput.focus();
	}

	public render() {
		const { competency } = this.props;
		return (
			<TableRow key={competency.id}>
				<TableCell component="th" scope="row">
					<TextField
						id="title"
						label="Title"
						value={this.state.competency.title}
						inputProps={{ref: (input: HTMLInputElement) => this.titleInput = input} }
						onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
							this.setState({
								...this.state,
								competency: this.updateTitle(event.target.value)
							})
						}
						margin="normal"
					/>
				</TableCell>
				<TableCell numeric={true}>
				<TextField
					style={{width: '130px'}}
					id="years"
					label="Years experience"
					value={this.state.competency.yearsExperience}
					inputProps={{min: 0, max: this.props.maxYears}}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						if (event.target.value === '') {
							return;
						}
						const years: number = parseInt(event.target.value, 10);
						if (years + this.props.total > this.props.maxYears * this.props.maxSimultaneousCompetencies) {
							const error = 'exceeds max simultaneous competencies';
							this.setState({
								...this.state,
								competency: this.updateYears(years),
								error
							});
							return;
						}
						this.setState({
							...this.state,
							competency: this.updateYears(years),
							error: ''
						});
					}}
					type="number"
					InputLabelProps={{
						shrink: true,
					}}
					margin="normal"
				/>
				{this.state.error && 
					<p style={{'color': 'red'}}>{this.state.error}</p>
				}
				</TableCell>
				<TableCell style={{ width: "100px" }}>
					<IconButton color="primary"
						onClick={() => this.props.completeHandler(this.state.competency)}
						disabled={!!this.state.error || !this.state.competency.title || this.state.competency.yearsExperience === 0}
					>
						<CheckIcon />
					</IconButton>
					<IconButton onClick={() => this.props.deleteHandler(competency.id)}>
						<DeleteIcon />
					</IconButton>
				</TableCell>
			</TableRow>
		);
	}

	private updateTitle(title: string): ICompetence {
		return {
			...this.state.competency,
			title
		};
	}

	private updateYears(yearsExperience: number): ICompetence {
		return {
			...this.state.competency,
			yearsExperience
		};
	}
}

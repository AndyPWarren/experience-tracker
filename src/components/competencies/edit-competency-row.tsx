import * as React from 'react';
import { ICompetence } from '../../store/reducers/employees';
import { TableRow, TableCell, IconButton } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import IntegrationAutosuggest from '../inputs/autosuggest';
import NumberInput from '../inputs/number-input';

interface IProps {
	competency: ICompetence;
	completeHandler: (id: ICompetence) => void;
	deleteHandler: (id: number) => void;
	maxYears: number;
	total: number;
	maxSimultaneousCompetencies: number;
	exceedsMaxSimultaneousCompetencies: boolean;
	previousCompetencies: string[];
}

interface IState {
	competency: ICompetence;
	error: string;
}
/**
 * Table row for editing a competency
 *
 * @export
 * @class EditCompetencyRow
 * @extends {React.Component<IProps, IState>}
 */
export default class EditCompetencyRow extends React.Component<IProps, IState> {
	public state: IState = {
		competency: this.props.competency,
		error: ''
	};

	public render() {
		const { competency } = this.props;
		return (
			<TableRow key={competency.id}>
			<TableCell>
				<IntegrationAutosuggest
					suggestions={this.props.previousCompetencies} 
					value={this.state.competency.title}
					placeholderText={'Enter competency'}
					changeHandler={(event: string) => this.setState({
						...this.state,
						competency: this.updateTitle(event)
					})}
				/>
				</TableCell>
				<TableCell numeric={true}>
				<NumberInput
					max={this.props.maxYears}
					min={0}
					value={this.state.competency.yearsExperience}
					disabledIncrement={this.props.exceedsMaxSimultaneousCompetencies}
					changeHandler={(years: number) => {
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
				/>
				{this.state.error && 
					<p style={{'color': 'red'}}>{this.state.error}</p>
				}
				</TableCell>
				<TableCell>
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

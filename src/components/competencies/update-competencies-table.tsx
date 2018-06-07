import * as React from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, IconButton } from '@material-ui/core';
import { ICompetence } from '../../store/reducers/competencies';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EditCompetencyRow from './edit-competency-row';

interface IEditCompetency extends ICompetence {
	edit: boolean;
}

interface IProps {
	competencies: ICompetence[];
	maxYears: number;
	maxSimultaneousCompetencies: number;
	updateHandler: (competencies: ICompetence[]) => void;
}

interface IState {
	competencies: IEditCompetency[];
	totalExperience: number;
}

export default class UpdateCompetenciesTable extends React.Component<IProps, IState> {
	public state: IState = {
		competencies: this.props.competencies.map((c) => {
			return {
				...c,
				edit: false
			};
		}),
		totalExperience: 0
	};

	public render() {
		return (
			<Paper>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Competency</TableCell>
							<TableCell numeric={true}>Years of experience</TableCell>
							<TableCell />
						</TableRow>
					</TableHead>
					<TableBody>
						{this.state.competencies.map(competency => {
							if (competency.edit === true) {
								return (
									<EditCompetencyRow 
										key={competency.id}
										competency={competency}
										completeHandler={(newCompetency) => this.updateRow(newCompetency)}
										deleteHandler={(id) => this.deleteRow(id)}
										maxSimultaneousCompetencies={this.props.maxSimultaneousCompetencies}
										maxYears={this.props.maxYears}
										total={this.state.totalExperience}
									/>
								);
							}
							return (
								<TableRow key={competency.id}>
									<TableCell component="th" scope="row">
										{competency.title}
									</TableCell>
									<TableCell numeric={true}>{competency.yearsExperience}</TableCell>
									<TableCell style={{width: "100px"}}>
										<IconButton onClick={() => this.editRow(competency.id)}>
											<EditIcon />
										</IconButton>
										<IconButton onClick={() => this.deleteRow(competency.id)}>
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell>
								<IconButton onClick={() => this.addRow()}>
									<AddIcon />
								</IconButton>
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</Paper>
		);
	}
	private getTotalExperience(competencies: IEditCompetency[]): number { 
		if (competencies.length === 0) {
			return 0;
		}
		return competencies
			.map((c) => c.yearsExperience)
			.reduce((a, b) => {
				if (a && b) {
					return a + b;
				}
				return a;
			});
	}

	private editRow(id: number) {
		const competencies = this.state.competencies
			.map((c) => {
				if (c.id === id) {
					c.edit = true;
				}
				return c;
			});
		this.setState({
			competencies,
			totalExperience: this.getTotalExperience(this.state.competencies.filter((c) => c.id !== id))
		});
	}

	private deleteRow(id: number) {
		const competencies = [
			...this.state.competencies,
		].filter((c) => c.id !== id);
		this.setState({
			competencies,
			totalExperience: this.getTotalExperience(competencies)
		});
		this.props.updateHandler(competencies);
	}

	private updateRow(competency: ICompetence) {
		const updatedCompetencies = this.state.competencies
			.map((c) => {
				if (c.id === competency.id) {
					return {
						...competency,
						edit: false
					};
				}
				return c;
			});
		this.setState({
			competencies: updatedCompetencies,
			totalExperience: this.getTotalExperience(updatedCompetencies)
		});
			const competencies: ICompetence[] = updatedCompetencies
				.map((c) => {
					const { id, title, yearsExperience } = c;
					return {
						id,
						title,
						yearsExperience
					};
				});
		this.props.updateHandler(competencies);
		
	}

	private addRow() {
		const oldCompetencies = this.state.competencies;
		const id = oldCompetencies.length > 0 ? oldCompetencies[oldCompetencies.length - 1].id + 1 : 1;
		const competencies = [
			...this.state.competencies,
			{
				edit: false,
				id,
				title: '',
				yearsExperience: 0
			}
		];
		competencies[competencies.length - 1].edit = true;
		this.setState({
			competencies,
			totalExperience: this.getTotalExperience(this.state.competencies)
		});
	}
}

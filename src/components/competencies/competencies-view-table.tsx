import * as React from 'react';
import { ICompetence } from '../../store/reducers/employees';
import Paper from '@material-ui/core/Paper/Paper';
import Table from '@material-ui/core/Table/Table';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody/TableBody';

interface IProps {
	competencies: ICompetence[];
}
/**
 * List the employees competencies in a table
 *
 * @export
 * @class CompetenciesViewTable
 * @extends {React.Component<IProps>}
 */
export default class CompetenciesViewTable extends React.Component<IProps> {
	public render() {
		return (
			<Paper>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Competency</TableCell>
							<TableCell numeric={true}>Years of experience</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.props.competencies.map(competency => {
							return (
								<TableRow key={competency.id}>
									<TableCell component="th" scope="row">
										{competency.title}
									</TableCell>
									<TableCell numeric={true}>{competency.yearsExperience}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</Paper>
		);
	}
}

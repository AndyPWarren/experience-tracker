import * as React from 'react';
import { Typography, IconButton, createStyles, Theme, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CompetenciesViewTable from '../competencies/competencies-view-table';
import IconEdit from '@material-ui/icons/Edit';
import IconError from '@material-ui/icons/Error';
import { IEmployee } from '../../store/reducers/employees';

const styles = (theme: Theme) => createStyles({
	error: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: '10px',
	}
});

interface IProps {
	employee: IEmployee;
	exceedsMaxSimultaneousCompetencies: boolean;
	classes: any;
}

class Employee extends React.Component<IProps> {
	public render() {
		const { employee } = this.props;
		const { classes } = this.props;

		return (
			<div>
				<Typography variant="display1" gutterBottom={true}>
					Employee
					</Typography>
				<Typography variant="headline" gutterBottom={true}>
					{employee.name}
					<Link to={`/edit-employee/${employee.id}`}>
						<IconButton>
							<IconEdit />
						</IconButton>
					</Link>
				</Typography>
				<Typography variant="body1" gutterBottom={true}>
					Total years experience: {employee.totalYearsExperience}
				</Typography>
				<br />
				{ this.props.exceedsMaxSimultaneousCompetencies &&
				<Typography variant="body1" className={classes.error}>
					<IconError color="error" />
					Competencies exceeds max simultaneous competencies constraint
				</Typography> }
				{employee.competencies.length > 0 &&
					<CompetenciesViewTable competencies={employee.competencies} />
				}
			</div>
		);
	}
}

export default withStyles(styles)(Employee);

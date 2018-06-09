import * as React from 'react';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import * as classnames from 'classnames';
import { IEmployee, ICompetence } from '../../store/reducers/employees';
import CompetenciesViewTable from '../competencies/competencies-view-table';
import { Link } from 'react-router-dom';
import IconCallMade from '@material-ui/icons/CallMade';
import IconError from '@material-ui/icons/Error';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Tooltip, Card, CardHeader, Avatar, IconButton, CardContent, Typography, CardActions, Collapse } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const styles = (theme: Theme) => createStyles({
	card: {
		maxWidth: 300,
		position: 'relative',
		overflow: 'visible',
	},
	error: {
		position: 'absolute',
		right: '-0.5em',
		top: '-0.5em',
	},
	actions: {
		display: 'flex',
	},
	expand: {
		transform: 'rotate(0deg)',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
		marginLeft: 'auto',
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
});

interface IProps {
	classes: any;
	employee: IEmployee;
	exceedsMaxSimultaneousCompetencies: boolean;
	deleteClickHandler: (id: number) => void;
}

interface IState {
	expanded: boolean;
}
/**
 * Material card component for displaying some employee data
 * only shows the top three competencies by years of experience
 *
 * @class EmployeeCard
 * @extends {React.Component<IProps, IState>}
 */
class EmployeeCard extends React.Component<IProps, IState> {
	public state = { expanded: false };

	public render() {
		const { classes } = this.props;

		return (
			<div>
				<Card className={classes.card}>
					{this.props.exceedsMaxSimultaneousCompetencies &&
						<Tooltip id="tooltip-icon" title="Competencies exceeds max simultaneous">
							<IconError color="error" className={classes.error} />
						</Tooltip>
					}
					<Link to={`/employee/${this.props.employee.id}`}>
						<CardHeader
							avatar={
								<Avatar aria-label="Recipe" className={classes.avatar}>
									{this.props.employee.name[0]}
								</Avatar>
							}
							title={this.props.employee.name}
							action={
								<IconButton>
									<IconCallMade />
								</IconButton>
							}
						/>
					</Link>
					<CardContent>
						<Typography component="p">
							Total years of experience: {this.props.employee.totalYearsExperience}
						</Typography>
					</CardContent>
					<CardActions className={classes.actions} disableActionSpacing={true}>
						<Link to={`/edit-employee/${this.props.employee.id}`}>
							<IconButton
								aria-label="Edit">
								<EditIcon />
							</IconButton>
						</Link>
						<IconButton
							onClick={() => this.props.deleteClickHandler(this.props.employee.id)}
							aria-label="Edit">
							<DeleteIcon />
						</IconButton>
						{this.props.employee.competencies.length > 0 &&
							<IconButton
								className={classnames(classes.expand, {
									[classes.expandOpen]: this.state.expanded,
								})}
								onClick={() => this.handleExpandClick()}
								aria-expanded={this.state.expanded}
								aria-label="Show more"
							>
								<ExpandMoreIcon />
							</IconButton>
						}
					</CardActions>
					<Collapse in={this.state.expanded} timeout="auto" unmountOnExit={true}>
						<CardContent>
							<CompetenciesViewTable
								competencies={this.getTopCompetencies()} />
						</CardContent>
					</Collapse>
				</Card>
			</div>
		);
	}
	private handleExpandClick() {
		this.setState({ expanded: !this.state.expanded });
	}
	private getTopCompetencies(): ICompetence[] {
		const competencies = [...this.props.employee.competencies];
		if (competencies.length <= 1) {
			return competencies;
		}
		const limit = 3;
		const cutoff = competencies.length >= limit ? limit : competencies.length;
		const sorted = competencies
			.sort((a, b) => {
				if (a.yearsExperience > b.yearsExperience) {
					return -1;
				}
				if (a.yearsExperience < b.yearsExperience) {
					return 1;
				}
				return 0;
			});
		return new Array(cutoff)
			.fill(null)
			.map((val, i) => sorted[i]);
	}
}

export default withStyles(styles)(EmployeeCard);

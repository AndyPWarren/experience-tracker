import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import * as classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { IEmployee } from '../store/reducers/employees';
import Competencies from './competencies';

const styles = (theme: any) => ({
	card: {
		maxWidth: 300,
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
}

interface IState {
	expanded: boolean;
}

class EmployeeCard extends React.Component<IProps, IState> {
	public state = { expanded: false };

	public render() {
		const { classes } = this.props;

		return (
			<div>
				<Card className={classes.card}>
					<CardHeader
						avatar={
							<Avatar aria-label="Recipe" className={classes.avatar}>
								{this.props.employee.name[0]}
							</Avatar>
						}
						title={this.props.employee.name}
					/>
					<CardContent>
						<Typography component="p">
							Total years of experience: {this.props.employee.totalYearsExperience}
						</Typography>
					</CardContent>
					<CardActions className={classes.actions} disableActionSpacing={true}>
						<IconButton
							onClick={() => this.editClickHandler()}
							aria-label="Edit">
							<EditIcon />
						</IconButton>
						<IconButton
							onClick={() => this.deleteClickHandler()}
							aria-label="Edit">
							<DeleteIcon />
						</IconButton>
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
					</CardActions>
					<Collapse in={this.state.expanded} timeout="auto" unmountOnExit={true}>
						<CardContent>
							<Competencies competencies={this.props.employee.competencies} />
						</CardContent>
					</Collapse>
				</Card>
			</div>
		);
	}
	private handleExpandClick() {
		this.setState({ expanded: !this.state.expanded });
	}

	private editClickHandler() {
		console.log('edit clicked');
	}

	private deleteClickHandler() {
		console.log('delete clicked');
	}
}

export default withStyles(styles)(EmployeeCard);

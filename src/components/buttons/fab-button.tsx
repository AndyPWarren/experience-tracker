import * as React from 'react';
import { withStyles, Theme, Button, createStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

const styles = (theme: Theme) => createStyles({
	fab: {
		position: 'absolute',
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2,
	},
});

interface IProps {
	classes: any;
	linkTo: string;
}
/**
 * Material first action button
 *
 * @class FabButton
 * @extends {React.Component<IProps>}
 */
class FabButton extends React.Component<IProps> {
	public render() {
		const { classes } = this.props;
		return (
			<Link to={this.props.linkTo}>
				<Button variant="fab" color="primary" aria-label="add employee" className={classes.fab}>
					<AddIcon />
				</Button>
			</Link>
		);
	}
}

export default withStyles(styles)(FabButton);

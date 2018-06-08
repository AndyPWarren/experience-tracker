import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = {
	root: {
		flexGrow: 1,
	},
	flex: {
		flex: 1,
	},
	link: {
		color: 'white'
	}
};

interface IProps {
	classes: any;
}

function MainAppBar(props: IProps) {
	const { classes } = props;
	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="title" color="inherit" className={classes.flex}>
						<Link to="/" className={classes.link}>
							Experience Tracker
						</Link>
					</Typography>
					<Link to="/admin" className={classes.link} >
						<Button color="inherit">Admin</Button>
					</Link>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default withStyles(styles)(MainAppBar);

import * as React from "react";
import { IEmployee } from "../../store/reducers/employees";
import { List, ListItem, ListItemText, Theme, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const styles = (theme: Theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
});

interface ISimpleListEmployeeProps {
	employees: IEmployee[];
	classes: any;
}

function simpleEmployeesList(props: ISimpleListEmployeeProps) {
	return (
		<div className={props.classes.root}>
			<List component="nav">
				{props.employees.map((e) =>
					<Link className="underline" to={`/employee/${e.id}`} key={e.id}>
						<ListItem button={true}>
							<ListItemText primary={e.name} />
						</ListItem>
					</Link>
				)}
			</List>
		</div>
	);
}

export default withStyles(styles)(simpleEmployeesList);

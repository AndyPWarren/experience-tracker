import * as React from 'react';
import { IChangesId } from '../../services/history';
import { TextField, MenuItem, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

interface IProps {
	nameChanges: IChangesId[];
}

interface IState {
	selected: number;
}
/**
 * Component to display a list of name changes for a selected employee
 *
 * @export
 * @class NameChanges
 * @extends {React.Component<IProps, IState>}
 */
export default class NameChanges extends React.Component<IProps, IState> {
	public state: IState = {
		selected: this.props.nameChanges[0].id
	};
	public render() {
		const selectedEmployee = this.props.nameChanges.find(e => e.id === this.state.selected);
		return (
			<div>
				<TextField
					id="select-currency"
					select={true}
					label="Employee ID"
					value={this.state.selected}
					onChange={(event) => this.setState({ selected: parseInt(event.target.value, 10) })}
					helperText="Select the employee ID to display their changes"
					margin="normal"
				>
					{this.props.nameChanges.map(nc => (
						<MenuItem key={nc.id} value={nc.id}>
							{nc.id}
						</MenuItem>
					))}
				</TextField>
				<Paper>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Old</TableCell>
								<TableCell>New</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{selectedEmployee &&
								selectedEmployee.nameChanges.map((nc, i) =>
									<TableRow key={i}>
										<TableCell>{nc.old}</TableCell>
										<TableCell>{nc.new}</TableCell>
									</TableRow>
								)}
						</TableBody>
					</Table>
				</Paper>
			</div>
		);
	}
}

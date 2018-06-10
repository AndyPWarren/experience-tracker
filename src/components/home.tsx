import * as React from 'react';
import ListEmployees from './employee/list-employee';
import { IState } from '../store/store';
import { connect } from 'react-redux';
import { IEmployee } from '../store/reducers/employees';
import { Typography } from '@material-ui/core';
import FabButton from './buttons/fab-button';

interface IProps {
	employees: IEmployee[];
}
/**
 * Displays a list of employees and link to add them
 *
 * @class Home
 * @extends {React.Component<IProps>}
 */
class Home extends React.Component<IProps> {
	/**
	 * display the home view
	 *
	 * @returns JSX.Element for the home view
	 * @memberof Home
	 */
	public render() {
		return (
			<main>
				<Typography variant="display1" gutterBottom={true}>
					Employees
				</Typography>
				{
					this.props.employees.length === 0 &&
					<p>No employees, add some by clicking the plus button</p>
				}
				<FabButton linkTo="/add-employee" />
				{
					this.props.employees.length > 0 &&
					<ListEmployees />
				}
			</main>
		);
	}
}

export default connect(
	(state: IState) => {
		const props: IProps = {
			employees: state.employees.current
		};
		return props;
	}
)(Home);

import * as React from 'react';
import ListEmployees from './employee/list-employee';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import { IState } from '../store/store';
import { connect } from 'react-redux';
import { IEmployee } from '../store/reducers/employees';
import { Typography, Button } from '@material-ui/core';

interface IProps {
	employees: IEmployee[];
}
class Home extends React.Component<IProps> {
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
				<Link to={'/add-employee'}>
					<Button variant="fab" color="primary" aria-label="add employee">
						<AddIcon />
					</Button>
				</Link>
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
			employees: state.employees
		};
		return props;
	}
)(Home);

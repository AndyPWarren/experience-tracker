import * as React from 'react';
import ListEmployees from './list-employee';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { IState } from '../store/store';
import { connect } from 'react-redux';
import { IEmployee } from '../store/reducers/employees';

interface IProps {
	employees: IEmployee[];
}
class Home extends React.Component<IProps> {
	public render() {
		return (
			<main>
				<h3>
					Employees
					<Link to={'/add-employee'}>
						<IconButton color="primary" aria-label="add employee">
							<AddIcon />
						</IconButton>
					</Link>
				</h3>
				{
					this.props.employees.length === 0 &&
					<p>No employees, add some by clicking the plus button</p>
				}
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

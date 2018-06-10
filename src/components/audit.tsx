import * as React from 'react';
import { Typography } from '@material-ui/core';
import { getNameChanges } from '../services/history';
import { IEmployee } from '../store/reducers/employees';
import { connect } from 'react-redux';
import { IState } from '../store/store';
import NameChanges from './name-changes';

interface IProps {
	history: IEmployee[];
}


class Audit extends React.Component<IProps> {
	public render() {
		const nameChanges = getNameChanges(this.props.history);
		return (
			<div>
				<Typography variant="display1" gutterBottom={true}>
					Audit
				</Typography>
				<Typography variant="headline" gutterBottom={true}>
					History of name changes
				</Typography>
				{nameChanges.length > 0 &&
					<NameChanges nameChanges={nameChanges} />
				}
				{nameChanges.length === 0 &&
					<Typography variant="body1">
						No changes found
					</Typography>
				}
			</div>
		);
	}
}

export default connect(
	(state: IState) => {
		const props: IProps = {
			history: state.employees.history
		};
		return props;
	}
)(Audit);

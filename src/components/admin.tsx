import * as React from 'react';
import { Typography, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { IState } from '../store/store';
import { updateMaxSimCompetencies } from '../store/actions';

interface IProps {
	maxSimultaneousCompetencies: number;
}

interface IDispatchProps {
	updateMaxSimCompetencies: (value: number) => void;
}

class Admin extends React.Component<IProps & IDispatchProps> {
	public render() {
		return (
			<div>
				<Typography variant="display1" gutterBottom={true}>Admin</Typography>
				<Typography variant="body1">
					Max simultaneous competencies:
					<TextField
						id="number"
						style={{marginLeft: '20px'}}
						inputProps={{ min: 0, max: 99 }}
						value={this.props.maxSimultaneousCompetencies}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleChange(event)}
						type="number"
					/>
				</Typography>
			</div>
		);
	}

	private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		if (event.target.value === '') {
			return;
		}
		const value = parseInt(event.target.value, 10);
		if (value > 0 && value <= 99) {
			this.props.updateMaxSimCompetencies(value);
		}
	}
}

export default connect(
	(state: IState) => {
		const props: IProps = {
			maxSimultaneousCompetencies: state.maxSimultaneousCompetencies
		};
		return props;
	}, {
		updateMaxSimCompetencies
	}
)(Admin);

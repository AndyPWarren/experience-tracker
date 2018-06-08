import * as React from 'react';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { IState } from '../store/store';
import { updateMaxSimCompetencies } from '../store/actions';
import NumberInput from './number-input';

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
				</Typography>
				<NumberInput 
					value={this.props.maxSimultaneousCompetencies}
					min={1}
					max={99}
					changeHandler={(value: number) => this.props.updateMaxSimCompetencies(value)}
				/>
			</div>
		);
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

import * as React from 'react';
import AlertDialog from './alert';
import { connect } from 'react-redux';
import { IAlertPayload, clearAlert, IClearDialogue } from '../../store/actions';
import { IState } from '../../store/store';

interface IProps {
	alert: IAlertPayload | null;
}

interface IDispatchProps {
	clearAlert: () => IClearDialogue;
}

interface IAlertManagerState {
	open: boolean;
}

class AlertManager extends React.Component<IProps & IDispatchProps, IAlertManagerState> {
	public state: IAlertManagerState = {
		open: false,
	};
	public render() {
		const { alert } = this.props;
		if (alert !== null) {
			return (
				<AlertDialog
					yesText={'Yes'}
					cancelText={'Cancel'}
					open={true}
					messageTitle={alert.messageTitle}
					messageContent={alert.messageContent}
					closeHandler={(confirmed: boolean) => {
						if (confirmed === true) {
							alert.action();
						}
						this.props.clearAlert();
					}}
				/>
			);
		}
		return (null);
	}
}

export default connect(
	(state: IState) => {
		const props: IProps = {
			alert: state.alert
		};
		return props;
	}, 
	{
		clearAlert
	}
)(AlertManager);

import * as React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@material-ui/core';

interface IProps {
	yesText: string;
	cancelText: string;
	open: boolean;
	messageTitle: string;
  messageContent: string;
  closeHandler: (confirmed: boolean) => void;
}
/**
 * Material Dialog component for displaying an alert
 * Allows message title, content and button texts to be set
 * Calls the close handler passing in the confirmed state
 *
 * @export
 * @class AlertDialog
 * @extends {React.Component<IProps>}
 */
export default class AlertDialog extends React.Component<IProps> {
	public render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={() => this.props.closeHandler(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`${this.props.messageTitle}`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.messageContent}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.closeHandler(false)} color="primary">
							{this.props.cancelText}
            </Button>
            <Button onClick={() => this.props.closeHandler(true)} color="primary" autoFocus={true}>
              {this.props.yesText}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

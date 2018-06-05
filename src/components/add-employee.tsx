import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

interface IProps {
	onClick: (value: string, years: number) => void;
}

interface IState {
	totalYearsExperience: number;
	name: string;
}

export default class AddEmployee extends React.Component<IProps, IState> {
	public state: IState = {
		totalYearsExperience: 0,
		name: ''
	};
	
	public render() {
		return (
			<form onSubmit={(e) => this.onSubmit(e)}>
				<h3>Enter employee details</h3>
				<TextField
          id="name"
          label="Name"
          value={this.state.name}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleUserInput(event as React.ChangeEvent<HTMLInputElement>)}
					margin="normal"
					required={true}
        />
				<br />
				<TextField
          id="years"
          label="total years experience"
          value={this.state.totalYearsExperience}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						const value: number = parseInt(event.target.value, 10);
						if (value >= 0) {
							this.setState({totalYearsExperience: parseInt(event.target.value, 10)});
						}
					}}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
					margin="normal"
        />
				<br />
				<Button variant="raised" color="primary" type="submit">Add employee</Button>
			</form>
		);
	}

	private handleUserInput(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
  	const value = e.target.value;
  	this.setState({name: value});
	}

	private onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		this.props.onClick(this.state.name, this.state.totalYearsExperience);
		this.setState({totalYearsExperience: 0, name: ''});
	}
}

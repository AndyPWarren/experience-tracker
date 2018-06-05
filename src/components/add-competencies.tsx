import * as React from 'react';
import TextField from '@material-ui/core/TextField/TextField';
import IconButton from '@material-ui/core/IconButton/IconButton';
import AddIcon from '@material-ui/icons/Add';


interface IProps {
	onClick: (competency: IAddCompetencyState) => void;
	maxYears: number;
}
interface IAddCompetencyState {
	years: number;
	title: string;
}

const initState: IAddCompetencyState = {
	title: '',
	years: 0
};

export default class AddCompetency extends React.Component<IProps, IAddCompetencyState> {
	public state: IAddCompetencyState = initState;
	/**
	 * render
	 */
	public render() {
		return (
			<div>
				<p>Add Competencies</p>
				<TextField
					id="title"
					label="Title"
					value={this.state.title}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						this.setState({
							...this.state,
							title: event.target.value
						});
					}}
					margin="normal"
				/>
				<TextField
					id="years"
					label="Years experience"
					value={this.state.years}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						const years: number = parseInt(event.target.value, 10);
						if (years >= 0 && years <= this.props.maxYears) {
							this.setState({
								...this.state,
								years,
							});
						}
					}}
					type="number"
					InputLabelProps={{
						shrink: true,
					}}
					margin="normal"
				/>
				<IconButton aria-label="Add competency" onClick={() => {
					this.props.onClick(this.state);
					this.setState(initState);
				}}>
					<AddIcon />
				</IconButton>
			</div>
		);
	}
}

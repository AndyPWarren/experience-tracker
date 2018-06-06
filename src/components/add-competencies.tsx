import * as React from 'react';
import TextField from '@material-ui/core/TextField/TextField';
import IconButton from '@material-ui/core/IconButton/IconButton';
import AddIcon from '@material-ui/icons/Add';


interface IProps {
	onClick: (competency: INewCompetency) => void;
	maxYears: number;
	total: number;
	maxSimultaneousCompetencies: number;
}

interface INewCompetency {
	years: number;
	title: string;
}

interface IAddCompetencyState {
	error: string;
	competency: INewCompetency;
}

const initState: IAddCompetencyState = {
	competency: {
		title: '',
		years: 0
	},
	error: ''
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
					value={this.state.competency.title}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
						this.setState({
							...this.state,
							competency: this.updateTitle(event.target.value)
						})
					}
					margin="normal"
				/>
				<TextField
					style={{width: '130px'}}
					id="years"
					label="Years experience"
					value={this.state.competency.years}
					inputProps={{min: 0, max: this.props.maxYears}}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						if (event.target.value === '') {
							return;
						}
						const years: number = parseInt(event.target.value, 10);
						if (years + this.props.total > this.props.maxYears * this.props.maxSimultaneousCompetencies) {
							const error = 'exceeds max simultaneous competencies';
							this.setState({
								...this.state,
								competency: this.updateYears(years),
								error
							});
							return;
						}
						this.setState({
							...this.state,
							competency: this.updateYears(years),
							error: ''
						});
					}}
					type="number"
					InputLabelProps={{
						shrink: true,
					}}
					margin="normal"
				/>
				<IconButton aria-label="Add competency" 
					type="button"
					onClick={() => this.onSubmit()}
					disabled={!!this.state.error || this.state.competency.years === 0 || this.state.competency.title === ''}>
					<AddIcon />
				</IconButton>
				{this.state.error && 
					<p style={{'color': 'red'}}>{this.state.error}</p>
				}
			</div>
		);
	}

	private updateTitle(title: string): INewCompetency {
		return {
			...this.state.competency,
			title
		};
	}

	private updateYears(years: number): INewCompetency {
		return {
			...this.state.competency,
			years
		};
	}

	private onSubmit() {
		this.props.onClick(this.state.competency);
		this.setState(initState);
	}
}

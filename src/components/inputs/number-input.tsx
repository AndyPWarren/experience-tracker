import * as React from 'react';
import { TextField, IconButton } from '@material-ui/core';
import IconAdd from '@material-ui/icons/Add';
import IconRemove from '@material-ui/icons/Remove';

interface IProps {
	value: number;
	changeHandler: (value: number) => void;
	min?: number;
	max?: number;
	label?: string;
}
/**
 * Number Input wraps the material number text field
 * and provides increment and decrement buttons
 *
 * @export
 * @class NumberInput
 * @extends {React.Component<IProps>}
 */
export default class NumberInput extends React.Component<IProps> {
	public render() {
		return (
			<span>
				<TextField
					label={this.props.label || ''}
					value={this.props.value}
					inputProps={{min: this.props.min, max: this.props.max}}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						if (event.target.value === '') {
							return;
						}
						const value: number = parseInt(event.target.value, 10);
						if (this.props.max) {
							if (value > this.props.max) {
								this.props.changeHandler(this.props.max);
								return;
							}
						}
						if (this.props.min) {
							if (value < this.props.min) {
								this.props.changeHandler(this.props.min);
								return;
							}
						}
						return this.props.changeHandler(value);
					}}
					type="number"
					InputLabelProps={{
						shrink: true,
					}}
					margin="normal"
				/>
				<IconButton
					id="decrement"
					color="primary"
					onClick={() => this.props.changeHandler(this.props.value - 1)}
					disabled={this.props.value === this.props.min}
				>
					<IconRemove />
				</IconButton>
				<IconButton 
					id="increment"
					color="secondary"
					onClick={() => this.props.changeHandler(this.props.value + 1)}
					disabled={this.props.value === this.props.max}
				>
					<IconAdd />
				</IconButton>
			</span>
		);
	}
}

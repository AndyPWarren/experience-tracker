import * as React from 'react';
import * as ReactDOM from 'react-dom';
import NumberInput from '../number-input';
import { mount, ReactWrapper } from 'enzyme';

describe('Number input component', () => {
	let changeHandlerSpy: any;
	let component: ReactWrapper;

	beforeEach(() => {
		changeHandlerSpy = jest.fn();
		component = mount(<NumberInput
			value={5}
			changeHandler={changeHandlerSpy}
		/>);
	});

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<NumberInput value={1} changeHandler={changeHandlerSpy} />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	describe('Label text', () => {
		it('should render the label text when provided', () => {
			component = mount(<NumberInput
				value={5}
				changeHandler={changeHandlerSpy}
				label="some text"
			/>);
			const value = component.find('label');
			expect(value.text()).toEqual('some text');
		});

		it('should not render the label when no text is provided', () => {
			component = mount(<NumberInput
				value={5}
				changeHandler={changeHandlerSpy}
			/>);
			const value = component.find('label');
			expect(value.length).toEqual(0);
		});
	});

	describe('increment/decrement buttons', () => {
		it('should set the input value', () => {
			const value = component.find('NumberInput input');
			expect(value.props().value).toEqual(5);
		});

		it('should decrement when the button is clicked', () => {
			component.find('IconButton#decrement').simulate('click');
			expect(changeHandlerSpy).toHaveBeenCalledWith(4);
		});

		it('should increment when the button is clicked', () => {
			component.find('IconButton#increment').simulate('click');
			expect(changeHandlerSpy).toHaveBeenCalledWith(6);
		});

		describe('min/max', () => {
			beforeEach(() => {
				component = mount(<NumberInput
					value={5}
					max={5}
					min={5}
					changeHandler={changeHandlerSpy}
				/>);
			});

			it('should not decrement the value if it equal min', () => {
				component.find('IconButton#decrement').simulate('click');
				expect(changeHandlerSpy).not.toHaveBeenCalledWith();
			});

			it('should not increment the value if it equals max', () => {
				component.find('IconButton#increment').simulate('click');
				expect(changeHandlerSpy).not.toHaveBeenCalledWith();
			});
		});
	});

	describe('typing in input field', () => {
		let input: ReactWrapper;
		
		beforeEach(() => {
			input = component.find('NumberInput input');
		});

		it('not do anything if value is empty', () => {
			input.simulate('change', {target: {value: ''}});
			expect(changeHandlerSpy).not.toHaveBeenCalled();
		});

		it('should call change handler with number if max and min don\'t exist', () => {
			input.simulate('change', {target: {value: '2'}});
			expect(changeHandlerSpy).toHaveBeenCalledWith(2);
		});

		describe('max', () => {
			beforeEach(() => {
				component = mount(<NumberInput
					value={4}
					max={6}
					changeHandler={changeHandlerSpy}
				/>);
				input = component.find('NumberInput input');				
			});

			it('should call change handler with max number when values equals max', () => {
				input.simulate('change', {target: {value: '7'}});
				expect(changeHandlerSpy).toHaveBeenCalledWith(6);
			});

			it('should call change handler value if its under the max', () => {
				input.simulate('change', {target: {value: '5'}});
				expect(changeHandlerSpy).toHaveBeenCalledWith(5);
			});
		});

		describe('min', () => {
			beforeEach(() => {
				component = mount(<NumberInput
					value={4}
					min={2}
					changeHandler={changeHandlerSpy}
				/>);
				input = component.find('NumberInput input');				
			});

			it('should call change handler with min number when values equals min', () => {
				input.simulate('change', {target: {value: '1'}});
				expect(changeHandlerSpy).toHaveBeenCalledWith(2);
			});

			it('should call change handler value if its over the min', () => {
				input.simulate('change', {target: {value: '5'}});
				expect(changeHandlerSpy).toHaveBeenCalledWith(5);
			});
		});
	});
});

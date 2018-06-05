import { IEmployee } from '../../store/reducers/employees';
import * as renderer from 'react-test-renderer';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Employee from '../employee';

describe('Employee Component', () => {
	let mockEmployee: IEmployee;
	
	beforeEach(() => {
		mockEmployee = {
			id: 1,
			name: 'dave smith',
			totalYearsExperience: 1,
			competencies: []
		};
	});

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Employee employee={mockEmployee}/>, div);
		ReactDOM.unmountComponentAtNode(div);
	});
	
	it('renders correctly', () => {
		const tree = renderer
			.create(<Employee employee={mockEmployee}/>)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});


import { IEmployee } from '../../store/reducers/employees';
import * as renderer from 'react-test-renderer';
import * as React from 'react';
import Employee from '../employee';
import { MemoryRouter } from 'react-router-dom';

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

	it('renders correctly', () => {
		const tree = renderer
			.create(
				<MemoryRouter>
					<Employee employee={mockEmployee} deleteClickHandler={() => console.log} />
				</MemoryRouter>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});


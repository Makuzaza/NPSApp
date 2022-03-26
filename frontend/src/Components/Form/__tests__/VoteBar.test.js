import React from 'react';
import ReactDOM from 'react-dom';
import VoteBar from '../VoteBar';
import { cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

describe('<VoteBar/> Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<VoteBar />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Voting correctly', () => {
    const { container } = render(<VoteBar score={10} />);
    const input = container.querySelector('input');
    fireEvent.change(input, { target: { value: '2' } });
    fireEvent.change(input, { target: { value: '5' } });
    expect(input.value).toEqual('5');
  });
});

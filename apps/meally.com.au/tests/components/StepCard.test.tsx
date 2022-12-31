import { render, screen } from '@testing-library/react';
import StepCard from '../../src/common/components/elements/recipe_elemnts/StepCard';

describe('StepCard', () => {
  it('renders a heading', async () => {
    render(<StepCard number={1} body={'body element text'} />);
    const numberElement = screen.getAllByText(/1/i);
    const bodyElement = screen.getAllByText(/body element text/i);
    expect(numberElement).toBeTruthy();
    expect(bodyElement).toBeTruthy();
  });
});

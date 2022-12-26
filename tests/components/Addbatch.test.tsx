import {render, fireEvent, waitFor, screen} from '@testing-library/react'

import AddBatch from '../../src/common/components/elements/recipe_elemnts/Addbatch';


describe('AddBatch', () => {
  it('Plus in document', async () => {
    render(
      <AddBatch/>
    );
    expect(screen.getByTestId('plus_button')).toBeInTheDocument();
  });
  it('Minus in document', async () => {
    render(
      <AddBatch/>
    );
    expect(screen.getByTestId('minus_button')).toBeInTheDocument();
  });
  it('Title in document', async () => {
    render(
      <AddBatch/>
    );
    expect(screen.getByTestId('title')).toBeInTheDocument();
  });
  it('Check plus button', async () => {
    render(
      <AddBatch/>
    );
    await fireEvent.click(screen.getByTestId('plus_button'));
    expect(screen.getByTestId('title')).toHaveTextContent(/2 Batches/i);
  });
  it('Check minus button', async () => {
    render(
      <AddBatch/>
    );
    await fireEvent.click(screen.getByTestId('plus_button'));
    await fireEvent.click(screen.getByTestId('minus_button'));
    await fireEvent.click(screen.getByTestId('minus_button'));
    expect(screen.getByTestId('title')).toHaveTextContent(/1 Batch/i);
  });
});

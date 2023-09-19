import { render, screen } from '@testing-library/react';
import React from 'react';
import Dialog from './Dialog';

describe(Dialog, () => {
  const onClose = jest.fn();

  it('should render opened dialog with a provided content', () => {
    render(<Dialog title="Some title" open={true} onClose={onClose}><button>Some button</button></Dialog>);
    expect(screen.getByTestId('dialog-overlay')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
    expect(screen.getByText('Some title')).toBeInTheDocument();
    expect(screen.getByText('Some button')).toBeInTheDocument();
    expect(screen.getByLabelText('Close Dialog', {selector: 'button'})).toBeInTheDocument();
  });

  it('should NOT render dialog when it is not opened', () => {
    render(<Dialog title="Some title" open={false} onClose={onClose}><button>Some button</button></Dialog>);
    expect(screen.queryByTestId('dialog-overlay')).not.toBeInTheDocument();
  });

  it('should call onClose prop on dialog overlay click', () => {
    render(<Dialog title="Some title" open={true} onClose={onClose}><button>Some button</button></Dialog>);
    screen.getByTestId('dialog-overlay').click();
    expect(onClose).toHaveBeenCalled();
  });

  it('should call onClose prop on close button click', () => {
    render(<Dialog title="Some title" open={true} onClose={onClose}><button>Some button</button></Dialog>);
    screen.getByLabelText('Close Dialog', {selector: 'button'}).click();
    expect(onClose).toHaveBeenCalled();
  });

  it('should NOT call onClose prop on dialog content click', () => {
    render(<Dialog title="Some title" open={true} onClose={onClose}><button>Some button</button></Dialog>);
    screen.getByTestId('dialog-content').click();
    expect(onClose).not.toHaveBeenCalled();
  });
});

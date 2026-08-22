import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NInput } from '@/components/ui/ninput';

describe('Level 1 Unit Test: NInput Component', () => {
  it('renders input with placeholder and handles user text input', () => {
    const handleChange = vi.fn();
    render(
      <NInput
        placeholder="Enter your task title"
        onChange={handleChange}
        data-testid="task-input"
      />
    );

    const inputEl = screen.getByPlaceholderText('Enter your task title');
    expect(inputEl).toBeInTheDocument();

    fireEvent.change(inputEl, { target: { value: 'Complete Assignment 1' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies disabled attributes properly', () => {
    render(<NInput placeholder="Disabled Field" disabled />);
    const inputEl = screen.getByPlaceholderText('Disabled Field');
    expect(inputEl).toBeDisabled();
  });
});

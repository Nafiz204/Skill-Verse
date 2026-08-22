import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NButton } from '@/components/ui/nbutton';

describe('Level 1 Unit Test: NButton Component', () => {
  it('renders button with children text', () => {
    render(<NButton>Enroll Now</NButton>);
    expect(screen.getByRole('button', { name: /enroll now/i })).toBeInTheDocument();
  });

  it('handles click events properly', () => {
    const handleClick = vi.fn();
    render(<NButton onClick={handleClick}>Click Me</NButton>);
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies destructive variant classes correctly', () => {
    render(<NButton variant="destructive">Delete Task</NButton>);
    const btn = screen.getByRole('button', { name: /delete task/i });
    expect(btn).toHaveClass('bg-destructive');
  });
});

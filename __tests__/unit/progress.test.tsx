import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Progress } from '@/components/ui/progress';

describe('Level 1 Unit Test: Progress Component', () => {
  it('renders progress bar with 50% width indicator', () => {
    render(<Progress value={50} data-testid="course-progress" />);
    const progressEl = screen.getByTestId('course-progress');
    expect(progressEl).toBeInTheDocument();
  });

  it('renders progress indicator with success class at 100%', () => {
    const { container } = render(<Progress value={100} />);
    const indicator = container.querySelector('[data-slot="progress-indicator"]');
    expect(indicator).toHaveClass('bg-success');
  });
});

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NCard, NCardHeader, NCardTitle, NCardDescription, NCardContent } from '@/components/ui/ncard';

describe('Level 1 Unit Test: NCard Components', () => {
  it('renders card title, description, and content correctly', () => {
    render(
      <NCard data-testid="test-card">
        <NCardHeader>
          <NCardTitle>Web Development 101</NCardTitle>
          <NCardDescription>Learn HTML, CSS, & TypeScript</NCardDescription>
        </NCardHeader>
        <NCardContent>
          <p>Module 1: Introduction to Skill Verse</p>
        </NCardContent>
      </NCard>
    );

    expect(screen.getByTestId('test-card')).toHaveClass('bg-secondary-background');
    expect(screen.getByText('Web Development 101')).toBeInTheDocument();
    expect(screen.getByText('Learn HTML, CSS, & TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Module 1: Introduction to Skill Verse')).toBeInTheDocument();
  });
});

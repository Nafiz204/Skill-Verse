import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthProvider, useAuth } from '@/components/auth-context';

// Mock localStorage for Node environment
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

function TestConsumer() {
  const { user, signIn, signOut } = useAuth();
  return (
    <div>
      <span data-testid="user-status">
        {user ? `Logged in as ${user.email} (${user.userType})` : 'Logged out'}
      </span>
      <button onClick={() => signIn('learner@skillverse.com', 'secret', 'learner')}>
        Sign In Learner
      </button>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}

describe('Level 2 Integration Test: Auth Provider & Hook Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides initial logged out state', () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );
    expect(screen.getByTestId('user-status')).toHaveTextContent('Logged out');
  });

  it('updates state and persists user data upon sign in integration', async () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    const signInBtn = screen.getByRole('button', { name: /sign in learner/i });

    await act(async () => {
      signInBtn.click();
      await new Promise((res) => setTimeout(res, 1100));
    });

    expect(screen.getByTestId('user-status')).toHaveTextContent('Logged in as learner@skillverse.com (learner)');
    expect(localStorage.getItem('skill_verse_user')).toContain('learner@skillverse.com');
  });
});

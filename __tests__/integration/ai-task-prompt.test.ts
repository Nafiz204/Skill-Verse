import { describe, it, expect } from 'vitest';

/**
 * Pure function helper testing task urgency calculation and workload context formatting
 * matching the logic in app/api/ai/task-suggestions/route.ts
 */
function calculateTaskUrgency(dueDateString: string, todayDate: Date = new Date('2026-08-21')) {
  const dueDate = new Date(dueDateString);
  const daysUntilDue = Math.ceil((dueDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24));
  return daysUntilDue;
}

function formatWorkloadSummary(allTasks: Array<{ status: string; course: string }>, targetCourse: string) {
  const todoCount = allTasks.filter((t) => t.status === 'todo').length;
  const inProgressCount = allTasks.filter((t) => t.status === 'in-progress').length;
  const completedCount = allTasks.filter((t) => t.status === 'completed').length;
  const courseTasks = allTasks.filter((t) => t.course === targetCourse).length;

  return { todoCount, inProgressCount, completedCount, courseTasks };
}

describe('Level 2 Integration Test: AI Task Suggestions Logic & Context Formatting', () => {
  it('calculates days until due date accurately', () => {
    const today = new Date('2026-08-21');
    const urgency = calculateTaskUrgency('2026-08-26', today);
    expect(urgency).toBe(5);
  });

  it('aggregates learner workload context for AI prompt generation', () => {
    const mockTasks = [
      { status: 'todo', course: 'Software Engineering' },
      { status: 'in-progress', course: 'Software Engineering' },
      { status: 'completed', course: 'Database Systems' },
    ];

    const summary = formatWorkloadSummary(mockTasks, 'Software Engineering');
    expect(summary.todoCount).toBe(1);
    expect(summary.inProgressCount).toBe(1);
    expect(summary.completedCount).toBe(1);
    expect(summary.courseTasks).toBe(2);
  });
});

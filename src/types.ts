/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  name: string;
  currentWeight: number;
  targetWeight: number;
  dailyCaloriesGoal: number;
  dailyWaterGoal: number;
  status: 'active' | 'inactive';
}

export interface Exercise {
  id: string;
  name: string;
  duration?: number; // seconds
  reps?: string;
  sets: number;
  description: string;
  image?: string;
}

export interface DayWorkout {
  day: string;
  exercises: Exercise[];
}

export interface WorkoutProgram {
  id: string;
  title: string;
  subtitle: string;
  days: DayWorkout[];
}

export interface WorkoutPlan {
  id: string;
  name: string;
  time: string;
  dayOfWeek: string;
  exercises: Exercise[];
  createdAt: string;
}

export interface WeightEntry {
  date: string; // ISO string
  weight: number;
}

export interface DailyStats {
  date: string; // YYYY-MM-DD
  calories: number;
  water: number; // in ml
  workouts: string[]; // ids of completed plans
}

export interface AppState {
  user: User | null;
  plans: WorkoutPlan[];
  weightHistory: WeightEntry[];
  dailyLogs: Record<string, DailyStats>; // Key is YYYY-MM-DD
}

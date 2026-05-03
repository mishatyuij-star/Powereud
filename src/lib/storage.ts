/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppState, User, WorkoutPlan, WeightEntry, DailyStats } from '../types';

const STORAGE_KEY = 'power_app_state';

const DEFAULT_STATE: AppState = {
  user: null,
  plans: [],
  weightHistory: [],
  dailyLogs: {},
};

export const loadState = (): AppState => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (!serializedState) return DEFAULT_STATE;
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Failed to load state:', error);
    return DEFAULT_STATE;
  }
};

export const saveState = (state: AppState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save state:', error);
  }
};

export const getDailyLog = (date: string): DailyStats => {
  const state = loadState();
  return state.dailyLogs[date] || { date, calories: 0, water: 0, workouts: [] };
};

export const updateDailyLog = (log: DailyStats) => {
  const state = loadState();
  const newState = {
    ...state,
    dailyLogs: {
      ...state.dailyLogs,
      [log.date]: log,
    },
  };
  saveState(newState);
};

export const addWeightEntry = (weight: number) => {
  const state = loadState();
  const entry: WeightEntry = {
    date: new Date().toISOString(),
    weight,
  };
  const newState = {
    ...state,
    user: state.user ? { ...state.user, currentWeight: weight } : null,
    weightHistory: [...state.weightHistory, entry],
  };
  saveState(newState);
};

export const savePlan = (plan: WorkoutPlan) => {
  const state = loadState();
  const index = state.plans.findIndex(p => p.id === plan.id);
  const newPlans = [...state.plans];
  if (index >= 0) {
    newPlans[index] = plan;
  } else {
    newPlans.push(plan);
  }
  saveState({ ...state, plans: newPlans });
};

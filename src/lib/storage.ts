/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  getDocs, 
  addDoc, 
  deleteDoc,
  updateDoc,
  orderBy,
  limit
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from './firebase';
import { AppState, User, WorkoutPlan, WeightEntry, DailyStats } from '../types';

export const saveUser = async (userId: string, user: User) => {
  const path = `users/${userId}`;
  try {
    await setDoc(doc(db, path), {
      ...user,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

export const getUser = async (userId: string): Promise<User | null> => {
  const path = `users/${userId}`;
  try {
    const docSnap = await getDoc(doc(db, path));
    if (docSnap.exists()) {
      return docSnap.data() as User;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return null;
  }
};

export const savePlan = async (userId: string, plan: WorkoutPlan) => {
  const path = `users/${userId}/plans/${plan.id}`;
  try {
    await setDoc(doc(db, path), plan);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

export const getPlans = async (userId: string): Promise<WorkoutPlan[]> => {
  const path = `users/${userId}/plans`;
  try {
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as WorkoutPlan);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
};

export const deletePlan = async (userId: string, planId: string) => {
  const path = `users/${userId}/plans/${planId}`;
  try {
    await deleteDoc(doc(db, path));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
};

export const addWeightEntry = async (userId: string, weight: number) => {
  const path = `users/${userId}/weightHistory`;
  const userPath = `users/${userId}`;
  try {
    const entry: WeightEntry = {
      date: new Date().toISOString(),
      weight,
    };
    await addDoc(collection(db, path), entry);
    await updateDoc(doc(db, userPath), { currentWeight: weight });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

export const getWeightHistory = async (userId: string): Promise<WeightEntry[]> => {
  const path = `users/${userId}/weightHistory`;
  try {
    const q = query(collection(db, path), orderBy('date', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as WeightEntry);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
};

export const updateDailyLog = async (userId: string, log: DailyStats) => {
  const path = `users/${userId}/dailyLogs/${log.date}`;
  try {
    await setDoc(doc(db, path), log);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

export const getDailyLog = async (userId: string, date: string): Promise<DailyStats> => {
  const path = `users/${userId}/dailyLogs/${date}`;
  try {
    const docSnap = await getDoc(doc(db, path));
    if (docSnap.exists()) {
      return docSnap.data() as DailyStats;
    }
    return { date, calories: 0, water: 0, workouts: [] };
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return { date, calories: 0, water: 0, workouts: [] };
  }
};

// Legacy support or fallback
export const loadState = (): AppState => {
  return {
    user: null,
    plans: [],
    weightHistory: [],
    dailyLogs: {},
  };
};

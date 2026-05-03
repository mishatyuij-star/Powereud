/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { Dashboard } from './pages/Dashboard';
import { Sport } from './pages/Sport';
import { Plans } from './pages/Plans';
import { Progress } from './pages/Progress';
import { Profile } from './pages/Profile';
import { AppState, User, DailyStats } from './types';
import { loadState, saveState, getDailyLog } from './lib/storage';

export default function App() {
  const [state, setState] = useState<AppState>(loadState());
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    saveState(state);
  }, [state]);

  const handleLogin = (name: string) => {
    const newUser: User = {
      name,
      currentWeight: 0,
      targetWeight: 0,
      dailyCaloriesGoal: 2000,
      dailyWaterGoal: 2000,
      status: 'active'
    };
    setState(prev => ({ ...prev, user: newUser }));
  };

  const handleLogout = () => {
    setState(prev => ({ ...prev, user: null }));
    setActiveTab('home');
  };

  const handleUpdateUser = (updatedUser: User) => {
    setState(prev => ({ ...prev, user: updatedUser }));
  };

  const handleWorkoutComplete = () => {
    // Add current date to stats
    const today = new Date().toISOString().split('T')[0];
    const log = getDailyLog(today);
    
    // Simulate slight weight variation for "progress"
    const currentWeight = state.user?.currentWeight || 0;
    const newWeight = currentWeight > 0 ? currentWeight - 0.1 : 0;
    
    const newState = {
      ...state,
      user: state.user ? { ...state.user, currentWeight: Number(newWeight.toFixed(1)) } : null,
      weightHistory: [...state.weightHistory, { date: new Date().toISOString(), weight: newWeight }],
      dailyLogs: {
        ...state.dailyLogs,
        [today]: { ...log, workouts: [...log.workouts, 'workout_id'] }
      }
    };
    
    setState(newState);
    setActiveTab('progress');
  };

  const handleAddPlan = (plan: WorkoutPlan) => {
    setState(prev => ({ ...prev, plans: [...prev.plans, plan] }));
  };

  const handleRemovePlan = (id: string) => {
    setState(prev => ({
      ...prev,
      plans: prev.plans.filter(p => p.id !== id)
    }));
  };

  if (!state.user) {
    return <Login onLogin={handleLogin} />;
  }

  const today = new Date().toISOString().split('T')[0];
  const dailyStats = getDailyLog(today);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard user={state.user!} dailyStats={dailyStats} setActiveTab={setActiveTab} />;
      case 'sport':
        return <Sport onWorkoutComplete={handleWorkoutComplete} logs={state.dailyLogs} />;
      case 'plans':
        return <Plans plans={state.plans} onAddPlan={handleAddPlan} onRemovePlan={handleRemovePlan} />;
      case 'progress':
        return <Progress weightHistory={state.weightHistory} />;
      case 'profile':
        return (
          <Profile 
            user={state.user!} 
            onUpdateUser={handleUpdateUser} 
            onLogout={handleLogout} 
          />
        );
      default:
        return <Dashboard user={state.user!} dailyStats={dailyStats} />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab} userName={state.user!.name}>
      {renderContent()}
    </Layout>
  );
}

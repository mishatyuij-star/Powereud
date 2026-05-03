/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './lib/firebase';
import { getUser, getPlans, getWeightHistory, getDailyLog, saveUser } from './lib/storage';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { Dashboard } from './pages/Dashboard';
import { Sport } from './pages/Sport';
import { Plans } from './pages/Plans';
import { Progress } from './pages/Progress';
import { Profile } from './pages/Profile';
import { AppState, User, WorkoutPlan } from './types';

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [state, setState] = useState<AppState>({
    user: null,
    plans: [],
    weightHistory: [],
    dailyLogs: {},
  });
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        setUser(firebaseUser);
        // Load data from Firestore
        const userData = await getUser(firebaseUser.uid);
        if (userData) {
          const plans = await getPlans(firebaseUser.uid);
          const history = await getWeightHistory(firebaseUser.uid);
          const today = new Date().toISOString().split('T')[0];
          const stats = await getDailyLog(firebaseUser.uid, today);
          
          setState({
            user: userData,
            plans,
            weightHistory: history,
            dailyLogs: { [today]: stats },
          });
        }
      } else {
        setUser(null);
        setState({
          user: null,
          plans: [],
          weightHistory: [],
          dailyLogs: {},
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (name: string) => {
    // Handled in Login component via signInAnonymously
  };

  const handleLogout = async () => {
    await signOut(auth);
    setActiveTab('home');
  };

  const handleUpdateUser = async (updatedUser: User) => {
    if (user) {
      setState(prev => ({ ...prev, user: updatedUser }));
      await saveUser(user.uid, updatedUser);
    }
  };

  const handleWorkoutComplete = () => {
    // Current simple implementation continues to update local state
    // In a real app, this would call updateDailyLog
    const today = new Date().toISOString().split('T')[0];
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user || !state.user) {
    return <Login onLogin={handleLogin} />;
  }

  const today = new Date().toISOString().split('T')[0];
  const dailyStats = state.dailyLogs[today] || { date: today, calories: 0, water: 0, workouts: [] };

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

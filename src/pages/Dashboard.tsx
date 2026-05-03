/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Card } from '../components/ui/Card';
import { Calendar as CalendarIcon, TrendingUp, Dumbbell } from 'lucide-react';
import { User, DailyStats } from '../types';

interface DashboardProps {
  user: User;
  dailyStats: DailyStats;
  setActiveTab: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, dailyStats, setActiveTab }) => {
  const [today, setToday] = React.useState(new Date());

  React.useEffect(() => {
    // Update at midnight
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const msUntilMidnight = midnight.getTime() - now.getTime();

    const timer = setTimeout(() => {
      setToday(new Date());
    }, msUntilMidnight);

    return () => clearTimeout(timer);
  }, [today]);

  const dateStr = today.toLocaleDateString('uk-UA', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  });

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-[3.5rem] py-12 px-6 text-center space-y-4 border-2 border-white/50 shadow-[0_20px_50px_rgba(204,255,0,0.15)] group bg-shimmer animate-gradient">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] -z-10" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(204,255,0,0.2)_0%,transparent_50%)] -z-10 animate-pulse" />
        
        <div className="bg-brand-black text-white inline-block px-6 py-2 rounded-full font-mono italic font-bold text-[10px] uppercase tracking-[0.2em] shadow-xl">
          Твій персональний hub
        </div>
        <h2 className="text-6xl sm:text-8xl font-black italic uppercase tracking-tighter text-brand-primary drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] sm:drop-shadow-[6px_6px_0px_rgba(0,0,0,1)] animate-appearance-in text-center w-full">
          Power
        </h2>
        <p className="font-mono text-[11px] font-black text-brand-black/40 uppercase tracking-[0.1em] max-w-[240px] mx-auto leading-relaxed">
          Час підкорювати нові вершини разом з Power
        </p>

        {/* Decorative elements */}
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-primary/20 blur-3xl rounded-full" />
        <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-400/20 blur-3xl rounded-full" />
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <h3 className="text-3xl font-black italic uppercase"> Привіт, {user.name}! 👋</h3>
          <p className="font-mono text-[10px] font-bold text-gray-400 uppercase">твій сьогоднішній прогрес</p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 brutal-border bg-white rounded-xl brutal-shadow-sm font-bold text-sm">
          {dateStr}
          <CalendarIcon size={16} />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card 
            onClick={() => setActiveTab('progress')}
            className="relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer active:scale-95"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-brand-primary/20 rounded-2xl brutal-border shadow-sm">
                <TrendingUp className="text-brand-black" size={20} />
              </div>
              <div className="space-y-1">
                <p className="font-mono text-[9px] font-black uppercase text-gray-400">Моя вага</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black italic">{user.currentWeight}</span>
                  <span className="text-xl font-black italic text-gray-300">кг</span>
                </div>
              </div>
            </div>
            <div className="absolute right-[-10px] bottom-[-10px] opacity-5 group-hover:opacity-10 transition-opacity">
               <TrendingUp size={100} />
            </div>
          </Card>

          <Card 
            onClick={() => setActiveTab('sport')}
            className="relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer text-center py-6 bg-brand-offwhite active:scale-95 border-brand-border"
          >
             <div className="space-y-4">
               <div className="flex justify-center">
                 <div className="p-1 animate-bounce">
                   <Dumbbell size={40} className="text-brand-black" />
                 </div>
               </div>
               <div className="space-y-1">
                 <h4 className="text-2xl font-black italic uppercase">Твоя черга!</h4>
                 <p className="text-gray-400 font-bold uppercase font-mono text-[9px]">
                   Натисни щоб почати тренування
                 </p>
               </div>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

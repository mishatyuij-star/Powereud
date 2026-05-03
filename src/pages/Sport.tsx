/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { ChevronRight, History, Dumbbell, ArrowLeft } from 'lucide-react';
import { WORKOUT_PROGRAMS } from '../constants/exercises';
import { WorkoutPlayer } from '../components/WorkoutPlayer';
import { DayWorkout, Exercise, DailyStats } from '../types';

export const Sport: React.FC<{ 
  onWorkoutComplete: () => void;
  logs: Record<string, DailyStats>;
}> = ({ onWorkoutComplete, logs }) => {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<DayWorkout | null>(null);
  const [activeExercises, setActiveExercises] = useState<Exercise[] | null>(null);
  const [currentWeek, setCurrentWeek] = useState(1);

  const stats = Object.values(logs).reduce((acc, log) => {
    if (log.workouts && log.workouts.length > 0) {
      acc.days += 1;
      acc.exercises += log.workouts.length;
    }
    return acc;
  }, { days: 0, exercises: 0 });

  // Current week is calculated based on how many full cycles (7 days) have been done
  // or at least showing which week the user is on based on progress
  const weeksCompleted = Math.floor(stats.days / 7) + 1;

  const programs = WORKOUT_PROGRAMS;

  const getExercisesForWeek = (categoryId: string, baseExercises: Exercise[]) => {
    const fullPool = categoryId === 'stretch' ? WORKOUT_PROGRAMS[0].days[0].exercises : 
                     categoryId === 'mass' ? WORKOUT_PROGRAMS[1].days[0].exercises : 
                     WORKOUT_PROGRAMS[2].days[0].exercises;
    
    // Total exercises grows by 3 each week as per user request
    const additionalCount = (currentWeek - 1) * 3; 
    const targetTotal = 10 + additionalCount;
    
    // Return unique exercises from the category pool
    // In a real app we'd have a 50+ exercise pool, here we slice from our 20-exercise pool
    const poolByCategory = WORKOUT_PROGRAMS.find(p => p.id === categoryId)?.days[0].exercises || [];
    
    // We'll generate a variety of exercises by combining base ones and extra ones from the pool
    const result = poolByCategory.slice(0, Math.min(targetTotal, poolByCategory.length));
    
    // Adjust duration and reps slightly to make it "really help" as requested
    return result.map(ex => ({
      ...ex,
      duration: ex.duration ? ex.duration + (currentWeek - 1) * 5 : undefined,
      sets: ex.sets ? ex.sets + Math.floor(currentWeek / 2) : undefined
    }));
  };

  if (activeExercises && selectedProgram) {
    return (
      <WorkoutPlayer 
        exercises={getExercisesForWeek(selectedProgram, activeExercises)}
        onCancel={() => setActiveExercises(null)}
        onComplete={() => {
          setActiveExercises(null);
          onWorkoutComplete();
        }}
      />
    );
  }

  if (selectedProgram) {
    const program = programs.find(p => p.id === selectedProgram)!;
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center bg-white/40 p-2 rounded-2xl brutal-border">
          <button onClick={() => setSelectedProgram(null)} className="flex items-center gap-2 font-mono text-[10px] font-black uppercase text-gray-400 hover:text-brand-black px-2">
            <ArrowLeft size={14} /> Назад
          </button>
          <div className="flex bg-brand-offwhite rounded-xl p-1 brutal-border shadow-sm">
            {[1, 2, 3, 4].map(w => (
              <button 
                key={w}
                onClick={() => setCurrentWeek(w)}
                className={`px-3 py-1 text-[10px] font-black uppercase rounded-lg transition-all ${
                  currentWeek === w ? 'bg-brand-primary brutal-border' : 'text-gray-400'
                }`}
              >
                Тиж {w}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-1">
          <h2 className="text-4xl font-black italic uppercase leading-tight tracking-tighter">{program.title}</h2>
          <p className="font-mono text-[10px] font-bold text-gray-400 uppercase">{program.subtitle} • {10 + (currentWeek - 1) * 3} вправ</p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {program.days.map((day) => (
            <Card 
              key={day.day} 
              className="hover:bg-brand-primary active:scale-95 transition-all cursor-pointer group p-4 border-2"
              onClick={() => setActiveExercises(day.exercises)}
            >
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black italic uppercase italic leading-none">{day.day}</h3>
                  <p className="font-mono text-[9px] font-bold uppercase text-gray-400 group-hover:text-black/60">
                    Натисни щоб почати
                  </p>
                </div>
                <div className="w-10 h-10 bg-brand-black text-brand-primary rounded-xl flex items-center justify-center brutal-shadow-sm group-hover:bg-white group-hover:text-black transition-colors">
                  <ChevronRight size={20} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
             <h2 className="text-5xl font-black italic uppercase tracking-tighter">Програми</h2>
             <span className="text-3xl">💪</span>
          </div>
          <p className="font-mono text-[10px] font-black uppercase text-gray-400">
            Вибери свій шлях сьогодні
          </p>
        </div>
        <div className="bg-brand-black text-brand-primary px-3 py-1 rounded-full font-mono font-black italic text-[10px] uppercase border-2 border-brand-black">
          Тиждень 1
        </div>
      </div>

      <div className="space-y-4">
        {programs.map((program) => (
          <Card 
            key={program.id} 
            className="group hover:scale-[1.02] active:scale-95 transition-all cursor-pointer border-4 hover:border-brand-primary"
            onClick={() => setSelectedProgram(program.id)}
          >
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="text-3xl font-black italic uppercase italic leading-none group-hover:translate-x-1 transition-transform">{program.title}</h3>
                <p className="font-mono text-[10px] font-black uppercase text-gray-400 group-hover:text-brand-black transition-colors">{program.subtitle}</p>
              </div>
              <div className="w-12 h-12 bg-brand-black text-brand-primary rounded-2xl flex items-center justify-center group-hover:brutal-shadow transition-all">
                <ChevronRight size={24} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-4 pt-6">
        <div className="flex items-center gap-3">
          <History className="text-brand-primary" size={24} />
          <h2 className="text-3xl font-black italic uppercase">Мій прогрес</h2>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-3 text-center bg-white border-2">
            <p className="text-[24px] font-black italic leading-none">{stats.exercises}</p>
            <p className="font-mono text-[8px] font-bold text-gray-400 uppercase mt-1">Вправ</p>
          </Card>
          <Card className="p-3 text-center bg-white border-2">
            <p className="text-[24px] font-black italic leading-none">{stats.days}</p>
            <p className="font-mono text-[8px] font-bold text-gray-400 uppercase mt-1">Дні</p>
          </Card>
          <Card className="p-3 text-center bg-brand-primary border-2">
            <p className="text-[24px] font-black italic leading-none">{weeksCompleted}</p>
            <p className="font-mono text-[8px] font-bold text-black/60 uppercase mt-1">Тиждень</p>
          </Card>
        </div>

        {stats.days === 0 && (
          <Card className="border-dashed border-gray-200 bg-white/30 flex flex-col items-center justify-center py-8 text-center shadow-none rounded-[2rem]">
            <Dumbbell size={32} className="text-gray-200 mb-3 animate-pulse" />
            <p className="font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest px-8">
              Виконай перше тренування для статистики!
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

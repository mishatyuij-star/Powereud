/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ArrowLeft, Play, Pause, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Exercise } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface WorkoutPlayerProps {
  exercises: Exercise[];
  onComplete: () => void;
  onCancel: () => void;
}

export const WorkoutPlayer: React.FC<WorkoutPlayerProps> = ({ exercises, onComplete, onCancel }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(exercises[0]?.duration || 0);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentExercise = exercises[currentIndex];

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      handleNext();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTimeLeft(exercises[currentIndex + 1]?.duration || 30);
      setIsActive(false);
    } else {
      setIsActive(false);
      setIsFinished(true);
    }
  };

  const togglePause = () => setIsActive(!isActive);

  if (isFinished) {
    return (
      <div className="space-y-6 text-center py-12">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-32 h-32 bg-brand-primary rounded-full flex items-center justify-center mx-auto brutal-border brutal-shadow mb-8"
        >
          <CheckCircle2 size={64} />
        </motion.div>
        <h2 className="text-5xl font-black italic uppercase tracking-tighter">Чудова робота!</h2>
        <p className="text-gray-500 font-bold uppercase font-mono text-sm max-w-[240px] mx-auto">Тренування завершено. Твій прогрес оновлено.</p>
        <Button onClick={onComplete} fullWidth className="rounded-3xl py-6 mt-8">Повернутись</Button>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <button onClick={onCancel} className="flex items-center gap-2 font-mono text-xs font-black uppercase text-gray-400 hover:text-brand-black transition-colors">
        <ArrowLeft size={16} /> Повернутись
      </button>

      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <p className="font-mono text-[10px] font-black uppercase text-gray-400">Вправа {currentIndex + 1} з {exercises.length}</p>
          <div className="h-2 w-32 bg-brand-offwhite brutal-border rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-primary transition-all duration-300" 
              style={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }}
            />
          </div>
        </div>
        <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none">{currentExercise.name}</h2>
      </div>

      <Card className="aspect-square flex items-center justify-center bg-brand-offwhite relative overflow-hidden">
        <div className="text-9xl font-black italic font-mono drop-shadow-md">
          {formatTime(timeLeft)}
        </div>
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
           {currentExercise.reps && (
             <div className="bg-brand-black text-white px-4 py-1 rounded-full text-xs font-black italic uppercase">
               {currentExercise.reps} ПОВТ
             </div>
           )}
           <div className="bg-brand-primary text-brand-black px-4 py-1 rounded-full text-xs font-black italic uppercase brutal-border">
             {currentExercise.sets} ПІДХІД
           </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant={isActive ? 'secondary' : 'primary'} 
          onClick={togglePause}
          className="rounded-3xl py-6"
        >
          {isActive ? <Pause size={32} /> : <Play size={32} />}
        </Button>
        <Button 
          variant="black" 
          onClick={handleNext}
          className="rounded-3xl py-6 underline decoration-brand-primary decoration-4 underline-offset-4"
        >
          <div className="flex items-center gap-2">
            <span>ДАЛІ</span>
            <ChevronRight size={24} />
          </div>
        </Button>
      </div>

      <Card className="bg-white/40 p-4">
        <h4 className="font-mono text-[10px] font-black uppercase text-gray-400 mb-2">Як робити:</h4>
        <p className="text-sm font-medium leading-relaxed">{currentExercise.description}</p>
      </Card>
    </div>
  );
};

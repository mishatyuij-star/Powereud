/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { X, Calendar, Clock, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WorkoutPlan } from '../types';

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (plan: WorkoutPlan) => void;
}

export const PlanModal: React.FC<PlanModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('09:00');
  const [day, setDay] = useState('Понеділок');

  const days = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота', 'Неділя'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newPlan: WorkoutPlan = {
      id: Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      time,
      dayOfWeek: day,
      exercises: [],
      createdAt: new Date().toISOString()
    };

    onSave(newPlan);
    setName('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-8 brutal-border brutal-shadow"
          >
            <button 
              className="absolute top-6 right-6 p-2 bg-brand-offwhite rounded-full brutal-border"
              onClick={onClose}
            >
              <X size={20} />
            </button>

            <h3 className="text-4xl font-black italic uppercase italic mb-8 tracking-tighter">Створити</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-mono text-[10px] font-black uppercase text-gray-400 px-2">
                    <Edit3 size={14} /> Назва секції
                  </label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Наприклад: Груди + Спина"
                    className="w-full p-4 font-bold brutal-border rounded-2xl bg-brand-offwhite focus:outline-none focus:ring-4 focus:ring-brand-primary"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 font-mono text-[10px] font-black uppercase text-gray-400 px-2">
                      <Clock size={14} /> Час
                    </label>
                    <input 
                      type="time" 
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full p-4 font-bold brutal-border rounded-2xl bg-brand-offwhite"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 font-mono text-[10px] font-black uppercase text-gray-400 px-2">
                      <Calendar size={14} /> День
                    </label>
                    <select 
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                      className="w-full p-4 font-bold brutal-border rounded-2xl bg-brand-offwhite appearance-none"
                    >
                      {days.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <Button fullWidth type="submit" size="lg" className="rounded-2xl mt-4">
                Зберегти план
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

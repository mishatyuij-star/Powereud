/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Plus, Calendar, Clock } from 'lucide-react';
import { WorkoutPlan } from '../types';
import { PlanModal } from '../components/PlanModal';

interface PlansProps {
  plans: WorkoutPlan[];
  onAddPlan: (plan: WorkoutPlan) => void;
  onRemovePlan: (id: string) => void;
}

export const Plans: React.FC<PlansProps> = ({ plans, onAddPlan, onRemovePlan }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
             <h2 className="text-5xl font-black italic uppercase tracking-tighter">Мої плани</h2>
             <span className="text-3xl">📅</span>
          </div>
          <p className="font-mono text-[10px] font-black uppercase text-gray-400 font-bold">
            Твій розклад тренувань
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-16 h-16 bg-brand-primary brutal-border brutal-shadow rounded-3xl flex items-center justify-center active:translate-x-1 active:translate-y-1 active:shadow-none transition-all group"
        >
          <Plus size={32} className="group-hover:scale-125 transition-transform" />
        </button>
      </div>

      <PlanModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={onAddPlan} 
      />

      {plans.length === 0 ? (
        <Card className="border-4 border-dashed border-gray-200 bg-white/20 flex flex-col items-center justify-center py-20 text-center shadow-none mb-10 rounded-[4rem]">
          <div className="w-24 h-24 bg-brand-primary/20 rounded-full flex items-center justify-center mb-8 border-4 border-brand-primary animate-pulse">
            <Calendar size={40} className="text-brand-black" />
          </div>
          <h3 className="text-4xl font-black italic uppercase mb-2 tracking-tighter">Твій план порожній</h3>
          <p className="text-gray-400 font-bold uppercase font-mono text-[10px] max-w-[240px] mb-12">
            Додай своє перше тренування, а ми нагадаємо про нього
          </p>
          <Button 
            variant="black" 
            className="rounded-full px-12 italic tracking-tighter"
            onClick={() => setIsModalOpen(true)}
          >
            Створити план
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {plans.map((plan) => (
            <Card key={plan.id} className="hover:scale-[1.02] transition-all border-4 border-brand-black">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black italic uppercase italic leading-none">{plan.name}</h3>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1 font-mono text-[10px] font-black text-gray-400 uppercase">
                      <Calendar size={12} /> {plan.dayOfWeek}
                    </div>
                    <div className="flex items-center gap-1 font-mono text-[10px] font-black text-gray-400 uppercase">
                      <Clock size={12} /> {plan.time}
                    </div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-xl px-4 text-red-500 border-red-500"
                  onClick={() => onRemovePlan(plan.id)}
                >
                  Відмінити
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

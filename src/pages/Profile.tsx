/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { User as UserIcon, Target, Info, LogOut, X } from 'lucide-react';
import { User } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ProfileProps {
  user: User;
  onUpdateUser: (user: User) => void;
  onLogout: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onUpdateUser, onLogout }) => {
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [tempWeight, setTempWeight] = useState(user.currentWeight);
  const [tempTarget, setTempTarget] = useState(user.targetWeight);

  const handleSaveGoals = () => {
    onUpdateUser({
      ...user,
      currentWeight: Number(tempWeight),
      targetWeight: Number(tempTarget),
    });
    setShowGoalsModal(false);
  };

  return (
    <div className="space-y-8">
      {/* User Header */}
      <div className="text-center space-y-4">
        <div className="relative inline-block">
          <div className="w-32 h-32 bg-brand-primary brutal-border brutal-shadow rounded-[3rem] flex items-center justify-center mx-auto">
            <UserIcon size={64} className="text-brand-black" />
          </div>
          <div className="absolute bottom-1 right-1 w-8 h-8 bg-green-500 brutal-border rounded-full" />
        </div>
        <div className="space-y-1">
          <h2 className="text-5xl font-black italic uppercase tracking-tighter">{user.name}</h2>
          <p className="font-mono text-xs font-bold text-gray-400 uppercase">Твій статус: {user.status}</p>
        </div>
      </div>

      {/* Goals Card */}
      <Card className="relative overflow-hidden">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-xl text-red-500">
              <Target size={24} />
            </div>
            <h3 className="text-3xl font-black italic uppercase italic leading-none">Твої Цілі</h3>
          </div>
          <Button variant="primary" size="sm" className="rounded-xl px-4 normal-case" onClick={() => setShowGoalsModal(true)}>
            Змінити
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <p className="font-mono text-[10px] font-black uppercase text-gray-400">Вага зараз</p>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black italic">{user.currentWeight}</span>
              <span className="text-xl font-black italic text-gray-300">кг</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-mono text-[10px] font-black uppercase text-gray-400">Цільова вага</p>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black italic">{user.targetWeight}</span>
              <span className="text-xl font-black italic text-gray-300">кг</span>
            </div>
          </div>
        </div>
      </Card>

      {/* About App */}
      <Card className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-100 text-blue-500 rounded-full">
             <Info size={24} />
          </div>
          <h3 className="text-3xl font-black italic uppercase italic leading-none">Про Power App</h3>
        </div>
        <p className="text-gray-500 font-medium text-sm leading-relaxed mb-6">
          <strong className="text-brand-black">Power App</strong> – інтелектуальна система, яка допомагає тобі ставати сильнішим кожен день.
        </p>
        <div className="space-y-3 pt-6 border-t border-brand-border">
          <div className="flex justify-between font-mono text-[10px] uppercase font-bold">
            <span className="text-gray-400">Версія</span>
            <span>1.1.0 (Local)</span>
          </div>
          <div className="flex justify-between font-mono text-[10px] uppercase font-bold">
            <span className="text-gray-400">Збереження даних</span>
            <span className="text-blue-600 font-black">Локальне (Offline)</span>
          </div>
        </div>
      </Card>

      {/* Logout */}
      <Button variant="black" fullWidth className="py-6 rounded-3xl" onClick={onLogout}>
        <div className="flex items-center gap-3">
           <LogOut size={20} />
           <span>Вийти</span>
        </div>
      </Button>

      {/* Goals Modal */}
      <AnimatePresence>
        {showGoalsModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brand-black/80 backdrop-blur-sm"
              onClick={() => setShowGoalsModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[3rem] p-8 border-4 border-brand-black brutal-shadow"
            >
              <button 
                className="absolute top-6 right-6 p-2 bg-brand-offwhite rounded-full brutal-border"
                onClick={() => setShowGoalsModal(false)}
              >
                <X size={20} />
              </button>

              <h3 className="text-4xl font-black italic uppercase italic mb-10 leading-none">Мої Цілі</h3>
              
              <div className="space-y-8">
               <div className="space-y-4">
                  <label className="flex items-center gap-2 font-mono text-[10px] font-black uppercase text-gray-400 px-2">
                    <UserIcon size={14} /> Поточна вага (кг)
                  </label>
                  <input 
                    type="number" 
                    value={tempWeight}
                    onChange={(e) => setTempWeight(Number(e.target.value))}
                    className="w-full p-6 text-3xl font-black brutal-border rounded-3xl bg-brand-offwhite focus:outline-none focus:ring-4 focus:ring-brand-primary"
                  />
               </div>
               
               <div className="space-y-4">
                  <label className="flex items-center gap-2 font-mono text-[10px] font-black uppercase text-gray-400 px-2">
                     <Target size={14} /> Цільова вага (кг)
                  </label>
                  <input 
                    type="number" 
                    value={tempTarget}
                    onChange={(e) => setTempTarget(Number(e.target.value))}
                    className="w-full p-6 text-3xl font-black brutal-border rounded-3xl bg-brand-offwhite focus:outline-none focus:ring-4 focus:ring-brand-primary"
                  />
               </div>

               <Button fullWidth onClick={handleSaveGoals} size="lg" className="rounded-3xl mt-4">
                  Зберегти
               </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

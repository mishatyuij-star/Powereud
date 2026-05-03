/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Dumbbell, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: (name: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Moving Gradient Background */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: [-20, 20, -20],
          y: [-20, 20, -20],
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "linear" 
        }}
        className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 20% 30%, #22c55e 0%, transparent 50%), radial-gradient(circle at 80% 70%, #4ade80 0%, transparent 50%)',
          filter: 'blur(80px)'
        }}
      />
      
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          x: [20, -20, 20],
          y: [20, -20, 20],
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity,
          ease: "linear" 
        }}
        className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 70% 20%, #86efac 0%, transparent 40%), radial-gradient(circle at 30% 80%, #16a34a 0%, transparent 40%)',
          filter: 'blur(100px)'
        }}
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/80 backdrop-blur-2xl border border-gray-100 rounded-[2rem] p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
          <div className="flex flex-col items-center text-center mb-10">
            <motion.div 
              whileHover={{ rotate: 15 }}
              className="w-20 h-20 bg-green-500 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-green-500/30"
            >
              <Dumbbell className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">POWER APP</h1>
            <p className="text-gray-500 font-medium">Твій особистий тренер у кишені</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label htmlFor="name" className="text-sm font-semibold text-gray-700 ml-1">
                Як тебе звати?
              </label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Введіть ваше ім'я"
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl py-5 pl-14 pr-6 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-colors shadow-lg shadow-green-500/25"
            >
              <span className="text-gray-900">Почати тренування</span>
              <ArrowRight className="w-6 h-6 text-gray-900" />
            </motion.button>
          </form>

          <div className="mt-10 text-center text-xs text-gray-400 font-medium">
            Входячи, ви погоджуєтесь з умовами використання
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { User } from 'lucide-react';

interface LoginProps {
  onLogin: (name: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-shimmer animate-gradient flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 blur-[120px] rounded-full" />

      <Card className="w-full max-w-md text-center py-12 relative bg-white/80 backdrop-blur-xl border-white/50">
        <div className="absolute -top-4 -right-4 bg-brand-black text-brand-primary font-mono text-[10px] font-black px-3 py-1 rounded-lg brutal-shadow-sm animate-bounce">
          FREE
        </div>

        <div className="w-20 h-20 bg-brand-primary border-4 border-brand-black brutal-shadow rounded-full flex items-center justify-center mx-auto mb-8 animate-appearance-in">
          <User size={40} strokeWidth={2.5} />
        </div>
        
        <h1 className="font-mono text-5xl font-black italic uppercase tracking-tighter mb-2 animate-appearance-in">
          Power
        </h1>
        <p className="text-brand-black font-black uppercase text-[10px] tracking-widest mb-6 opacity-60">
          Ставай сильнішим безкоштовно
        </p>
        
        <p className="text-gray-500 mb-8 font-medium">Твій персональний фітнес-хаб</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-left space-y-2">
            <label className="font-mono text-xs font-bold uppercase ml-2">Як тебе звати?</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введи свій нікнейм..."
              className="w-full p-4 brutal-border bg-white font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary placeholder:text-gray-300"
              required
            />
          </div>
          <Button type="submit" fullWidth size="lg">
            Увійти в хаб
          </Button>
        </form>
        
        <p className="mt-8 text-[10px] text-gray-400 font-mono uppercase">
          Всі дані зберігаються локально на твоєму пристрої
        </p>
      </Card>
    </div>
  );
};

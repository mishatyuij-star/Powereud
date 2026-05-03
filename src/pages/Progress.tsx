/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Dumbbell } from 'lucide-react';
import { WeightEntry } from '../types';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface ProgressProps {
  weightHistory: WeightEntry[];
}

export const Progress: React.FC<ProgressProps> = ({ weightHistory }) => {
  const chartData = weightHistory.map(entry => ({
    date: new Date(entry.date).toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit' }),
    weight: entry.weight
  }));

  return (
    <div className="space-y-8">
      {weightHistory.length === 0 && (
        <Card className="bg-brand-primary border-none flex flex-col items-center justify-center py-12 text-center shadow-none mb-10 rounded-[4rem]">
          <div className="w-24 h-24 bg-brand-primary rounded-full flex items-center justify-center mb-8 border-[6px] border-white/30 p-4">
            <Dumbbell size={48} className="text-brand-black" />
          </div>
          <h3 className="text-4xl font-black italic uppercase italic tracking-tighter mb-4 leading-none">Ще немає прогресу</h3>
          <p className="text-brand-black font-bold max-w-[240px] mb-12 text-sm uppercase font-mono">
            Зроби перші вправи, щоб з'явився прогрес
          </p>
          <Button variant="black" className="rounded-2xl px-12 italic tracking-tighter text-brand-primary">
            Почати тренування
          </Button>
        </Card>
      )}

      {weightHistory.length > 0 && (
        <Card className="p-4">
          <h3 className="text-2xl font-black italic uppercase mb-6 flex items-center gap-2">
            Аналітика ваги
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 'bold' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 'bold' }}
                  domain={['auto', 'auto']}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: '2px solid #1A1A1A',
                    boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                    fontFamily: 'monospace'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#1A1A1A" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#CCFF00', stroke: '#1A1A1A', strokeWidth: 2 }}
                  activeDot={{ r: 8, fill: '#CCFF00', stroke: '#1A1A1A', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}
    </div>
  );
};

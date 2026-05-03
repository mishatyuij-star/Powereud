/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, Dumbbell, Calendar, BarChart2, User as UserIcon, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { ReportModal } from './ReportModal';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  userName: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, userName }) => {
  const [isReportModalOpen, setIsReportModalOpen] = React.useState(false);

  const tabs = [
    { id: 'home', label: 'Головна', icon: Home },
    { id: 'sport', label: 'Спорт', icon: Dumbbell },
    { id: 'plans', label: 'Плани', icon: Calendar },
    { id: 'progress', label: 'Прогрес', icon: BarChart2 },
    { id: 'profile', label: 'Профіль', icon: UserIcon },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg pb-24">
      {/* Header */}
      <header className="p-4 flex justify-between items-center bg-white/60 backdrop-blur-xl sticky top-0 z-40 border-b border-white/20 glass-card">
        <button 
          onClick={() => setIsReportModalOpen(true)}
          className="flex flex-col items-center gap-1 group active:scale-95 transition-all"
        >
          <div className="brutal-border p-1.5 bg-white brutal-shadow-sm group-hover:bg-red-50 transition-colors">
            <AlertTriangle size={14} className="text-red-500" strokeWidth={3} />
          </div>
          <span className="font-mono text-[8px] font-black uppercase text-red-500 group-hover:text-red-600 transition-colors">Повідомити</span>
        </button>
        <div className="font-mono italic font-black text-2xl tracking-tighter uppercase drop-shadow-sm">Power</div>
        <div className="flex gap-2">
          <button 
            onClick={() => onTabChange('profile')}
            className="p-2 brutal-border bg-white rounded-full brutal-shadow-sm active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all hover:bg-brand-offwhite"
          >
            <span className="sr-only">Settings</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </button>
          <a 
            href="https://t.me/blogkurtta" 
            target="_blank" 
            referrerPolicy="no-referrer"
            className="flex items-center gap-2 pr-3 pl-2 py-1 bg-[#24A1DE] text-white brutal-border brutal-shadow-sm text-[10px] font-black uppercase active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all rounded-full"
          >
             <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.318.02.463l-.447 2.102c-.273 1.285-.548 2.57-.821 3.855-.077.381-.177.763-.271 1.123-.059.223-.124.417-.32.535l-.234.127c-.201.077-.417.06-.59-.05l-1.921-1.22c-.221-.14-.383-.341-.592-.511-.015-.011-.03-.021-.045-.032l-1.018-.763c-.11-.082-.201-.168-.261-.264-.061-.096-.061-.242-.061-.242s.013-.153.111-.265c.105-.121.265-.246.438-.372.338-.246.721-.522 1.137-.822l2.361-1.748c.113-.082.203-.153.253-.223.05-.07.063-.123.036-.145-.027-.023-.11-.007-.221.045-.111.052-.266.15-.461.272L11.53 10.37c-.332.227-.665.454-1.002.678l-.13.086c-.52.34-.69.453-1.07.453-.13 0-.25-.015-.36-.046l-1.631-.504c-.338-.105-.675-.21-.675-.21s-.295-.122-.315-.443c-.02-.321.326-.497.326-.497l6.815-2.616c.321-.122.642-.243.963-.365.341-.123.684-.246 1.026-.35z"/></svg>
             </div>
             <span>ТГ</span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 max-w-xl mx-auto w-full space-y-12">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>

      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-brand-border p-2 z-50">
        <div className="flex justify-around items-center max-w-xl mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                  isActive ? 'bg-brand-primary/20' : 'text-gray-400'
                }`}
              >
                <div className={`p-2 rounded-xl border-2 transition-all relative ${
                  isActive ? 'border-brand-black bg-brand-primary brutal-shadow-sm scale-110' : 'border-transparent'
                }`}>
                  {tab.id === 'plans' ? (
                    <div className="relative">
                      <Calendar size={20} color={isActive ? '#1A1A1A' : undefined} />
                      <span className={`absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] font-black italic ${isActive ? 'text-brand-black' : 'text-gray-400'}`}>
                        {new Date().getDate()}
                      </span>
                    </div>
                  ) : (
                    <Icon size={20} color={isActive ? '#1A1A1A' : undefined} />
                  )}
                </div>
                <span className={`text-[10px] font-bold uppercase ${isActive ? 'text-brand-black' : ''}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <ReportModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
        userName={userName}
      />
    </div>
  );
};

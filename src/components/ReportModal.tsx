/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/Button';
import { X, Send, Image as ImageIcon } from 'lucide-react';
import { sendToTelegram } from '../lib/telegram';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, userName }) => {
  const [name, setName] = useState(userName);
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const message = `🚨 <b>НОВИЙ РЕПОРТ</b>\n\n👤 Ім'я: ${name}\n📝 Опис: ${description}`;
    const success = await sendToTelegram(message, photo);
    
    setLoading(false);
    if (success) {
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setDescription('');
        setPhoto(null);
        setPhotoPreview(null);
        onClose();
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2rem] p-8 brutal-border brutal-shadow"
          >
            <button 
              className="absolute top-4 right-4 p-2 bg-brand-offwhite rounded-full brutal-border hover:bg-brand-primary"
              onClick={onClose}
            >
              <X size={20} />
            </button>

            <h3 className="text-3xl font-black italic uppercase italic mb-2 tracking-tighter">Повідомити</h3>
            <p className="text-gray-400 font-mono text-[10px] uppercase font-bold mb-6">Опишіть проблему або пропозицію</p>
            
            {sent ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto brutal-border">
                  <Send size={24} />
                </div>
                <p className="font-bold uppercase italic">Відправлено! Дякуємо.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase font-black text-gray-400 px-1">Ваше ім'я</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full p-3 font-bold brutal-border rounded-xl bg-brand-offwhite focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase font-black text-gray-400 px-1">Опис проблеми</label>
                    <textarea 
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Що саме працює не так?"
                      className="w-full p-4 font-bold brutal-border rounded-xl bg-brand-offwhite focus:outline-none min-h-[120px]"
                    />
                  </div>
                  <div className="space-y-4">
                    {photoPreview && (
                      <div className="relative w-full h-40 brutal-border rounded-xl overflow-hidden bg-brand-offwhite">
                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={removePhoto}
                          className="absolute top-2 right-2 p-1 bg-white brutal-border rounded-lg shadow-sm hover:bg-red-50 text-red-500"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                    <label className="p-3 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center gap-2 text-gray-400 hover:border-brand-primary hover:text-brand-primary cursor-pointer transition-colors group">
                      <ImageIcon size={18} />
                      <span className="text-[10px] font-black uppercase">{photo ? 'Змінити фото' : 'Додати фото (необов\'язково)'}</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
                    </label>
                  </div>
                </div>

                <Button fullWidth disabled={loading} type="submit" variant="black" className="rounded-2xl">
                  {loading ? 'Надсилаємо...' : 'Надіслати'}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

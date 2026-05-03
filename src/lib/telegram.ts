/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const BOT_TOKEN = '7734759946:AAGoaWOkshWK-0yQZBVk7MQGSHKJ-G0K3BY';
const CHAT_ID = '7385607556';

export const sendToTelegram = async (message: string, photo?: File | null) => {
  const method = photo ? 'sendPhoto' : 'sendMessage';
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/${method}`;
  
  try {
    let response;
    
    if (photo) {
      const formData = new FormData();
      formData.append('chat_id', CHAT_ID);
      formData.append('photo', photo);
      formData.append('caption', message);
      formData.append('parse_mode', 'HTML');
      
      response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
    } else {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      });
    }
    
    return response.ok;
  } catch (error) {
    console.error('Telegram send error:', error);
    return false;
  }
};

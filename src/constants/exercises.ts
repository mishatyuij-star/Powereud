/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WorkoutProgram, Exercise } from '../types';

const STRETCH_POOL: Exercise[] = [
  { id: 's1', name: 'Нахили вперед', duration: 45, sets: 1, description: 'Стоячи, повільно нахиляйтеся до підлоги, тримаючи ноги прямими.' },
  { id: 's2', name: 'Поза дитини', duration: 60, sets: 1, description: 'Сядьте на п\'яти, опустіть лоб на підлогу і витягніть руки вперед.' },
  { id: 's3', name: 'Кішка-корова', duration: 45, sets: 1, description: 'Станьте на карачки, вигинайте спину вгору і прогинайтеся вниз.' },
  { id: 's4', name: 'Розтяжка квадрицепса', duration: 30, sets: 2, description: 'Стоячи на одній нозі, візьміть іншу за щиколотку і підтягніть до сідниці.' },
  { id: 's5', name: 'Метелик', duration: 60, sets: 1, description: 'Сядьте на підлогу, з\'єднайте стопи, тисніть колінами до підлоги.' },
  { id: 's6', name: 'Розтяжка плечей', duration: 45, sets: 2, description: 'Заведіть одну руку за голову, іншою тисніть на лікоть.' },
  { id: 's7', name: 'Поза кобри', duration: 45, sets: 1, description: 'Лежачи на животі, підніміть грудну клітку, спираючись на руки.' },
  { id: 's8', name: 'Випади на коліні', duration: 45, sets: 2, description: 'Зробіть випад вперед, опустіть заднє коліно на підлогу.' },
  { id: 's9', name: 'Глибоке присідання', duration: 30, sets: 1, description: 'Присядьте максимально глибоко, тримаючи спину рівно.' },
  { id: 's10', name: 'Скручування сидячи', duration: 45, sets: 2, description: 'Сядьте, перехрестіть ногу через іншу і оберніть тулуб.' },
  { id: 's11', name: 'Розтяжка грудних м\'язів', duration: 45, sets: 1, description: 'Станьте в дверному отворі, упріться руками і подайтеся вперед.' },
  { id: 's12', name: 'Витягування в сторони', duration: 30, sets: 2, description: 'Стоячи, підніміть руки і нахиляйтеся вліво та вправо.' },
  { id: 's13', name: 'Розтяжка шиї', duration: 20, sets: 2, description: 'Повільно нахиляйте голову в сторони до відчуття натягу.' },
  { id: 's14', name: 'Поза голуба', duration: 60, sets: 2, description: 'Одно нога зігнута перед собою, інша витягнута назад.' },
  { id: 's15', name: 'Розтяжка підколінних', duration: 45, sets: 2, description: 'Сидячи, одну ногу випрямте, іншу зігніть і тягніться до носка.' },
  { id: 's16', name: 'Розтяжка трицепса', duration: 30, sets: 2, description: 'Заведіть руку за спину зверху, іншою тисніть на лікоть вниз.' },
  { id: 's17', name: 'Нахили до стіни', duration: 45, sets: 1, description: 'Упріться руками в стіну, прогніться в спині, витягуючи хребет.' },
  { id: 's18', name: 'Розтяжка литкових м\'язів', duration: 40, sets: 2, description: 'Упріться руками в стіну, одну ногу відведіть назад, тисніть п\'ятою.' },
  { id: 's19', name: 'Динамічне коло руками', duration: 30, sets: 2, description: 'Робіть широкі колові рухи руками вперед і назад.' },
  { id: 's20', name: 'Розслаблення спини', duration: 60, sets: 1, description: 'Лежачи на спині, підтягніть коліна до грудей і похитайтеся.' },
];

const MASS_POOL: Exercise[] = [
  { id: 'm1', name: 'Присідання', sets: 3, reps: '10-12', duration: 90, description: 'Тримайте спину прямо, опускайтеся до паралелі з підлогою.' },
  { id: 'm2', name: 'Віджимання', sets: 3, reps: '12-15', duration: 60, description: 'Тіло в одну лінію, лікті під кутом 45 градусів.' },
  { id: 'm3', name: 'Випади', sets: 3, reps: '10 на ногу', duration: 90, description: 'Робіть широкий крок вперед, заднє коліно не торкається підлоги.' },
  { id: 'm4', name: 'Планка', sets: 3, duration: 60, description: 'Тримайте прес напруженим, не прогинайтеся в попереку.' },
  { id: 'm5', name: 'Зворотні віджимання', sets: 3, reps: '12', duration: 60, description: 'Виконуйте від лави або стільця для трицепса.' },
  { id: 'm6', name: 'Скручування на прес', sets: 3, reps: '20', duration: 45, description: 'Повільно піднімайте лопатки, не тягніть шию руками.' },
  { id: 'm7', name: 'Супермен', sets: 3, reps: '15', duration: 45, description: 'Лежачи на животі, одночасно підніміть руки і ноги.' },
  { id: 'm8', name: 'Гіперекстензія на підлозі', sets: 3, reps: '15', duration: 45, description: 'Піднімайте тільки тулуб, дивіться в підлогу.' },
  { id: 'm9', name: 'Підйом на носки', sets: 3, reps: '20', duration: 30, description: 'Максимально високо піднімайтеся на носках.' },
  { id: 'm10', name: 'Берпі', sets: 3, reps: '10', duration: 90, description: 'Комбінація присідання, віджимання та стрибка.' },
  { id: 'm11', name: 'Махи руками', sets: 3, duration: 45, description: 'Швидкі колові рухи руками для плечового поясу.' },
  { id: 'm12', name: 'Бокова планка', sets: 2, duration: 45, description: 'Тримайте рівну лінію тіла на одному передпліччі.' },
  { id: 'm13', name: 'Альпініст', sets: 3, duration: 60, description: 'В упорі лежачи імітуйте швидкий біг колінами до грудей.' },
  { id: 'm14', name: 'Стрибки зі зміною ніг', sets: 3, reps: '16', duration: 60, description: 'Швидко міняйте ноги в стрибку в положенні випаду.' },
  { id: 'm15', name: 'Утримання ніг лежачи', sets: 3, duration: 30, description: 'Лежачи на спині, тримайте прямі ноги під кутом 15 градусів.' },
  { id: 'm16', name: 'Широкі віджимання', sets: 3, reps: '10', duration: 60, description: 'Руки ширше плечей для акценту на грудні м\'язи.' },
  { id: 'm17', name: 'Діамантові віджимання', sets: 3, reps: '8', duration: 60, description: 'Зведіть вказівні та великі пальці разом під грудьми.' },
  { id: 'm18', name: 'Планка з підняттям ноги', sets: 3, duration: 45, description: 'В планці по черзі піднімайте прямі ноги вгору.' },
  { id: 'm19', name: 'Присідання "Сумо"', sets: 3, reps: '15', duration: 60, description: 'Широка постановка ніг, носки розвернуті назовні.' },
  { id: 'm20', name: 'Статичне утримання в присіді', sets: 3, duration: 40, description: 'Завмріть у нижній точці присідання.' },
];

const CUT_POOL: Exercise[] = [
  { id: 'c1', name: 'Біг на місці', duration: 60, sets: 1, description: 'Максимально високо піднімайте коліна.' },
  { id: 'c2', name: 'Стрибки Jumping Jacks', duration: 45, sets: 2, description: 'Стрибайте, розставляючи ноги і піднімаючи руки.' },
  { id: 'c3', name: 'Бокс з тінню', duration: 60, sets: 2, description: 'Інтенсивно наносьте удари в повітря.' },
  { id: 'c4', name: 'Біг в упорі лежачи', duration: 45, sets: 3, description: 'Швидко підтягуйте коліна до грудей.' },
  { id: 'c5', name: 'Берпі спрощені', duration: 60, sets: 2, description: 'Без віджимання, тільки стрибок і планка.' },
  { id: 'c6', name: 'Стрибки через скакалку', duration: 120, sets: 1, description: 'Навіть без скакалки імітуйте рухи.' },
  { id: 'c7', name: 'Присідання зі стрибком', duration: 45, sets: 3, description: 'Робіть вибуховий стрибок вгору з присіду.' },
  { id: 'c8', name: 'Швидкі кроки в сторони', duration: 60, sets: 2, description: 'Переміщуйтесь вліво-вправо на напівзігнутих ногах.' },
  { id: 'c9', name: 'Велосипед лежачи', duration: 60, sets: 2, description: 'Торкайтеся ліктем протилежного коліна.' },
  { id: 'c10', name: 'Планка з дотиком до плечей', duration: 45, sets: 3, description: 'В плані чергуйте торкання рукою плеча.' },
  { id: 'c11', name: 'Нахили до стоп в стрибку', duration: 45, sets: 2, description: 'Стрибок з широкою постановкою ніг і торкання підлоги.' },
  { id: 'c12', name: 'Підйом колін до долонь', duration: 45, sets: 2, description: 'Тримайте руки на рівні талії, бийте колінами по них.' },
  { id: 'c13', name: 'Випади в сторони', duration: 60, sets: 2, description: 'Робіть кроки в сторони, присідаючи на одну ногу.' },
  { id: 'c14', name: 'Кроки ковзаняра', duration: 60, sets: 2, description: 'Імітуйте рухи ковзаняра зі стрибками в боки.' },
  { id: 'c15', name: 'Човник на прес', duration: 45, sets: 2, description: 'Лежачи на спині, підніміть корпус і ноги, утримуйте баланс.' },
  { id: 'c16', name: 'Вертикальні ножиці', duration: 45, sets: 2, description: 'Лежачи на спині, робіть махи прямими ногами вгору-вниз.' },
  { id: 'c17', name: 'Бічна планка динамічна', duration: 45, sets: 2, description: 'Опускайте і піднімайте таз у боковій планці.' },
  { id: 'c18', name: 'Млин', duration: 60, sets: 1, description: 'Нахили тулуба з торканням правою рукою лівої стопи і навпаки.' },
  { id: 'c19', name: 'Стрибки зі скакалкою (інтенсив)', duration: 60, sets: 3, description: 'Максимальна швидкість обертання.' },
  { id: 'c20', name: 'Почергове опускання ніг', duration: 45, sets: 2, description: 'Задійте нижній прес, контролюйте поперек.' },
];

export const WORKOUT_PROGRAMS: WorkoutProgram[] = [
  {
    id: 'stretch',
    title: 'Розтяжка',
    subtitle: 'гнучкість та відновлення',
    days: ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'].map((day, dIdx) => ({
      day,
      exercises: STRETCH_POOL.slice(0, 10).map((ex, eIdx) => ({
        ...ex,
        id: `stretch-${dIdx}-${eIdx}`,
      }))
    }))
  },
  {
    id: 'mass',
    title: 'Набір маси',
    subtitle: 'сила та об\'єм',
    days: ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'].map((day, dIdx) => ({
      day,
      exercises: MASS_POOL.slice(0, 12).map((ex, eIdx) => ({
        ...ex,
        id: `mass-${dIdx}-${eIdx}`,
      }))
    }))
  },
  {
    id: 'cut',
    title: 'Схуднення',
    subtitle: 'кардіо та рельєф',
    days: ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'].map((day, dIdx) => ({
      day,
      exercises: CUT_POOL.slice(0, 10).map((ex, eIdx) => ({
        ...ex,
        id: `cut-${dIdx}-${eIdx}`,
      }))
    }))
  }
];

export const getPoolByCategory = (categoryId: string): Exercise[] => {
  switch (categoryId) {
    case 'stretch': return STRETCH_POOL;
    case 'mass': return MASS_POOL;
    case 'cut': return CUT_POOL;
    default: return [];
  }
};

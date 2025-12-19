
import { MathTask, Level } from '../types';
import { PROBLEMS_DATABASE } from './problems';

export const generateMathDatabase = (): MathTask[] => {
  const bank: MathTask[] = [];
  const levels: Level[] = ['CE1', 'CE2', 'CM1', 'CM2'];

  // 1. Multiplications (100 exemples)
  for (let i = 0; i < 100; i++) {
    const a = (i % 10) + 1;
    const b = Math.floor(i / 10) + 1;
    bank.push({
      id: bank.length,
      type: 'multiplication',
      question: `${a} x ${b}`,
      correctAnswer: a * b,
      level: levels[i % 4]
    });
  }

  // 2. Additions (100 exemples)
  for (let i = 0; i < 100; i++) {
    const max = i < 50 ? 10 : 20;
    const a = (i % max) + 1;
    const b = Math.floor(Math.random() * max) + 1;
    bank.push({
      id: bank.length,
      type: 'addition',
      question: `${a} + ${b}`,
      correctAnswer: a + b,
      level: levels[i % 4]
    });
  }

  // 3. Classement (100 exemples)
  for (let i = 0; i < 100; i++) {
    const nums = [Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100)];
    const sorted = [...nums].sort((a,b) => a-b);
    bank.push({
      id: bank.length,
      type: 'ordering',
      question: "Range du plus petit au plus grand",
      options: nums,
      correctAnswer: sorted.join(','),
      level: levels[i % 4]
    });
  }

  // 4. Suites logiques (100 exemples)
  for (let i = 0; i < 100; i++) {
    const step = (i % 5) + 1;
    const start = i;
    const seq = [start, start + step, start + 2 * step];
    bank.push({
      id: bank.length,
      type: 'logic',
      question: `${seq[0]}, ${seq[1]}, ${seq[2]}, ...`,
      correctAnswer: start + 3 * step,
      level: levels[i % 4]
    });
  }

  // 5. Décomposition (100 exemples adaptés aux niveaux)
  for (let i = 0; i < 100; i++) {
    const lvl = levels[i % 4];
    let num = 0;
    if (lvl === 'CE1') num = Math.floor(Math.random() * 90) + 10;
    else if (lvl === 'CE2') num = Math.floor(Math.random() * 900) + 100;
    else num = Math.floor(Math.random() * 9000) + 1000;

    const u = num % 10;
    const d = Math.floor((num / 10) % 10);
    const c = Math.floor((num / 100) % 10);
    const m = Math.floor(num / 1000);

    bank.push({
      id: bank.length,
      type: 'decomposition',
      question: `${num}`,
      correctAnswer: `${m},${c},${d},${u}`,
      level: lvl
    });
  }

  // 6. Ajout des problèmes manuels
  bank.push(...PROBLEMS_DATABASE);

  return bank;
};

export const MATH_DATABASE = generateMathDatabase();

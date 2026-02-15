
import { Exam } from './types.ts';

export const MOCK_EXAMS: Exam[] = [
  { id: '1', name: 'General Paper', code: 'GP-01', date: '2024-01-01' }
];

export const STORAGE_KEYS = {
  PHOTOS: 'paperslol_vault_v1',
  AUTH: 'paperslol_session_v1'
};

import '@testing-library/jest-dom';
import { vi } from 'vitest';

// mock ساده برای fetch تا تست‌ها خطا ندن
global.fetch = vi.fn();

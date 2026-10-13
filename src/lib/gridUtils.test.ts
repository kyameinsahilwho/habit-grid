import { describe, it, expect } from 'vitest';
import {
  parseLocalDate,
  formatDateStr,
  calculateDaysBetween,
  getGridDates,
  getTimeframeSubtitleText,
} from './gridUtils';

describe('gridUtils date helpers', () => {
  it('parseLocalDate parses YYYY-MM-DD correctly in local time', () => {
    const d = parseLocalDate('2025-05-15');
    expect(d.getFullYear()).toBe(2025);
    expect(d.getMonth()).toBe(4); // 0-indexed month May
    expect(d.getDate()).toBe(15);
  });

  it('formatDateStr formats local date to YYYY-MM-DD', () => {
    const d = new Date(2025, 4, 15);
    expect(formatDateStr(d)).toBe('2025-05-15');
  });

  it('calculateDaysBetween calculates total inclusive days', () => {
    const days = calculateDaysBetween('2025-05-01', '2025-05-10');
    expect(days).toBe(10);
  });

  it('getGridDates calculates correct dates with count mode', () => {
    const config = {
      periodMode: 'days',
      startDaysDate: '2025-06-01',
      daysCount: 10,
      daysCalculationMode: 'count',
    };
    const dates = getGridDates(config);
    expect(dates.length).toBe(10);
    expect(dates[0].dateString).toBe('2025-06-01');
    expect(dates[9].dateString).toBe('2025-06-10');
  });

  it('getGridDates calculates correct dates with endDate mode', () => {
    const config = {
      periodMode: 'days',
      startDaysDate: '2025-06-01',
      endDaysDate: '2025-06-15',
      daysCalculationMode: 'endDate',
    };
    const dates = getGridDates(config);
    expect(dates.length).toBe(15);
    expect(dates[0].dateString).toBe('2025-06-01');
    expect(dates[14].dateString).toBe('2025-06-15');
  });

  it('getTimeframeSubtitleText returns proper date range formatted string', () => {
    const config = {
      periodMode: 'days',
      startDaysDate: '2025-06-01',
      endDaysDate: '2025-06-15',
      daysCalculationMode: 'endDate',
    };
    const subtitle = getTimeframeSubtitleText(config);
    expect(subtitle).toContain('Jun 1, 2025');
    expect(subtitle).toContain('Jun 15, 2025');
  });
});

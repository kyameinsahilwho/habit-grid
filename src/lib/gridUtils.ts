export const WEEKDAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const themeColorPresets: Record<string, { bg: string; text: string }> = {
  'sand-navy': { bg: '#dfbca0', text: '#0f2d59' },
  'violet': { bg: '#ffffff', text: '#6366f1' },
  'emerald': { bg: '#ffffff', text: '#10b981' },
  'sunset': { bg: '#ffffff', text: '#f97316' },
  'ocean': { bg: '#ffffff', text: '#0ea5e9' },
  'lavender': { bg: '#ffffff', text: '#a855f7' },
  'monochrome': { bg: '#ffffff', text: '#27272a' }
};

export interface GridDate {
  dateString: string;
  dayNumber: number;
  absoluteIndex: number;
  weekdayLabel: string;
  isWeekend: boolean;
  weekGroup?: number;
}

export function getGridDates(config: any): GridDate[] {
  const dates: GridDate[] = [];

  if (config.periodMode === 'month') {
    const daysInMonth = new Date(config.year, config.month + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(config.year, config.month, d);
      dates.push({
        dateString: `${config.year}-${String(config.month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
        dayNumber: d,
        absoluteIndex: d,
        weekdayLabel: WEEKDAY_NAMES[date.getDay()],
        isWeekend: date.getDay() === 0 || date.getDay() === 6
      });
    }
  } else if (config.periodMode === 'weeks') {
    const startDate = new Date(config.startWeekDate);
    const day = startDate.getDay();
    const diff = startDate.getDate() - day + (day === 0 ? -6 : 1);
    const startMonday = new Date(startDate.setDate(diff));

    const totalDays = config.weeksCount * 7;
    for (let d = 0; d < totalDays; d++) {
      const date = new Date(startMonday);
      date.setDate(startMonday.getDate() + d);

      const weekNumber = Math.floor(d / 7) + 1;
      dates.push({
        dateString: date.toISOString().split('T')[0],
        dayNumber: date.getDate(),
        absoluteIndex: d + 1,
        weekdayLabel: WEEKDAY_NAMES[date.getDay()],
        isWeekend: date.getDay() === 0 || date.getDay() === 6,
        weekGroup: weekNumber
      });
    }
  } else if (config.periodMode === 'days') {
    const start = new Date(config.startDaysDate);
    const totalDays = parseInt(config.daysCount) || 30;
    for (let d = 0; d < totalDays; d++) {
      const date = new Date(start);
      date.setDate(start.getDate() + d);
      dates.push({
        dateString: date.toISOString().split('T')[0],
        dayNumber: date.getDate(),
        absoluteIndex: d + 1,
        weekdayLabel: WEEKDAY_NAMES[date.getDay()],
        isWeekend: date.getDay() === 0 || date.getDay() === 6
      });
    }
  } else if (config.periodMode === 'range') {
    const start = new Date(config.startRangeDate);
    const end = new Date(config.endRangeDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    let totalDays = 1;
    if (end >= start) {
      totalDays = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    }
    totalDays = Math.min(150, Math.max(1, totalDays));

    for (let d = 0; d < totalDays; d++) {
      const date = new Date(start);
      date.setDate(start.getDate() + d);
      dates.push({
        dateString: date.toISOString().split('T')[0],
        dayNumber: date.getDate(),
        absoluteIndex: d + 1,
        weekdayLabel: WEEKDAY_NAMES[date.getDay()],
        isWeekend: date.getDay() === 0 || date.getDay() === 6
      });
    }
  }
  return dates;
}

export function getTimeframeSubtitleText(config: any): string {
  if (config.periodMode === 'month') {
    return `${MONTH_NAMES[config.month]} ${config.year}`;
  } else if (config.periodMode === 'weeks') {
    const start = new Date(config.startWeekDate);
    const end = new Date(start);
    end.setDate(start.getDate() + (config.weeksCount * 7) - 1);
    const formatOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return `${start.toLocaleDateString('en-US', formatOptions)} - ${end.toLocaleDateString('en-US', formatOptions)}`;
  } else if (config.periodMode === 'days') {
    if ((config.gridTitle || '').toLowerCase().includes('75') && parseInt(config.daysCount) === 75) {
      return 'Challenge Tracker';
    } else {
      const start = new Date(config.startDaysDate);
      const end = new Date(start);
      end.setDate(start.getDate() + parseInt(config.daysCount) - 1);
      const formatOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
      return `${start.toLocaleDateString('en-US', formatOptions)} - ${end.toLocaleDateString('en-US', formatOptions)}`;
    }
  } else if (config.periodMode === 'range') {
    const start = new Date(config.startRangeDate);
    const end = new Date(config.endRangeDate);
    const formatOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    if (end >= start) {
      return `${start.toLocaleDateString('en-US', formatOptions)} - ${end.toLocaleDateString('en-US', formatOptions)}`;
    } else {
      return `${start.toLocaleDateString('en-US', formatOptions)}`;
    }
  }
  return '';
}

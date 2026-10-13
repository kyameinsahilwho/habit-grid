import { useState, useEffect, useRef } from 'react';
import { Link } from '@tanstack/react-router';
import { Sidebar } from './Sidebar';
import { PreviewCanvas } from './PreviewCanvas';
import { templates } from '../lib/templates';
import { LucideIcon } from './LucideIcon';
import { SiteLogoIcon } from './SiteLogoIcon';
import { getGridDates } from '../lib/gridUtils';

const STATE_LOCAL_STORAGE_KEY = 'habit_tracker_designer_state_v8';

interface Habit {
  id: string;
  name: string;
  icon: string;
}

interface HabitDesignerProps {
  templateSlug?: string;
}

export function HabitDesigner({ templateSlug }: HabitDesignerProps) {
  const today = new Date();
  const nextMonthDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const nextMonthYear = nextMonthDate.getFullYear();
  const nextMonthMonthVal = nextMonthDate.getMonth();

  const formatDateStr = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const defaultStartDate = formatDateStr(nextMonthDate);
  const defaultEndRangeDate = formatDateStr(
    new Date(nextMonthDate.getFullYear(), nextMonthDate.getMonth() + 1, nextMonthDate.getDate())
  );
  const defaultEndDaysDate = formatDateStr(
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30)
  );

  const defaultConfig = {
    periodMode: 'days',
    month: nextMonthMonthVal,
    year: nextMonthYear,
    startWeekDate: defaultStartDate,
    weeksCount: 4,
    startDaysDate: defaultStartDate,
    daysCount: 75,
    daysCalculationMode: 'count',
    endDaysDate: defaultEndDaysDate,
    includeToday: false,
    startRangeDate: defaultStartDate,
    endRangeDate: defaultEndRangeDate,
    gridTitle: 'Personal Habit Tracker',
    titleFont: 'outfit',
    cellShape: 'rounded',
    columnsPerRow: 25,
    themePreset: 'monochrome',
    pdfBgColor: '#dfbca0',
    pdfTextColor: '#0f2d59',
    showStartDateBox: true,
    showWeekdays: true,
    showDayNumbers: true,
    showNotesSection: true,
    showStatusLegend: false,
    pageSize: 'a4',
    pageOrientation: 'portrait',
  };

  const defaultHabits: Habit[] = [
    { id: '1', name: 'Diet Check', icon: 'Apple' },
    { id: '2', name: 'Water (1 Gal)', icon: 'Droplet' },
    { id: '3', name: 'Read 10 Pgs', icon: 'BookOpen' },
  ];

  // Core state
  const [habits, setHabits] = useState<Habit[]>(defaultHabits);
  const [config, setConfig] = useState(defaultConfig);
  const [checkedCells, setCheckedCells] = useState<Map<string, boolean>>(new Map());
  const [isExporting, setIsExporting] = useState(false);

  const exportPdfRef = useRef<(() => Promise<void>) | null>(null);

  // 1. Initial State Loading (localStorage or Template prefill)
  useEffect(() => {
    // If a templateSlug is provided (or matched in query search)
    if (templateSlug && templates[templateSlug]) {
      const template = templates[templateSlug];
      const templateHabits = template.habits.map((h, index) => ({
        id: String(Date.now() + index),
        name: h.name,
        icon: h.icon,
      }));

      setHabits(templateHabits);
      setConfig((prev) => ({
        ...prev,
        gridTitle: template.heading,
        themePreset: template.themePreset,
        periodMode: template.periodMode,
        daysCount: template.daysCount || prev.daysCount,
        weeksCount: template.weeksCount || prev.weeksCount,
      }));
      setCheckedCells(new Map());
    } else {
      // Load from local storage
      const saved = localStorage.getItem(STATE_LOCAL_STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.habits && Array.isArray(parsed.habits)) {
            setHabits(parsed.habits);
          }
          if (parsed.config) {
            setConfig((prev) => ({ ...prev, ...parsed.config }));
          }
          // Note: checkedCells state is reset on refresh or loaded empty to keep preview fresh
        } catch (e) {
          console.error('Failed parsing saved state', e);
        }
      }
    }
  }, [templateSlug]);

  // 2. Autosave State to Local Storage
  useEffect(() => {
    // Save state on change (only if not loaded from a fresh template url slug)
    if (!templateSlug) {
      localStorage.setItem(
        STATE_LOCAL_STORAGE_KEY,
        JSON.stringify({ habits, config })
      );
    }
  }, [habits, config, templateSlug]);

  // Handle cell checking/unchecking
  const handleCellClick = (habitId: string, dateString: string) => {
    const key = `${habitId}-${dateString}`;
    setCheckedCells((prev) => {
      const next = new Map(prev);
      if (next.get(key) === true) {
        next.delete(key);
      } else {
        next.set(key, true);
      }
      return next;
    });
  };

  // Add a new habit
  const handleAddHabit = (name: string, icon: string) => {
    const newHabit = {
      id: String(Date.now()),
      name,
      icon,
    };
    setHabits((prev) => [...prev, newHabit]);
  };

  // Delete a habit
  const handleDeleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
    setCheckedCells((prev) => {
      const next = new Map(prev);
      for (const key of next.keys()) {
        if (key.startsWith(`${id}-`)) {
          next.delete(key);
        }
      }
      return next;
    });
  };

  // Reorder habits
  const handleReorder = (newHabits: Habit[]) => {
    setHabits(newHabits);
  };

  // Edit habit name
  const handleEditHabitName = (id: string, newName: string) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, name: newName } : h))
    );
  };

  // Edit habit icon
  const handleEditHabitIcon = (id: string, newIcon: string) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, icon: newIcon } : h))
    );
  };

  // Calculate completion percentage
  const totalCells = habits.length * getGridDates(config).length;
  const checkedCount = checkedCells.size;
  const percentage = totalCells > 0 ? Math.round((checkedCount / totalCells) * 100) : 0;

  // Sidebar width resizing state
  const [sidebarWidth, setSidebarWidth] = useState<number>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('habit_tracker_sidebar_width') : null;
    return saved ? parseInt(saved, 10) : 370;
  });
  const [isResizing, setIsResizing] = useState<boolean>(false);

  const startResizing = (mouseDownEvent: React.MouseEvent) => {
    mouseDownEvent.preventDefault();
    setIsResizing(true);
    const startX = mouseDownEvent.clientX;
    const startWidth = sidebarWidth;

    const onMouseMove = (mouseMoveEvent: MouseEvent) => {
      const newWidth = Math.min(Math.max(startWidth + (mouseMoveEvent.clientX - startX), 260), 650);
      setSidebarWidth(newWidth);
      localStorage.setItem('habit_tracker_sidebar_width', String(newWidth));
    };

    const onMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const handleExport = () => {
    if (exportPdfRef.current) {
      exportPdfRef.current();
    }
  };

  return (
    <div className={`app-container${isResizing ? ' resizing-active' : ''}`}>
      <Sidebar
        width={sidebarWidth}
        habits={habits}
        config={config}
        onChangeConfig={setConfig}
        onAddHabit={handleAddHabit}
        onDeleteHabit={handleDeleteHabit}
        onReorder={handleReorder}
        onEditHabitName={handleEditHabitName}
        onEditHabitIcon={handleEditHabitIcon}
        onExportPdf={handleExport}
        isExporting={isExporting}
      />

      <div
        className={`sidebar-resizer${isResizing ? ' resizing' : ''}`}
        onMouseDown={startResizing}
        title="Drag to resize sidebar"
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', minWidth: 0 }}>
        <header className="preview-header">
          <div className="preview-header-left">
            <SiteLogoIcon size={26} className="preview-header-site-icon" />
            <div className="preview-header-info">
              <h2>Live Preview Studio</h2>
              <p>
                Completion: <strong>{percentage}%</strong>
              </p>
            </div>
          </div>
          <div className="preview-header-actions">
            <Link
              to="/templates"
              className="browse-templates-btn"
              style={{ textDecoration: 'none' }}
            >
              <LucideIcon name="LayoutGrid" size={14} style={{ color: 'var(--accent)' }} />
              Browse Templates
            </Link>
          </div>
        </header>

        <PreviewCanvas
          habits={habits}
          config={config}
          checkedCells={checkedCells}
          onCellClick={handleCellClick}
          exportPdfRef={exportPdfRef}
          isExporting={isExporting}
          setIsExporting={setIsExporting}
        />
      </div>
    </div>
  );
}
